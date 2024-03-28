export type RequestClientList = {
  keyword: string;
  length: number;
};

export type RequestEditClient = {
  id: string;
  manager?: string;
  note?: string;
};
