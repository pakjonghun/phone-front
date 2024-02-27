import { Client } from './client';
import { Product } from './product';

export type Sale = {
  _id: string;
  outDate: string;
  inDate: string;
  isConfirmed: boolean;
  rank: string;
  distanceLog: string | null;
  inClient: Client;
  outClient: Client;
  product: Product;
  inPrice: number;
  outPrice: number;
};
