import { Role } from '@/model/user';
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { useSaleQueryStore } from '@/lib/store/sale/saleList';
import {
  useConfirmSale,
  useSaleList,
} from '@/hooks/search/sale/useSaleData';
import {
  Button,
  CircularProgress,
  Skeleton,
  TableBody,
  Typography,
} from '@mui/material';
import { saleRank } from './constant';
import { useAuthStore } from '@/lib/store/auth/auth';
import { Sale } from '@/model/sale';
import AlertDialog from '@/components/dialog/AlertDialog';
import { useQueryClient } from 'react-query';
import { SALE_LIST } from '@/hooks/search/sale/constant';
import { useSaleAlert } from '@/lib/store/sale/saleAlert';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { useSaleTable } from '@/lib/store/sale/saleTable';
import {
  getCurrencyToKRW,
  getWithCommaNumber,
} from '@/util/util';

const TableBodyList = () => {
  const selectedIdList = useSaleTable(
    (state) => state.selectedSaleList
  );
  const setSelectedIdList = useSaleTable(
    (state) => state.setSelectedSaleList
  );

  const snackBar = useSnackbar();
  const setOpenApplyDialog = useSaleAlert(
    (state) => state.setWarnShow
  );

  const role = useAuthStore((state) => state.role);
  const keyword = useSaleQueryStore(
    (state) => state.keyword
  );

  const sort = useSaleQueryStore((state) => state.sort);
  const length = useSaleQueryStore((state) => state.length);
  const { data, isLoading: isCellLoading } = useSaleList({
    keyword,
    sort,
    length: length,
  });

  const selectedSaleIdList = selectedIdList.map(
    (sale) => sale._id
  );
  const queryClient = useQueryClient();

  const openApplyDialog = useSaleAlert(
    (state) => state.warnShow
  );

  const { mutate: confirm, isLoading } = useConfirmSale();

  const setIsConfirmingLoading = useSaleTable(
    (state) => state.setIsMultiConfirmLoading
  );

  const handleClickConfirm = () => {
    setIsConfirmingLoading(true);
    confirm(selectedSaleIdList, {
      onSuccess: () => {
        snackBar('승인이 완료되었습니다.', 'success');
        queryClient.invalidateQueries([SALE_LIST]);
        setSelectedIdList([]);
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message;
        snackBar(
          errorMessage ?? '승인이 실패했습니다.',
          'error'
        );
      },
      onSettled: () => {
        setIsConfirmingLoading(false);
        setOpenApplyDialog(false);
      },
    });
  };

  const flatSaleData =
    data?.pages.flatMap((item) => item.data) ??
    Array.from({ length: 14 });

  const handleClickRow = (saleItem: Sale) => {
    if (role === Role.STAFF) return;
    const isIdInclude = selectedIdList.find(
      (item) => item._id === saleItem._id
    );
    if (isIdInclude) {
      setSelectedIdList(
        selectedIdList.filter(
          (item) => item._id !== saleItem._id
        )
      );
    } else {
      setSelectedIdList([...selectedIdList, saleItem]);
    }
  };

  return (
    <TableBody>
      <AlertDialog
        onClickApply={handleClickConfirm}
        open={openApplyDialog}
        setOpen={setOpenApplyDialog}
        variant="confirm"
        title="승인"
        message={
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              width: '300px',
              fontSize: '14px',
            }}
          >
            정말 승인하겠습니까?
            <br /> 승인후 되돌릴수 없습니다.
          </Typography>
        }
      />
      <>
        {flatSaleData?.map((row, index) => {
          const rowKey = row?._id ?? index;
          const isItemSelected = row
            ? selectedIdList.some(
                (item) => item._id === row?._id
              )
            : false;

          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              onClick={() => {
                handleClickRow(row);
              }}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={rowKey}
              selected={isItemSelected}
            >
              {isCellLoading || !row ? (
                <TableCell padding="none" colSpan={8}>
                  <Skeleton sx={{ mx: 2 }} height={60} />
                </TableCell>
              ) : (
                <>
                  {role !== Role.STAFF && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClickRow(row);
                        }}
                      />
                    </TableCell>
                  )}

                  <TableCell align="left">
                    {row.product._id}
                  </TableCell>
                  <TableCell align="left">
                    {saleRank.at(row.rank - 1)}
                  </TableCell>
                  <TableCell align="left">
                    {row.distanceLog || '-'}
                  </TableCell>
                  <TableCell align="left">
                    {getCurrencyToKRW(
                      row.product.recentHighSalePrice
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {getCurrencyToKRW(
                      row.product.recentLowPrice
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {getWithCommaNumber(
                      row.product.belowAverageCount
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {row.isConfirmed ? (
                      <Button
                        sx={{ width: 90 }}
                        disabled
                        variant="outlined"
                      >
                        승인완료
                      </Button>
                    ) : (
                      <>
                        {role !== Role.STAFF ? (
                          <Button
                            sx={{ width: 90 }}
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedIdList([row]);
                              setOpenApplyDialog(true);
                            }}
                            variant="contained"
                            startIcon={
                              selectedIdList.find(
                                (saleItem) =>
                                  saleItem._id == row._id
                              ) && isLoading ? (
                                <CircularProgress
                                  size={18}
                                  sx={{
                                    color: 'white',
                                  }}
                                />
                              ) : (
                                <></>
                              )
                            }
                          >
                            승인
                          </Button>
                        ) : (
                          '승인대기'
                        )}
                      </>
                    )}
                  </TableCell>
                </>
              )}
            </TableRow>
          );
        })}
      </>
    </TableBody>
  );
};

export default TableBodyList;
