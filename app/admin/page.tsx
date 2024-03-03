'use client';

import { Header } from '@/components/common';
import { Person } from '@mui/icons-material';
import {
  Box,
  Button,
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
import {
  useDropAccount,
  useResetAllData,
  useUserList,
} from '@/hooks/user/useUserData';
import UserCard from './_component/UserCard';
import { useUserAlert } from '@/lib/store/user/userAlert';
import FormDialog from '@/components/dialog/FormDialog';
import { useSnackbar } from '@/context/SnackBarProvicer';
import ChangePasswordDialog from './_component/ChangePasswordDialog';
import AlertDialog from '@/components/dialog/AlertDialog';
import { useUserId } from '@/lib/store/user/userId';
import { useQueryClient } from 'react-query';
import { USER_LIST } from '@/hooks/user/constant';
import { SALE_LIST } from '@/hooks/search/sale/constant';
import { PURCHASE_LIST } from '@/hooks/search/purchase/constant';

const Admin = () => {
  const snackbar = useSnackbar();
  const { data: userList, isLoading } = useUserList();

  const userData = userList ?? Array.from({ length: 10 });

  const setShowDropAlert = useUserAlert(
    (state) => state.setWarnShow
  );
  const showDropAlert = useUserAlert(
    (state) => state.warnShow
  );

  const setShowForm = useUserAlert(
    (state) => state.setFormShow
  );

  const selectedUserId = useUserId(
    (state) => state.selectedUserId
  );
  const setSelectedUserId = useUserId(
    (state) => state.setSelectedUserId
  );

  const showForm = useUserAlert((state) => state.formShow);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] =
    useState(false);
  const { mutate: dropAccount } = useDropAccount();
  const queryClient = useQueryClient();
  const handleDropAccount = () => {
    dropAccount(selectedUserId, {
      onSuccess: () => {
        snackbar('계정 삭제가 완료되었습니다.');
        queryClient.invalidateQueries([USER_LIST]);
      },
      onError: (error) => {
        const errorMessage = error.response.data?.message;
        snackbar(
          errorMessage ?? '계정 삭제가 실패했습니다.'
        );
      },
      onSettled: () => {
        setShowDropAlert(false);
        setSelectedUserId('');
      },
    });
  };

  const { mutate: reset, isLoading: isResetting } =
    useResetAllData();
  const handleDeleteData = () => {
    reset(undefined, {
      onSuccess: () => {
        snackbar('초기화가 완료되었습니다.');
        queryClient.invalidateQueries([
          SALE_LIST,
          PURCHASE_LIST,
        ]);
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
      <SignUpDialog
        openSignUp={openSignUp}
        onClose={() => setOpenSignUp(false)}
      />
      <Header
        sx={{
          justifyContent: 'space-between',
          mb: 4,
        }}
      >
        <Typography variant="h4">관리자 관리</Typography>
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
              startIcon={
                isResetting ? (
                  <CircularProgress size={18} />
                ) : (
                  <Person />
                )
              }
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
        <Grid container rowSpacing={1} columnSpacing={1}>
          {userData?.map((user, index) => {
            return (
              <Grid
                key={user?.id ?? index}
                item
                xs={100}
                md={6}
                lg={4}
                xl={3}
              >
                <>
                  {isLoading ? (
                    <Skeleton
                      sx={{ mx: 2, my: 1.2 }}
                      height={240}
                      variant="rounded"
                    />
                  ) : (
                    <UserCard key={user.id} user={user} />
                  )}
                </>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Admin;
