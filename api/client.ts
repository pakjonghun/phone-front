import axios from 'axios';
import { BASE_URL } from './constant';

export const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
