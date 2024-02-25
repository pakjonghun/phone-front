import { User } from '@/model/user';

export type ResponseMyInfo = Omit<User, 'password'>;
