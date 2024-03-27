'use client';

import SubmitButton from '@/components/SubmitButton';
import { Form } from '@/components/common';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { useSignUp } from '@/hooks/auth/useAuthData';
import { USER_LIST } from '@/hooks/user/constant';
import { User } from '@/model/user';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  openSignUp: boolean;
  onClose: () => void;
}

const SignUpDialog: FC<Props> = ({ openSignUp, onClose }) => {
  const { mutate, isPending } = useSignUp();
  const snackbar = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const queryClient = useQueryClient();
  const submit = (value: User) => {
    mutate(value, {
      onSuccess: () => {
        snackbar('회원가입 성공', 'success');
        queryClient.invalidateQueries({
          queryKey: [USER_LIST],
        });
      },
      onError: (error) => {
        const errorMessage = error.response?.data.message;
        snackbar(errorMessage ?? '회원가입 실패', 'error');
      },
      onSettled: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog fullWidth open={openSignUp} onClose={onClose}>
      <DialogTitle>회원가입</DialogTitle>
      <DialogContent>
        <DialogContentText>새로운 계정을 생성합니다.</DialogContentText>
        <Form
          onSubmit={handleSubmit(submit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 2,
          }}
        >
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
                message: '비밀번호는 8글자 이상을 입력하세요.',
              },
            })}
            label="비밀번호"
            variant="outlined"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Select
            {...register('role', {
              required: '권한을 선택하세요.',
            })}
            defaultValue="ADMIN"
          >
            <MenuItem value="ADMIN">관리자</MenuItem>
            <MenuItem value="MANAGER">매니저</MenuItem>
            <MenuItem value="STAFF">일반</MenuItem>
          </Select>
          <SubmitButton isLoading={isPending} text="회원가입" />
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
