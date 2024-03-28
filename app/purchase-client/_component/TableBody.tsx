import { Role } from '@/model/user';
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { usePurchaseClientList } from '@/hooks/search/client/useClient';
import { Skeleton, TableBody, Typography, styled } from '@mui/material';
import { useAuthStore } from '@/lib/store/auth/auth';
import { Client } from '@/model/client';
import { useDebounce } from '@/hooks/common/useDebounce';
import EditClientDialog from './EditClientDialog';
import { usePurchaseClientTable } from '@/lib/store/purchaseClient/purchaseClientTable';
import { usePurchaseQueryStore } from '@/lib/store/purchase/purchaseList';

const TableBodyList = () => {
  const selectedIdList = usePurchaseClientTable((state) => state.selectedPurchaseClientList);
  const setSelectedIdList = usePurchaseClientTable((state) => state.setSelectedPurchaseClientList);

  const role = useAuthStore((state) => state.role);
  const keyword = usePurchaseQueryStore((state) => state.keyword);
  const length = usePurchaseQueryStore((state) => state.length);

  const delayText = useDebounce({ text: keyword });
  const { data, isPending: isCellLoading } = usePurchaseClientList({
    keyword: delayText,
    length: length,
  });

  const flatClientData = data?.pages.flatMap((item) => item.data) ?? Array.from({ length: 14 });

  const handleClickRow = (clientItem: Client) => {
    if (role === Role.STAFF) return;
    const isInclude = selectedIdList.find((item) => item._id === clientItem._id);
    if (isInclude) {
      setSelectedIdList(selectedIdList.filter((item) => item._id === clientItem._id));
    } else {
      setSelectedIdList([...selectedIdList, clientItem]);
    }
  };

  return (
    <TableBody>
      <>
        {flatClientData?.map((row, index) => {
          const rowKey = row?._id ?? index;
          const isItemSelected = row ? selectedIdList.some((item) => item._id === row._id) : false;

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
                  <NoWrapTableCell align="left">{row._id}</NoWrapTableCell>
                  <NoWrapTableCell align="left">{row.manager}</NoWrapTableCell>
                  <NoWrapTableCell align="left">{row.note}</NoWrapTableCell>
                  <NoWrapTableCell align="left">
                    <>
                      {row.products?.map((product, index) => {
                        const isLast = index === row.products!.length - 1;
                        return (
                          <Typography key={`${product.product}_${index}`}>
                            {`${product.product}${isLast ? '' : `, \u00A0\u00A0`}`}
                          </Typography>
                        );
                      })}
                    </>
                  </NoWrapTableCell>
                  <NoWrapTableCell align="left">
                    <EditClientDialog
                      id={row._id}
                      manager={row.manager ?? ''}
                      note={row.note ?? ''}
                    />
                  </NoWrapTableCell>
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
