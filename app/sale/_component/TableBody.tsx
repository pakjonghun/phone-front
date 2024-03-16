import { Role } from '@/model/user';
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { useSaleQueryStore } from '@/lib/store/sale/saleList';
import { useSaleList } from '@/hooks/search/sale/useSaleData';
import { Skeleton, TableBody } from '@mui/material';
import { useAuthStore } from '@/lib/store/auth/auth';
import { Sale } from '@/model/sale';
import { useSaleTable } from '@/lib/store/sale/saleTable';
import {
  getCurrencyToKRW,
  getDateFormat,
} from '@/util/util';

const TableBodyList = () => {
  const selectedIdList = useSaleTable(
    (state) => state.selectedSaleList
  );
  const setSelectedIdList = useSaleTable(
    (state) => state.setSelectedSaleList
  );

  const role = useAuthStore((state) => state.role);
  const keyword = useSaleQueryStore(
    (state) => state.keyword
  );

  const sort = useSaleQueryStore((state) => state.sort);
  const length = useSaleQueryStore((state) => state.length);
  const { data, isPending: isCellLoading } = useSaleList({
    keyword,
    sort,
    length: length,
  });

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
                <TableCell padding="none" colSpan={13}>
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
                    {getDateFormat(row.inDate)}
                  </TableCell>
                  <TableCell align="left">
                    {row.inClient}
                  </TableCell>
                  <TableCell align="left">
                    {getDateFormat(row.outDate)}
                  </TableCell>

                  <TableCell align="left">
                    {row.outClient}
                  </TableCell>
                  <TableCell align="left">
                    {row.product}
                  </TableCell>
                  <TableCell align="left">
                    {row._id}
                  </TableCell>
                  <TableCell align="left">
                    {row.imei}
                  </TableCell>
                  <TableCell align="left">
                    {getCurrencyToKRW(row.inPrice)}
                  </TableCell>
                  <TableCell align="left">
                    {getCurrencyToKRW(row.outPrice)}
                  </TableCell>
                  <TableCell align="left">
                    {getCurrencyToKRW(row.margin)}
                  </TableCell>
                  <TableCell align="left">
                    {row.marginRate}
                  </TableCell>
                  <TableCell align="left">
                    {row.note}
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
