'use client';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Header } from '@/components/common';
import { Person } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import SignUpDialog from './_component/SignUpDialog';
import { useDropAccount, useResetAllData, useUserList } from '@/hooks/user/useUserData';
import UserCard from './_component/UserCard';
import { useUserAlert } from '@/lib/store/user/userAlert';
import FormDialog from '@/components/dialog/FormDialog';
import { useSnackbar } from '@/context/SnackBarProvicer';
import ChangePasswordDialog from './_component/ChangePasswordDialog';
import AlertDialog from '@/components/dialog/AlertDialog';
import { useUserId } from '@/lib/store/user/userId';
import { USER_LIST } from '@/hooks/user/constant';
import { useQueryClient } from '@tanstack/react-query';
import { SALE_LIST } from '@/hooks/search/sale/constant';
import {
  useDeleteRecord,
  useDeleteRecordPurchase,
  useGetUploadRecordList,
  usePurchaseGetUploadRecordList,
} from '@/hooks/auth/useAuthData';
import { getTimeFormat } from '@/util/util';
import { PURCHASE_UPLOAD_LIST, UPLOAD_LIST } from '@/hooks/auth/constant';
import { DASHBOARD_DATA } from '@/hooks/dashboard/constant';

const Admin = () => {
  const invalidateKeys = [SALE_LIST, UPLOAD_LIST, DASHBOARD_DATA, PURCHASE_UPLOAD_LIST];
  const snackbar = useSnackbar();
  const { data: userList, isLoading } = useUserList();

  const { data: uploadList, isLoading: isUploadListLoading } = useGetUploadRecordList();

  const { data: purchaseUploadList, isLoading: isUploadPurchaseLoading } =
    usePurchaseGetUploadRecordList();

  const [selectRecordDate, setSelectRecordDate] = useState<null | { _id: string; updatedAt: Date }>(
    null
  );

  const [selectRecordDatePurchase, setSelectRecordDatePurchase] = useState<null | {
    _id: string;
    updatedAt: Date;
  }>(null);

  const { mutate: deleteRecord } = useDeleteRecord();

  const handleCloseRecordDialog = () => {
    setSelectRecordDate(null);
  };

  const handleCloseRecordDialogPurchase = () => {
    setSelectRecordDatePurchase(null);
  };

  const handleDeleteRecord = () => {
    if (!selectRecordDate) return;

    deleteRecord(
      {
        uploadId: selectRecordDate._id,
      },
      {
        onSuccess: () => {
          snackbar('업로드 기록 삭제성공', 'success');
          invalidateKeys.forEach((key) => {
            queryClient.invalidateQueries({
              queryKey: [key],
            });
          });
        },
        onError: () => {
          snackbar('업로드 기록 삭제성공', 'success');
        },
        onSettled: () => {
          setSelectRecordDate(null);
        },
      }
    );
  };

  const { mutate: deletePurchaseRecord } = useDeleteRecordPurchase();
  const handleDeletePurchaseRecord = () => {
    if (!selectRecordDatePurchase) return;

    deletePurchaseRecord(
      {
        uploadId: selectRecordDatePurchase._id,
      },
      {
        onSuccess: () => {
          snackbar('업로드 기록 삭제성공', 'success');

          invalidateKeys.forEach((key) => {
            queryClient.invalidateQueries({
              queryKey: [key],
            });
          });
        },
        onError: () => {
          snackbar('업로드 기록 삭제성공', 'success');
        },
        onSettled: () => {
          setSelectRecordDatePurchase(null);
        },
      }
    );
  };

  const userData = userList ?? Array.from({ length: 3 });
  const recordDate = uploadList ?? Array.from({ length: 3 });

  const setShowDropAlert = useUserAlert((state) => state.setWarnShow);
  const showDropAlert = useUserAlert((state) => state.warnShow);

  const setShowForm = useUserAlert((state) => state.setFormShow);

  const selectedUserId = useUserId((state) => state.selectedUserId);
  const setSelectedUserId = useUserId((state) => state.setSelectedUserId);

  const showForm = useUserAlert((state) => state.formShow);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const { mutate: dropAccount } = useDropAccount();
  const queryClient = useQueryClient();
  const handleDropAccount = () => {
    dropAccount(selectedUserId, {
      onSuccess: () => {
        snackbar('계정 삭제가 완료되었습니다.');
        queryClient.invalidateQueries({
          queryKey: [USER_LIST],
        });
      },
      onError: (error) => {
        const errorMessage = error.response.data?.message;
        snackbar(errorMessage ?? '계정 삭제가 실패했습니다.');
      },
      onSettled: () => {
        setShowDropAlert(false);
        setSelectedUserId('');
      },
    });
  };

  const { mutate: reset, isPending: isResetting } = useResetAllData();
  const handleDeleteData = () => {
    reset(undefined, {
      onSuccess: () => {
        snackbar('초기화가 완료되었습니다.');

        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: [key],
          });
        });
      },
      onError: (error) => {
        const errorMessage = error.response.data?.message;
        snackbar(errorMessage ?? '초기화가 실패했습니다.');
      },
      onSettled: () => {
        setOpenDeleteAlert(false);
      },
    });
  };

  const lastUploadIndex = uploadList ? uploadList.length - 1 : 0;
  const lastUploadItem = uploadList ? uploadList[lastUploadIndex] : null;

  const lastUploadIndexPurchase = purchaseUploadList ? purchaseUploadList.length - 1 : 0;
  const lastUploadItemPurchase = purchaseUploadList
    ? purchaseUploadList[lastUploadIndexPurchase]
    : null;

  return (
    <Box
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <AlertDialog
        title="데이터 리셋"
        message={
          <>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                width: '300px',
                fontSize: '14px',
              }}
            >
              정말로 모든 데이터를 삭제하겠습니까?
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                width: '300px',
                fontSize: '14px',
              }}
            >
              삭제된 계정은 복구가 불가능합니다.
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                width: '300px',
                fontSize: '14px',
              }}
            >
              판매, 매입 데이터가 모두 삭제됩니다.
            </Typography>
          </>
        }
        variant="error"
        onClickApply={handleDeleteData}
        open={openDeleteAlert}
        setOpen={setOpenDeleteAlert}
      />
      <AlertDialog
        title="업로드 기록 삭제"
        message={
          <>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                width: '300px',
                fontSize: '14px',
              }}
            >
              {selectRecordDate
                ? `${getTimeFormat(selectRecordDate!.updatedAt)} 에 업로드 된 데이터를
              삭제하겠습니까?`
                : ''}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                width: '300px',
                fontSize: '14px',
              }}
            >
              삭제된 기록은 복구가 불가능합니다.
            </Typography>
          </>
        }
        variant="error"
        onClickApply={handleDeleteRecord}
        open={!!selectRecordDate}
        setOpen={handleCloseRecordDialog}
      />
      <AlertDialog
        title="업로드 기록 삭제"
        message={
          <>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                width: '300px',
                fontSize: '14px',
              }}
            >
              {selectRecordDate
                ? `${getTimeFormat(selectRecordDate!.updatedAt)} 에 업로드 된 데이터를
              삭제하겠습니까?`
                : ''}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                width: '300px',
                fontSize: '14px',
              }}
            >
              삭제된 기록은 복구가 불가능합니다.
            </Typography>
          </>
        }
        variant="error"
        onClickApply={handleDeletePurchaseRecord}
        open={!!selectRecordDatePurchase}
        setOpen={handleCloseRecordDialogPurchase}
      />
      <AlertDialog
        title="계정삭제"
        message={
          <>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                width: '300px',
                fontSize: '14px',
              }}
            >
              계정을 정말로 삭제하겠습니까?
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                width: '300px',
                fontSize: '14px',
              }}
            >
              삭제된 계정은 복구가 불가능합니다.
            </Typography>
          </>
        }
        variant="error"
        onClickApply={handleDropAccount}
        open={showDropAlert}
        setOpen={setShowDropAlert}
      />
      <FormDialog
        content={<ChangePasswordDialog />}
        open={showForm}
        setOpen={setShowForm}
        title="비밀번호 변경"
      />
      <SignUpDialog openSignUp={openSignUp} onClose={() => setOpenSignUp(false)} />
      <Header
        sx={{
          justifyContent: 'space-between',
          mb: 4,
        }}
      >
        <Typography variant="h4">관리자</Typography>
        <Stack direction="row" gap={2}>
          <Button
            startIcon={<Person />}
            sx={{ ml: 'auto' }}
            onClick={() => setOpenSignUp(true)}
            variant="contained"
          >
            회원생성
          </Button>
          <Tooltip title="계정을 제외한 모든 데이터가 삭제됩니다.">
            <Button
              startIcon={isResetting ? <CircularProgress size={18} /> : <RestartAltIcon />}
              sx={{ ml: 'auto' }}
              onClick={() => setOpenDeleteAlert(true)}
              variant="contained"
              color="error"
            >
              모든 데이터 리셋
            </Button>
          </Tooltip>
        </Stack>
      </Header>
      <Paper>
        <Typography variant="h5" sx={{ my: 3, mx: 2 }}>
          계정관리
        </Typography>
        <Grid container sx={{ p: 2 }} rowSpacing={1} columnSpacing={1}>
          {userData?.map((user, index) => {
            return (
              <Grid key={user?.id ?? index} item xs={100} md={6} lg={4} xl={3}>
                <>
                  {isLoading ? (
                    <Skeleton sx={{ mx: 2, my: 1.2 }} height={240} variant="rounded" />
                  ) : (
                    <UserCard key={user.id} user={user} />
                  )}
                </>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
      <Paper sx={{ mt: 4 }}>
        <Stack direction="row" alignItems="center">
          <Typography variant="h5" sx={{ my: 3, mx: 2 }}>
            판매 업로드 관리
          </Typography>
          <Tooltip title="마지막으로 업로드한 시점으로 되돌립니다.">
            <span>
              <Button
                disabled={!uploadList?.length}
                onClick={() => setSelectRecordDate(lastUploadItem)}
                size="small"
                variant="contained"
                color="error"
                startIcon={<RestartAltIcon />}
              >
                되돌리기
              </Button>
            </span>
          </Tooltip>
        </Stack>
        <Grid container gap={2} sx={{ p: 2 }}>
          {!recordDate?.length && <>오늘 업로드 된 기록이 없습니다.</>}
          {recordDate?.map((item, index) => (
            <Grid key={item?._id ?? `${index}_upload`} item xs={100} md={6} lg={4} xl={3}>
              <>
                {isUploadListLoading ? (
                  <Skeleton sx={{ mx: 2, my: 1.2 }} height={240} variant="rounded" />
                ) : (
                  <Card>
                    <CardContent>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={3}
                        sx={{ mt: 1 }}
                      >
                        <Typography>{`${getTimeFormat(item.updatedAt)}에 업로드`}</Typography>
                        {/* <Button
                          onClick={() =>
                            setSelectRecordDate(item)
                          }
                          size="small"
                          variant="contained"
                          color="error"
                        >
                          삭제
                        </Button> */}
                      </Stack>
                    </CardContent>
                  </Card>
                )}
              </>
            </Grid>
          ))}
        </Grid>
        <Stack direction="row" alignItems="center" sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ my: 3, mx: 2 }}>
            매입 업로드 관리
          </Typography>
          <Tooltip title="마지막으로 업로드한 시점으로 되돌립니다.">
            <span>
              <Button
                disabled={!purchaseUploadList?.length}
                onClick={() => setSelectRecordDatePurchase(lastUploadItemPurchase)}
                size="small"
                variant="contained"
                color="error"
                startIcon={<RestartAltIcon />}
              >
                되돌리기
              </Button>
            </span>
          </Tooltip>
        </Stack>
        <Grid container gap={2} sx={{ p: 2 }}>
          {!purchaseUploadList?.length && <>오늘 업로드 된 기록이 없습니다.</>}
          {purchaseUploadList?.map((item, index) => (
            <Grid key={item?._id ?? `${index}_upload`} item xs={100} md={6} lg={4} xl={3}>
              <>
                {isUploadPurchaseLoading ? (
                  <Skeleton sx={{ mx: 2, my: 1.2 }} height={240} variant="rounded" />
                ) : (
                  <Card>
                    <CardContent>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={3}
                        sx={{ mt: 1 }}
                      >
                        <Typography>{`${getTimeFormat(item.updatedAt)}에 업로드`}</Typography>
                        {/* <Button
                          onClick={() =>
                            setSelectRecordDate(item)
                          }
                          size="small"
                          variant="contained"
                          color="error"
                        >
                          삭제
                        </Button> */}
                      </Stack>
                    </CardContent>
                  </Card>
                )}
              </>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Admin;
