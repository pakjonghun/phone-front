import { Role } from '@/model/user';
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { usePurchaseQueryStore } from '@/lib/store/purchase/purchaseList';
import {
  useConfirmPurchase,
  usePurchaseList,
} from '@/hooks/search/purchase/usePurchaseData';
import {
  Button,
  CircularProgress,
  Skeleton,
  TableBody,
  Typography,
} from '@mui/material';
import { useAuthStore } from '@/lib/store/auth/auth';
import { Purchase } from '@/model/purchase';
import AlertDialog from '@/components/dialog/AlertDialog';

import { PURCHASE_LIST } from '@/hooks/search/purchase/constant';
import { usePurchaseAlert } from '@/lib/store/purchase/purchaseAlert';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { usePurchaseTable } from '@/lib/store/purchase/purchaseTable';
import {
  getCurrencyToKRW,
  getWithCommaNumber,
} from '@/util/util';
import { rankReverse } from '@/app/sale/_component/constant';
import { useQueryClient } from '@tanstack/react-query';

const TableBodyList = () => {
  const selectedIdList = usePurchaseTable(
    (state) => state.selectedPurchaseList
  );
  const setSelectedIdList = usePurchaseTable(
    (state) => state.setSelectedPurchaseList
  );

  const snackBar = useSnackbar();
  const setOpenApplyDialog = usePurchaseAlert(
    (state) => state.setWarnShow
  );

  const role = useAuthStore((state) => state.role);
  const keyword = usePurchaseQueryStore(
    (state) => state.keyword
  );

  const sort = usePurchaseQueryStore((state) => state.sort);
  const length = usePurchaseQueryStore(
    (state) => state.length
  );
  const { data, isPending: isCellLoading } =
    usePurchaseList({
      keyword,
      sort,
      length: length,
    });

  const selectedPurchaseIdList = selectedIdList.map(
    (purchase) => purchase._id
  );
  const queryClient = useQueryClient();

  const openApplyDialog = usePurchaseAlert(
    (state) => state.warnShow
  );

  const setMultiPurchaseConfirmLoading = usePurchaseTable(
    (state) => state.setIsMultiConfirmingLoading
  );
  const { mutate: confirm, isPending } =
    useConfirmPurchase();

  const handleClickConfirm = () => {
    setMultiPurchaseConfirmLoading(true);
    confirm(selectedPurchaseIdList, {
      onSuccess: () => {
        snackBar('승인이 완료되었습니다.', 'success');
        queryClient.invalidateQueries({
          queryKey: [PURCHASE_LIST],
        });
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
        setMultiPurchaseConfirmLoading(false);
        setOpenApplyDialog(false);
      },
    });
  };

  const emptyData = Array.from({ length: 14 });
  const flatPurchaseData = data?.pages.flatMap(
    (item) => item.data
  );

  const handleClickRow = (purchaseItem: Purchase) => {
    if (role === Role.STAFF) return;
    const isIdInclude = selectedIdList.find(
      (item) => item._id === purchaseItem._id
    );
    if (isIdInclude) {
      setSelectedIdList(
        selectedIdList.filter(
          (item) => item._id !== purchaseItem._id
        )
      );
    } else {
      setSelectedIdList([...selectedIdList, purchaseItem]);
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
        {isCellLoading ? (
          <>
            {emptyData.map((item, index) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={index}
              >
                <TableCell padding="none" colSpan={8}>
                  <Skeleton sx={{ mx: 2 }} height={60} />
                </TableCell>
              </TableRow>
            ))}
          </>
        ) : (
          <>
            {flatPurchaseData?.map((row, index) => {
              const isItemSelected = selectedIdList.some(
                (item) => item._id === row?._id
              );

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
                  key={row._id}
                  selected={isItemSelected}
                >
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
                      {rankReverse[row.rank]}
                    </TableCell>
                    <TableCell align="left">
                      {row.distanceLog || '-'}
                    </TableCell>
                    <TableCell align="left">
                      {getCurrencyToKRW(
                        row.product.recentHighPurchasePrice
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {getCurrencyToKRW(
                        row.product.recentLowPurchasePrice
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {getWithCommaNumber(
                        row.product
                          .belowAveragePurchaseCount
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
                                  (purchaseItem) =>
                                    purchaseItem._id ==
                                    row._id
                                ) && isPending ? (
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
                </TableRow>
              );
            })}
          </>
        )}
      </>
    </TableBody>
  );
};

export default TableBodyList;
