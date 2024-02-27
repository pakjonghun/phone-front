export type CommonMutation = {
  message: string;
};

export type CommonError = {
  response: {
    data: {
      message: string;
    };
  };
};

export type Order = 1 | -1;

export type ListData<T> = {
  data: T;
  totalCount: number;
  hasNext: boolean;
};
