import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CircularProgress, IconButton, Stack, Tooltip } from '@mui/material';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { useDownloadSale } from '@/hooks/search/sale/useSaleData';
import { useSaleTable } from '@/lib/store/sale/saleTable';
import SelectedIndicator from './SelectedIndicator';

interface EnhancedTableToolbarProps {
  searchDataCount: number;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { searchDataCount } = props;

  const selectedSaleList = useSaleTable((state) => state.selectedSaleList);

  const { mutate: download, isPending: isDownloading } = useDownloadSale();

  const snackBar = useSnackbar();

  const handleClickDownload = () => {
    download(
      selectedSaleList.map((item) => item._id),
      {
        onSuccess: () => {
          snackBar('다운로드가 완료되었습니다.', 'success');
        },
        onError: (error) => {
          const errorMessage = error?.response?.data?.message;
          snackBar(errorMessage ?? '다운로드가 실패했습니다.', 'error');
        },
      }
    );
  };

  const hasSelectedItem = useSaleTable((state) => state.hasSelectedItem());

  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(hasSelectedItem && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {hasSelectedItem ? (
        <Stack direction="row" alignItems="center">
          <SelectedIndicator />
          <Tooltip title="선택한 데이터를 다운받습니다.">
            <IconButton onClick={handleClickDownload}>
              {isDownloading ? (
                <CircularProgress size={18} />
              ) : (
                <CloudDownloadIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ mr: 3 }}>
          <Typography>판매 데이터</Typography>
          <Typography sx={{ whiteSpace: 'nowrap' }}>
            {`(검색 : ${searchDataCount ?? 0}개)`}
          </Typography>
        </Stack>
      )}
    </Toolbar>
  );
}
