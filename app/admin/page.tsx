'use client';

import { Header } from '@/components/common';
import { Person } from '@mui/icons-material';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { FormEvent, useState } from 'react';
import SignUpDialog from './_component/SignUpDialog';
import {
  useChangePassword,
  useDropAccount,
  useUserList,
} from '@/hooks/user/useUserData';
import UserCard from './_component/UserCard';
import { useUserAlert } from '@/lib/store/user/userAlert';
import FormDialog from '@/components/dialog/FormDialog';
import { ChangePasswordRequest } from '@/hooks/user/type';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { useForm } from 'react-hook-form';
import ChangePasswordDialog from './_component/ChangePasswordDialog';
import AlertDialog from '@/components/dialog/AlertDialog';
import { useUserId } from '@/lib/store/user/userId';
import { useQueryClient } from 'react-query';
import { USER_LIST } from '@/hooks/user/constant';

const Admin = () => {
  const snackbar = useSnackbar();
  const { data: userList } = useUserList();

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
        {userList?.map((user) => {
          return (
            <Grid key={user.id} item xs={10} md={6} lg={3}>
              <UserCard key={user.id} user={user} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Admin;
