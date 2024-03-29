import { Role } from '@/model/user';
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { usePurchaseQueryStore } from '@/lib/store/purchase/purchaseList';
import { usePurchaseList } from '@/hooks/search/purchase/usePurchase';
import { Skeleton, TableBody, styled } from '@mui/material';
import { useAuthStore } from '@/lib/store/auth/auth';
import { Purchase } from '@/model/purchase';
import { usePurchaseTable } from '@/lib/store/purchase/purchaseTable';
import { getCurrencyToKRW, getDateFormat } from '@/util/util';
import { useDebounce } from '@/hooks/common/useDebounce';

const TableBodyList = () => {
  const selectedIdList = usePurchaseTable((state) => state.selectedPurchaseList);
  const setSelectedIdList = usePurchaseTable((state) => state.setSelectedPurchaseList);

  const role = useAuthStore((state) => state.role);
  const keyword = usePurchaseQueryStore((state) => state.keyword);

  const sort = usePurchaseQueryStore((state) => state.sort);
  const length = usePurchaseQueryStore((state) => state.length);
  const startDate = usePurchaseQueryStore((state) => state.startDate);
  const endDate = usePurchaseQueryStore((state) => state.endDate);
  const delayText = useDebounce({ text: keyword });
  const { data, isPending: isCellLoading } = usePurchaseList({
    keyword: delayText,
    sort,
    length: length,
    startDate,
    endDate,
  });

  const flatPurchaseData = data?.pages.flatMap((item) => item.data) ?? Array.from({ length: 14 });

  const handleClickRow = (purchaseItem: Purchase) => {
    if (role === Role.STAFF) return;
    const isInclude = selectedIdList.find((item) => item._id === purchaseItem._id);
    if (isInclude) {
      setSelectedIdList(selectedIdList.filter((item) => item._id !== purchaseItem._id));
    } else {
      setSelectedIdList([...selectedIdList, purchaseItem]);
    }
  };

  return (
    <TableBody>
      <>
        {flatPurchaseData?.map((row, index) => {
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
                  <NoWrapTableCell align="left">{row.product}</NoWrapTableCell>
                  <NoWrapTableCell align="left">{row.imei}</NoWrapTableCell>
                  <NoWrapTableCell align="left">{getCurrencyToKRW(row.inPrice)}</NoWrapTableCell>
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
