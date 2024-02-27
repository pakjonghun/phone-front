import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {
  SelectChangeEvent,
} from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { SaleSortItem } from '@/hooks/search/sale/type';
import { Theme, useTheme } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import { useSaleQueryStore } from '@/lib/store/sale/saleList';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const selectSortList: SaleSortItem[] = [
  ['isConfirmed', 1],
  ['isConfirmed', -1],
  ['rank', 1],
  ['rank', -1],
  ['recentHighSalePrice', 1],
  ['recentHighSalePrice', -1],
  ['recentLowPrice', 1],
  ['recentLowPrice', -1],
];

const hangleMapper = {
  ['isConfirmed' as string]: '승인여부',
  rank: '등급',
  recentHighSalePrice: '최근 고가 판매가',
  recentLowPrice: '최근 저가 판매가',
};

const englishMapper = {
  ['승인여부' as string]: 'isConfirmed',
  등급: 'rank',
  '최근 고가 판매가': 'recentHighSalePrice',
  '최근 저가 판매가': 'recentLowPrice',
};

const orderMapper = {
  ['오름차순' as string]: 1,
  내림차순: -1,
};

const selectedSortListString = selectSortList.map((item) =>
  getSortName(item)
);

export default function SaleSort() {
  const setSort = useSaleQueryStore(
    (state) => state.setSort
  );

  const [selectedSortList, setSelectedSortList] =
    React.useState<string[]>([]);

  const handleChange = (
    event: SelectChangeEvent<typeof selectedSortList>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedSortList(
      typeof value === 'string' ? value.split(',') : value
    );
    const sortResult = getSortItem(value);
    if (!sortResult) return;
    setSort(sortResult);
  };

  const theme = useTheme();

  return (
    <>
      <FormControl
        sx={{
          minWidth: {
            xs: 200,
            md: MenuProps.PaperProps.style.width,
          },
        }}
      >
        <InputLabel id="demo-multiple-chip-label">
          정렬
        </InputLabel>
        <Select
          fullWidth
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedSortList}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Chip"
            />
          }
          renderValue={(selected) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
              }}
            >
              {selected.map((value, index) => (
                <Chip
                  avatar={<Avatar>{index + 1}</Avatar>}
                  size="small"
                  key={value}
                  label={value}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {selectedSortListString.map((name) => (
            <MenuItem
              disabled={selectedSortList.some((item) => {
                const itemSort = getSortKeyOrder(item);
                const nameSort = getSortKeyOrder(name);
                if (!itemSort?.[0] || !nameSort?.[0])
                  return true;
                if (!itemSort?.[1] || !nameSort?.[1])
                  return true;

                const isSameKey =
                  itemSort[0] === nameSort[0];
                const isDifferentOrder =
                  itemSort[1] !== nameSort[1];
                return isSameKey && isDifferentOrder;
              })}
              key={name}
              value={name}
              style={getStyles(
                name,
                selectedSortList,
                theme
              )}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

function getSortName([sortKey, order]: SaleSortItem) {
  const hangleKey = hangleMapper[sortKey];
  return `${hangleKey} ${
    order === 1 ? '오름차순' : '내림차순'
  }`;
}

function getSortItem(sortName: string | string[]) {
  if (!Array.isArray(sortName)) return;

  const result: SaleSortItem[] = [];

  for (const item of sortName) {
    const [sortKey, order] = getSortKeyOrder(item);
    if (!sortKey || !order) return;

    const orderNumber = orderMapper[order];
    if (!orderNumber) return;

    const englishSortKey = englishMapper[sortKey];

    const sortItem = [
      englishSortKey,
      orderNumber,
    ] as SaleSortItem;
    result.push(sortItem);
  }

  return result;
}

function getStyles(
  name: string,
  allSortList: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      allSortList.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getSortKeyOrder(item: string) {
  const regexp = /(.+)\s(오름차순|내림차순)$/;
  const matchResult = item.match(regexp);
  const sortKey = matchResult?.[1];
  const order = matchResult?.[2];

  return [sortKey, order];
}
