'use client';

import SubmitButton from '@/components/SubmitButton';
import { Form } from '@/components/common';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { useLogin } from '@/hooks/auth/useAuthData';
import { useAuthStore } from '@/lib/store/auth/auth';
import { User } from '@/model/user';
import {
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

type LoginUser = Omit<User, 'role'>;

const Login = () => {
  const snackbar = useSnackbar();
  const { mutate: login, isLoading } = useLogin();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const submit = (value: LoginUser) => {
    login(value, {
      onSuccess: (response) => {
        snackbar('로그인 성공', 'success');
        setUser(response.userInfo);
        router.push('/dashboard');
      },
      onError: (error) => {
        const errorMessage = error.response?.data.message;
        snackbar(errorMessage ?? '로그인 실패', 'error');
      },
    });
  };

  return (
    <Form
      onSubmit={handleSubmit(submit)}
      sx={{
        pt: '20%',
        mx: 'auto',
        width: '50%',
        maxWidth: '500px',
      }}
    >
      <Typography variant="h5" sx={{ mb: '10%' }}>
        로그인
      </Typography>
      <Stack direction="column" gap={2}>
        <TextField
          {...register('id', {
            required: '아이디를 입력하세요',
            minLength: {
              value: 2,
              message: '아이디는 2글자 이상을 입력하세요.',
            },
          })}
          label="아이디"
          variant="outlined"
          error={!!errors.id}
          helperText={errors.id?.message}
        />
        <TextField
          {...register('password', {
            required: '비밀번호를 입력하세요',
            minLength: {
              value: 8,
              message:
                '비밀번호는 8글자 이상을 입력하세요.',
            },
          })}
          label="비밀번호"
          variant="outlined"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <SubmitButton isLoading={isLoading} text="로그인" />
      </Stack>
    </Form>
  );
};

export default Login;
