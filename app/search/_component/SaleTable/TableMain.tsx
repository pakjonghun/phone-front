import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useSaleQueryStore } from '@/lib/store/sale/saleList';
import { useSaleList } from '@/hooks/search/sale/useSaleData';
import { Sale } from '@/model/sale';
import { Product } from '@/model/product';
import { SaleSort } from '@/hooks/search/sale/type';
import { Button } from '@mui/material';

type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: keyof (Sale & Product);
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'rank',
    numeric: false,
    disablePadding: false,
    label: '등급',
  },
  {
    id: 'distanceLog',
    numeric: true,
    disablePadding: false,
    label: '차감내역',
  },
  {
    id: 'recentHighSalePrice',
    numeric: true,
    disablePadding: false,
    label: '최근 고가 판매가',
  },
  {
    id: 'recentLowPrice',
    numeric: true,
    disablePadding: false,
    label: '최근 저가 판매가',
  },
  {
    id: 'belowAverageCount',
    numeric: true,
    disablePadding: false,
    label: '평균 이하 판매수',
  },
  {
    id: 'isConfirmed',
    numeric: false,
    disablePadding: true,
    label: '관리자 승인',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (property: SaleSort) => void;
  onSelectAllClick: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const canSortList: SaleSort[] = [
    'isConfirmed',
    'rank',
    'recentHighSalePrice',
    'recentLowPrice',
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={
              numSelected > 0 && numSelected < rowCount
            }
            checked={
              rowCount > 0 && numSelected === rowCount
            }
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={
              headCell.disablePadding ? 'none' : 'normal'
            }
            sortDirection={
              orderBy === headCell.id ? order : false
            }
          >
            {canSortList.includes(
              headCell.id as SaleSort
            ) ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={
                  orderBy === headCell.id ? order : 'asc'
                }
                onClick={() =>
                  onRequestSort(headCell.id as SaleSort)
                }
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <TableHead>{headCell.label}</TableHead>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(
  props: EnhancedTableToolbarProps
) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected}개 데이터가 선택되었습니다.
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          판매 데이터 리스트
        </Typography>
      )}
      <Button
        disabled={!numSelected}
        variant="outlined"
        sx={{ width: '100px' }}
      >
        일괄승인
      </Button>
    </Toolbar>
  );
}
export default function SaleTableMain() {
  const keyword = useSaleQueryStore(
    (state) => state.keyword
  );
  const sort = useSaleQueryStore((state) => state.sort);
  const length = useSaleQueryStore((state) => state.length);
  const { data, hasNextPage, fetchNextPage } = useSaleList({
    keyword,
    sort,
    length: 1000,
  });

  const flatSaleData = data?.pages.flatMap(
    (item) => item.data
  );

  const [selected, setSelected] = React.useState<Sale[]>(
    []
  );
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] =
    React.useState<keyof (Sale & Product)>('product');

  const handleClick = (id: string) => {
    //
  };

  const handleSelectAllClick = () => {
    const isAllSelected =
      selected.length === flatSaleData?.length;
    if (isAllSelected) setSelected([]);
    else setSelected(flatSaleData ?? []);
  };

  const setSort = useSaleQueryStore(
    (state) => state.setSort
  );

  const handleRequestSort = (targetFieldName: SaleSort) => {
    const orderNumber = order === 'asc' ? 1 : -1;
    setSort([[targetFieldName, orderNumber]]);
  };

  const handleCheckRow = (selectedItem: Sale) => {
    const isSelected = selected.find(
      (item) => item._id === selectedItem._id
    );
    if (isSelected)
      setSelected((prev) =>
        prev.filter((item) => item._id !== selectedItem._id)
      );
    else setSelected((prev) => [...prev, selectedItem]);
  };

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={flatSaleData?.length ?? 0}
          />
          <TableBody>
            {flatSaleData?.map((row, index) => {
              const isItemSelected = selected.some(
                (item) => item._id === row._id
              );

              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={() => handleClick(row._id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row._id}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                      onClick={() => handleCheckRow(row)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {row.rank}
                  </TableCell>
                  <TableCell align="right">
                    {row.distanceLog}
                  </TableCell>
                  <TableCell align="right">
                    {row.product.recentHighSalePrice}
                  </TableCell>
                  <TableCell align="right">
                    {row.product.recentLowPrice}
                  </TableCell>
                  <TableCell align="right">
                    {row.product.belowAverageCount}
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {row.isConfirmed ? '승인됨' : '미승인'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
