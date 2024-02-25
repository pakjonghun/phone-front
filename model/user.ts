export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
}

export type User = {
  id: string;
  password: string;
  role: Role;
};
