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
import { SALE_LIST } from '@/hooks/search/sale/constant';
import {
  useApplySale,
  useConfirmSale,
  useDownloadSale,
} from '@/hooks/search/sale/useSaleData';
import { useSaleQueryStore } from '@/lib/store/sale/saleList';
import AlertDialog from '@/components/dialog/AlertDialog';
import { useSaleAlert } from '@/lib/store/sale/saleAlert';

interface EnhancedTableToolbarProps {
  selectedIdList: string[];
  searchDataCount: number;
  setSelectedIdList: (selectedIdList: string[]) => void;
}

export default function EnhancedTableToolbar(
  props: EnhancedTableToolbarProps
) {
  const {
    selectedIdList,
    searchDataCount,
    setSelectedIdList,
  } = props;

  const { mutate: download, isLoading: isDownloading } =
    useDownloadSale();

  const numSelected = selectedIdList.length;

  const openApplyDialog = useSaleAlert(
    (state) => state.warnShow
  );
  const setOpenApplyDialog = useSaleAlert(
    (state) => state.setWarnShow
  );
  const { mutate: refresh, isLoading: isRefreshing } =
    useApplySale();
  const { mutate: confirm, isLoading } = useConfirmSale();
  const snackBar = useSnackbar();
  const queryClient = useQueryClient();

  const handleClickDownload = () => {
    download(selectedIdList, {
      onSuccess: () => {
        snackBar('다운로드가 완료되었습니다.', 'success');
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message;
        snackBar(
          errorMessage ?? '다운로드가 실패했습니다.',
          'error'
        );
      },
    });
  };

  const handleClickConfirm = (idList: string[]) => {
    confirm(idList, {
      onSuccess: () => {
        snackBar('승인이 완료되었습니다.', 'success');
        queryClient.invalidateQueries([SALE_LIST]);
        setSelectedIdList([]);
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message;
        snackBar(
          errorMessage ?? '승인이 실패했습니다.',
          'error'
        );
      },
      onSettled: () => {
        setOpenApplyDialog(false);
      },
    });
  };

  const handleClickRefresh = () => {
    refresh(undefined, {
      onSuccess: () => {
        snackBar('갱신이 완료되었습니다.', 'success');
        queryClient.invalidateQueries([SALE_LIST]);
        setSelectedIdList([]);
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message;
        snackBar(
          errorMessage ?? '승인이 실패했습니다.',
          'error'
        );
      },
    });
  };

  const sortType = useSaleQueryStore(
    (state) => state.sortType
  );
  const toggleSortType = useSaleQueryStore(
    (state) => state.toggleSortType
  );

  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
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
        <Stack direction="row" alignItems="center">
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected}개 데이터가 선택되었습니다.
          </Typography>
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
        <AlertDialog
          onClickApply={() =>
            handleClickConfirm(selectedIdList)
          }
          open={openApplyDialog}
          setOpen={setOpenApplyDialog}
          variant="confirm"
          title="승인"
          message={
            <Typography sx={{ width: '300px' }}>
              정말 승인하겠습니까?
              <br /> 승인후 되돌릴수 없습니다.
            </Typography>
          }
          trigger={
            <Button
              onClick={() => setOpenApplyDialog(true)}
              disabled={numSelected == 0}
              variant="outlined"
              sx={{ width: '120px' }}
              startIcon={
                isLoading ? (
                  <CircularProgress size={18} />
                ) : (
                  <></>
                )
              }
            >
              일괄승인
            </Button>
          }
        />
      </Stack>
    </Toolbar>
  );
}
