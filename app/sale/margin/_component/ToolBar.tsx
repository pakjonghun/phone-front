import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  Button,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Tooltip,
} from '@mui/material';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { useQueryClient } from 'react-query';
import { MARGIN_LIST } from '@/hooks/search/sale/constant';
import {
  useApplySale,
  useDownloadSale,
} from '@/hooks/search/sale/useSaleData';
import { useSaleAlert } from '@/lib/store/sale/saleAlert';
import SelectedIndicator from './SelectedIndicator';
import { useMarginTable } from '@/lib/store/sale/marginTable';
import { useMarginQueryStore } from '@/lib/store/sale/marginList';

interface EnhancedTableToolbarProps {
  searchDataCount: number;
}

export default function EnhancedTableToolbar(
  props: EnhancedTableToolbarProps
) {
  const { searchDataCount } = props;

  const selectedMarginList = useMarginTable(
    (state) => state.selectedMarginList
  );

  const setSelectedSaleList = useMarginTable(
    (state) => state.setSelectedMarginList
  );

  const { mutate: download, isLoading: isDownloading } =
    useDownloadSale();

  const setOpenApplyDialog = useSaleAlert(
    (state) => state.setWarnShow
  );
  const { mutate: refresh, isLoading: isRefreshing } =
    useApplySale();

  const snackBar = useSnackbar();

  const handleClickDownload = () => {
    download(
      selectedMarginList.map((item) => item._id),
      {
        onSuccess: () => {
          snackBar('다운로드가 완료되었습니다.', 'success');
        },
        onError: (error) => {
          const errorMessage =
            error?.response?.data?.message;
          snackBar(
            errorMessage ?? '다운로드가 실패했습니다.',
            'error'
          );
        },
      }
    );
  };

  const queryClient = useQueryClient();
  const handleClickRefresh = () => {
    refresh(undefined, {
      onSuccess: () => {
        snackBar('갱신이 완료되었습니다.', 'success');
        queryClient.invalidateQueries([MARGIN_LIST]);
        setSelectedSaleList([]);
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message;
        snackBar(
          errorMessage ?? '갱신이 실패했습니다.',
          'error'
        );
      },
    });
  };

  const sortType = useMarginQueryStore(
    (state) => state.sortType
  );
  const toggleSortType = useMarginQueryStore(
    (state) => state.toggleSortType
  );

  const confirmedInclude = selectedMarginList.some(
    (item) => item.isConfirmed
  );

  const hasSelectedItem = useMarginTable((state) =>
    state.hasSelectedItem()
  );

  const isMultiSalePurchaseLoading = useMarginTable(
    (state) => state.isMultiConfirmLoading
  );

  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(hasSelectedItem && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
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
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{ mr: 3 }}
        >
          <Typography>판매 데이터</Typography>
          <Typography sx={{ whiteSpace: 'nowrap' }}>
            {`(검색 : ${searchDataCount ?? 0}개)`}
          </Typography>
        </Stack>
      )}
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{ mr: 3 }}
      >
        <FormControlLabel
          sx={{ whiteSpace: 'nowrap' }}
          onChange={toggleSortType}
          control={<Switch defaultChecked />}
          label={
            sortType == 'single' ? '단일정렬' : '중복정렬'
          }
        />
        <Tooltip title="판매가가 최신상태로 업데이트 됩니다.">
          <Button
            variant="outlined"
            sx={{ width: '120px', mr: 2 }}
            onClick={handleClickRefresh}
            startIcon={
              isRefreshing ? (
                <CircularProgress size={18} />
              ) : (
                <></>
              )
            }
            endIcon={<RefreshIcon />}
          >
            갱신
          </Button>
        </Tooltip>
        <Tooltip
          title={
            !hasSelectedItem
              ? '선택된 데이터가 없습니다.'
              : confirmedInclude
              ? '승인할수 없는 데이터가 선택되어 있습니다.'
              : ''
          }
        >
          <Button
            onClick={() => {
              const message = !hasSelectedItem
                ? '선택된 데이터가 없습니다.'
                : confirmedInclude
                ? '승인할수 없는 데이터가 선택되어 있습니다.'
                : '';

              if (message) {
                snackBar(message, 'warning');
                return;
              }
              setOpenApplyDialog(true);
            }}
            variant="outlined"
            sx={{ width: '120px' }}
            startIcon={
              isMultiSalePurchaseLoading ? (
                <CircularProgress size={18} />
              ) : (
                <></>
              )
            }
          >
            일괄승인
          </Button>
        </Tooltip>
      </Stack>
    </Toolbar>
  );
}
