export type Client = {
  _id: string;
  lastOutDate: string;
  note: string;
  manager: string;
  products?: { product: string }[];
};
