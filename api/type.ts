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
