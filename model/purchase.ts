import { Client } from './client';
import { Product } from './product';

export type Purchase = {
  _id: string;
  inDate: string;
  isConfirmed: boolean;
  rank: number;
  distanceLog: string | null;
  inClient: Client;
  product: Product;
  inPrice: number;
};
