import { Role } from '@/model/user';
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { useSaleQueryStore } from '@/lib/store/sale/saleList';
import { useSaleList } from '@/hooks/search/sale/useSaleData';
import { Skeleton, TableBody, styled } from '@mui/material';
import { useAuthStore } from '@/lib/store/auth/auth';
import { Sale } from '@/model/sale';
import { useSaleTable } from '@/lib/store/sale/saleTable';
import { getCurrencyToKRW, getDateFormat } from '@/util/util';
import { useDebounce } from '@/hooks/common/useDebounce';

const TableBodyList = () => {
  const selectedIdList = useSaleTable((state) => state.selectedSaleList);
  const setSelectedIdList = useSaleTable((state) => state.setSelectedSaleList);

  const role = useAuthStore((state) => state.role);
  const keyword = useSaleQueryStore((state) => state.keyword);

  const sort = useSaleQueryStore((state) => state.sort);
  const length = useSaleQueryStore((state) => state.length);
  const startDate = useSaleQueryStore((state) => state.startDate);
  const endDate = useSaleQueryStore((state) => state.endDate);
  const delayText = useDebounce({ text: keyword });

  const { data, isPending: isCellLoading } = useSaleList({
    keyword: delayText,
    sort,
    length: length,
    startDate,
    endDate,
  });

  const flatSaleData = data?.pages.flatMap((item) => item.data) ?? Array.from({ length: 14 });

  const handleClickRow = (saleItem: Sale) => {
    if (role === Role.STAFF) return;
    const isInclude = selectedIdList.find((item) => item._id === saleItem._id);
    if (isInclude) {
      setSelectedIdList(selectedIdList.filter((item) => item._id !== saleItem._id));
    } else {
      setSelectedIdList([...selectedIdList, saleItem]);
    }
  };

  return (
    <TableBody>
      <>
        {flatSaleData?.map((row, index) => {
          const rowKey = row?._id ?? index;
          const isItemSelected = row ? selectedIdList.some((item) => item._id === row._id) : false;

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
                <NoWrapTableCell padding="none" colSpan={13}>
                  <Skeleton sx={{ mx: 2 }} height={60} />
                </NoWrapTableCell>
              ) : (
                <>
                  {role !== Role.STAFF && (
                    <NoWrapTableCell padding="checkbox">
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
                    </NoWrapTableCell>
                  )}

                  <NoWrapTableCell align="left">{getDateFormat(row.inDate)}</NoWrapTableCell>
                  <NoWrapTableCell align="left">{row.inClient}</NoWrapTableCell>
                  <NoWrapTableCell align="left">{getDateFormat(row.outDate)}</NoWrapTableCell>
                  <NoWrapTableCell align="left">{row.outClient}</NoWrapTableCell>
                  <NoWrapTableCell align="left">{row.product}</NoWrapTableCell>
                  <NoWrapTableCell align="left">{row.imei}</NoWrapTableCell>
                  <NoWrapTableCell align="left">{getCurrencyToKRW(row.inPrice)}</NoWrapTableCell>
                  <NoWrapTableCell align="left">{getCurrencyToKRW(row.outPrice)}</NoWrapTableCell>
                  <NoWrapTableCell align="left">{getCurrencyToKRW(row.margin)}</NoWrapTableCell>
                  <NoWrapTableCell align="left">{`${row.marginRate}%`}</NoWrapTableCell>
                  <NoWrapTableCell align="center">{row.note}</NoWrapTableCell>
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

const NoWrapTableCell = styled(TableCell)({
  whiteSpace: 'nowrap',
});
