'use client';

import { Header } from '@/components/common';
import { Person } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import SignUpDialog from './_component/SignUpDialog';
import {
  useDropAccount,
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
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
          mb: 2,
        }}
      >
        <Button
          startIcon={<Person />}
          sx={{ ml: 'auto' }}
          onClick={() => setOpenSignUp(true)}
          variant="contained"
        >
          회원생성
        </Button>
      </Header>
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
    </Box>
  );
};

export default Admin;
