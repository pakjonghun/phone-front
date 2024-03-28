import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

interface EnhancedTableToolbarProps {
  searchDataCount: number;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { searchDataCount } = props;

  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ mr: 3 }}>
        <Typography>거래처 데이터</Typography>
        <Typography sx={{ whiteSpace: 'nowrap' }}>
          {`(검색 : ${searchDataCount ?? 0}개)`}
        </Typography>
      </Stack>
    </Toolbar>
  );
}
