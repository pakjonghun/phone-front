'use client';

import SubmitButton from '@/components/SubmitButton';
import { Form } from '@/components/common';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { useLogin, useMyInfo } from '@/hooks/auth/useAuthData';
import { useAuthStore } from '@/lib/store/auth/auth';
import { User } from '@/model/user';
import { FormGroup, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type LoginUser = Omit<User, 'role'>;

const Login = () => {
  const snackbar = useSnackbar();
  const { mutate: login, isPending } = useLogin();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const { isLoading, isError } = useMyInfo();

  useEffect(() => {
    if (isLoading) return;

    if (!isError) {
      router.push('/dashboard');
    }
  }, [isError, isLoading, router]);

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
        router.replace('/dashboard');
      },
      onError: (error) => {
        const errorMessage = error.response?.data.message;
        snackbar(errorMessage ?? '로그인 실패', 'error');
      },
    });
  };

  if (isLoading || !isError) {
    return <></>;
  }

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
        <FormGroup>
          <InputLabel>아이디</InputLabel>
          <TextField
            {...register('id', {
              required: '아이디를 입력하세요',
              minLength: {
                value: 2,
                message: '아이디는 2글자 이상을 입력하세요.',
              },
            })}
            variant="outlined"
            error={!!errors.id}
            helperText={errors.id?.message}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel>비밀번호</InputLabel>
          <TextField
            {...register('password', {
              required: '비밀번호를 입력하세요',
              minLength: {
                value: 8,
                message: '비밀번호는 8글자 이상을 입력하세요.',
              },
            })}
            variant="outlined"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </FormGroup>
        <SubmitButton isLoading={isPending} text="로그인" />
      </Stack>
    </Form>
  );
};

export default Login;
