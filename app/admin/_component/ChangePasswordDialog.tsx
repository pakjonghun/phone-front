'use client';

import { useSnackbar } from '@/context/SnackBarProvicer';
import { ChangePasswordRequest } from '@/hooks/user/type';
import { useChangePassword } from '@/hooks/user/useUserData';
import { useUserAlert } from '@/lib/store/user/userAlert';
import { useUserId } from '@/lib/store/user/userId';
import {
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';

type FormInput = {
  password: string;
  passwordConfirm: string;
};

const ChangePasswordDialog = () => {
  const snackbar = useSnackbar();
  const setShowForm = useUserAlert(
    (state) => state.setFormShow
  );
  const selectedUserId = useUserId(
    (state) => state.selectedUserId
  );
  const setSelectedUserId = useUserId(
    (state) => state.setSelectedUserId
  );

  const {
    register,
    handleSubmit,
    getValues,
    formState: {
      errors: { password, passwordConfirm },
    },
  } = useForm<FormInput>({
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });
  const { mutate: changePassword } = useChangePassword();
  const handleChangePassword = (
    body: ChangePasswordRequest
  ) => {
    changePassword(body, {
      onSuccess: () => {
        snackbar('비밀번호 변경이 성공했습니다', 'success');
        setSelectedUserId('');
      },
      onError: (error) => {
        const errorMessage = error.response.data?.message;
        snackbar(
          errorMessage ?? '비밀번호 변경이 실패했습니다',
          'error'
        );
      },
      onSettled: () => {
        setShowForm(false);
      },
    });
  };
  const handleSubmitPasswordChange = (
    values: FormInput
  ) => {
    handleChangePassword({
      password: values.password,
      id: selectedUserId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitPasswordChange)}
    >
      <DialogContent>
        <FormControl fullWidth>
          <TextField
            helperText={password?.message ?? ''}
            error={!!password?.message}
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 8자리 이상입니다.',
              },
            })}
            fullWidth
            sx={{ my: 2 }}
            label="변경할 비밀번호"
            type="password"
            placeholder="변경할 비밀번호"
          />
          <TextField
            helperText={passwordConfirm?.message ?? ''}
            error={!!passwordConfirm?.message}
            {...register('passwordConfirm', {
              minLength: {
                value: 8,
                message: '비밀번호는 8자리 이상입니다.',
              },
              validate: (value) => {
                return (
                  value === getValues().password ||
                  '비밀번호와 비밀번호가 같아야 합니다.'
                );
              },
            })}
            fullWidth
            label="변경할 비밀번호 확인"
            type="password"
            placeholder="변경할 비밀번호 확인"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => setShowForm(false)}
        >
          취소
        </Button>
        <Button variant="contained" type="submit">
          변경
        </Button>
      </DialogActions>
    </form>
  );
};

export default ChangePasswordDialog;
