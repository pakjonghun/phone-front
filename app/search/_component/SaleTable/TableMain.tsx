import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { useSaleQueryStore } from '@/lib/store/sale/saleList';
import {
  useConfirmSale,
  useSaleList,
} from '@/hooks/search/sale/useSaleData';
import {
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import useInfinity from '@/hooks/common/useInfinity';
import EnhancedTableHead from './TableHeader';
import EnhancedTableToolbar from './ToolBar';
import { saleRank } from './constant';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { useQueryClient } from 'react-query';
import { SALE_LIST } from '@/hooks/search/sale/constant';
import { useAuthStore } from '@/lib/store/auth/auth';
import { Role } from '@/model/user';
import AlertDialog from '@/components/dialog/AlertDialog';
import { useSaleAlert } from '@/lib/store/sale/saleAlert';

export default function SaleTableMain() {
  const openApplyDialog = useSaleAlert(
    (state) => state.warnShow
  );
  const setOpenApplyDialog = useSaleAlert(
    (state) => state.setWarnShow
  );

  const [confirmIdList, setConfirmIdList] = React.useState<
    string[]
  >([]);
  const role = useAuthStore((state) => state.role);
  const snackBar = useSnackbar();

  const { mutate: confirm, isLoading } = useConfirmSale();
  const [selectedIdList, setSelectedIdList] =
    React.useState<string[]>([]);

  const keyword = useSaleQueryStore(
    (state) => state.keyword
  );

  React.useEffect(() => {
    setSelectedIdList([]);
  }, [keyword]);

  const sort = useSaleQueryStore((state) => state.sort);
  const length = useSaleQueryStore((state) => state.length);
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useSaleList({
      keyword,
      sort,
      length: length,
    });

  const callback: IntersectionObserverCallback = (
    entry
  ) => {
    if (
      hasNextPage &&
      !isFetching &&
      entry[0].isIntersecting
    ) {
      fetchNextPage();
    }
  };

  const setLastItemRef = useInfinity({ callback });

  const flatSaleData = data?.pages.flatMap(
    (item) => item.data
  );

  const queryClient = useQueryClient();

  const handleClickConfirm = (idList: string[]) => {
    setConfirmIdList(idList);
    confirm(idList, {
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
        setConfirmIdList([]);
        setOpenApplyDialog(false);
      },
    });
  };

  const handleClickRow = (id: string) => {
    if (role === Role.STAFF) return;
    const isIdInclude = selectedIdList.includes(id);
    if (isIdInclude) {
      setSelectedIdList(
        selectedIdList.filter((item) => item !== id)
      );
    } else {
      setSelectedIdList([...selectedIdList, id]);
    }
  };

  const handleSelectAllClick = () => {
    if (
      !flatSaleData ||
      (flatSaleData && flatSaleData.length === 0)
    ) {
      return;
    }
    const unConfirmedList = flatSaleData?.filter(
      (item) => !item.isConfirmed
    );

    const isAllSelected =
      selectedIdList.length === unConfirmedList?.length;
    if (isAllSelected) setSelectedIdList([]);
    else
      setSelectedIdList(
        unConfirmedList && unConfirmedList.length > 0
          ? unConfirmedList?.map((item) => item._id) ?? []
          : []
      );
  };

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar
        setSelectedIdList={setSelectedIdList}
        searchDataCount={flatSaleData?.length ?? 0}
        selectedIdList={selectedIdList}
      />
      {!!flatSaleData?.length && (
        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selectedIdList.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={flatSaleData?.length ?? 0}
            />
            <TableBody>
              {flatSaleData?.map((row, index) => {
                console.log;
                const isItemSelected = selectedIdList.some(
                  (item) => item === row._id
                );

                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={() => {
                      if (row.isConfirmed) return;
                      handleClickRow(row._id);
                    }}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                  >
                    {role !== Role.STAFF && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          // disabled={row.isConfirmed}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClickRow(row._id);
                          }}
                        />
                      </TableCell>
                    )}

                    <TableCell align="left">
                      {row.product._id}
                    </TableCell>
                    <TableCell align="left">
                      {saleRank.at(row.rank)}
                    </TableCell>
                    <TableCell align="left">
                      {row.distanceLog || '-'}
                    </TableCell>
                    <TableCell align="left">
                      {row.product.recentHighSalePrice}
                    </TableCell>
                    <TableCell align="left">
                      {row.product.recentLowPrice}
                    </TableCell>
                    <TableCell align="left">
                      {row.product.belowAverageCount}
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
                            <AlertDialog
                              onClickApply={() =>
                                handleClickConfirm([
                                  row._id,
                                ])
                              }
                              open={openApplyDialog}
                              setOpen={setOpenApplyDialog}
                              variant="confirm"
                              title="승인"
                              message={
                                <Typography
                                  sx={{ width: '300px' }}
                                >
                                  정말 승인하겠습니까?
                                  <br /> 승인후 되돌릴수
                                  없습니다.
                                </Typography>
                              }
                              trigger={
                                <Button
                                  sx={{ width: 90 }}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setOpenApplyDialog(
                                      true
                                    );
                                  }}
                                  variant="contained"
                                  startIcon={
                                    confirmIdList.includes(
                                      row._id
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
                              }
                            />
                          ) : (
                            '승인대기'
                          )}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Box
            ref={setLastItemRef}
            sx={{
              minHeight: 50,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isFetching && (
              <CircularProgress color="info" />
            )}
          </Box>
        </TableContainer>
      )}
    </Paper>
  );
}
