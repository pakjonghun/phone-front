import { USER_LIST } from './constant';
import { User } from '@/model/user';
import { client } from '@/api/client';
import {
  ChangePasswordRequest,
  ChangeRoleRequest,
} from './type';
import { CommonError, CommonMutation } from '@/api/type';
import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';

const userList = async () => {
  return client.get('/user').then((res) => res.data);
};

export const useUserList = () => {
  return useQuery<Omit<User, 'password'>[]>({
    queryKey: [USER_LIST],
    queryFn: userList,
    select: (data) => {
      const originUser = data as unknown as (Omit<
        User,
        'id' | 'password'
      > & { _id: string })[];

      const result = originUser.map((user) => ({
        role: user.role,
        id: user._id,
      }));

      return result;
    },
  });
};

const changePassword = async ({
  id,
  password,
}: ChangePasswordRequest) => {
  return client
    .put<CommonMutation>(`/user/password/${id}`, {
      password,
    })
    .then((res) => res.data);
};

export const useChangePassword = () => {
  return useMutation<
    CommonMutation,
    CommonError,
    ChangePasswordRequest
  >({
    mutationFn: changePassword,
  });
};

const changeRole = async (body: ChangeRoleRequest) => {
  return client
    .put(`/user/role/${body.id}`, { role: body.role })
    .then((res) => res.data);
};

export const useChangeRole = () => {
  return useMutation<
    CommonMutation,
    CommonError,
    ChangeRoleRequest
  >({
    mutationFn: changeRole,
  });
};

const dropAccount = async (id: string) => {
  return client
    .delete(`/user/${id}`)
    .then((res) => res.data);
};

export const useDropAccount = () => {
  return useMutation<CommonMutation, CommonError, string>({
    mutationFn: dropAccount,
  });
};

const resetData = async () => {
  return client.delete('/reset').then((res) => res.data);
};

export const useResetAllData = () => {
  return useMutation<CommonMutation, CommonError, void>({
    mutationFn: resetData,
  });
};
