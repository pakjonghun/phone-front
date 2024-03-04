import React, { FC } from 'react';
import { Tooltip } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TocIcon from '@mui/icons-material/Toc';

interface Props {
  orderValue?: 1 | -1;
}

const HeadSortIcon: FC<Props> = ({ orderValue }) => {
  return (
    <>
      {!orderValue && (
        <Tooltip title="정렬">
          <TocIcon
            sx={{
              cursor: 'pointer',
              fontSize: '18px',
            }}
          />
        </Tooltip>
      )}
      {orderValue == -1 && (
        <Tooltip title="내림차순">
          <ArrowDownwardIcon
            sx={{
              cursor: 'pointer',
              fontSize: '18px',
            }}
          />
        </Tooltip>
      )}
      {orderValue == 1 && (
        <Tooltip title="오름차순">
          <ArrowUpwardIcon
            sx={{
              fontSize: '18px',
              cursor: 'pointer',
            }}
          />
        </Tooltip>
      )}
    </>
  );
};

export default HeadSortIcon;
