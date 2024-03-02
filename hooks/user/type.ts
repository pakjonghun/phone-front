import { Role } from '@/model/user';

export type SignupRequest = {
  id: string;
  password: string;
  role: Role;
};

export type LoginRequest = {
  id: string;
  password: string;
};

export type MeResponse = {
  role: Role;
  id: string;
};

export type RoleItem = { name: Role; description: string };

export type ChangePasswordRequest = {
  id: string;
  password: string;
};

export type ChangeRoleRequest = {
  id: string;
  role: Role;
};
