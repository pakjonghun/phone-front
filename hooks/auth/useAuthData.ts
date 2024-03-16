import { client } from '@/api/client';
import { CommonError, CommonMutation } from '@/api/type';
import { User } from '@/model/user';
import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { ResponseMyInfo } from './type';
import { UPLOAD_LIST } from './constant';

const signUp = (body: User) => {
  return client
    .post(`/user/signup/${body.id}`, body, {
      params: { id: body.id },
    })
    .then((res) => res.data);
};

export const useSignUp = () => {
  return useMutation<CommonMutation, CommonError, User>({
    mutationFn: signUp,
  });
};

const login = (body: Omit<User, 'role'>) => {
  return client
    .post('/user/login', body)
    .then((res) => res.data);
};

export const useLogin = () => {
  return useMutation<
    CommonMutation & { userInfo: ResponseMyInfo },
    CommonError,
    Omit<User, 'role'>
  >({
    mutationFn: login,
  });
};

const myInfo = () => {
  return client.get('/user/me').then((res) => res.data);
};

export const useMyInfo = () => {
  return useQuery<ResponseMyInfo, void>({
    queryKey: ['myInfo'],
    queryFn: myInfo,
    staleTime: 0,
    retry: false,
  });
};

export const logout = () => {
  client.get('/user/logout').then((res) => res.data);
};

const getUploadRecordList = () => {
  return client
    .get('/upload/record')
    .then((res) => res.data);
};

export const useGetUploadRecordList = () => {
  return useQuery<{ updatedAt: Date; _id: string }[], void>(
    {
      queryKey: [UPLOAD_LIST],
      queryFn: getUploadRecordList,
    }
  );
};

const deleteRecord = (body: { uploadId: string }) => {
  return client
    .delete('/upload/delete', { data: body })
    .then((res) => res.data);
};

export const useDeleteRecord = () => {
  return useMutation<
    CommonMutation,
    CommonError,
    { uploadId: string }
  >({
    mutationFn: deleteRecord,
  });
};
