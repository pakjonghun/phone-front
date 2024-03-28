import { LENGTH } from '@/api/constant';
import { RequestClientList } from '@/hooks/search/client/type';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ClientQueryAction = {
  setKeyword: (keyword: string) => void;
};

export const initClientQuery: RequestClientList = {
  keyword: '',
  length: LENGTH,
};

type ClientQueryStoreType = RequestClientList & ClientQueryAction;

const clientQueryStoreApi: StateCreator<
  ClientQueryStoreType,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set, get) => ({
  ...initClientQuery,
  setKeyword: (keyword) =>
    set(
      (state) => {
        state.keyword = keyword;
      },
      false,
      'setKeyword'
    ),
});

export const useClientQueryStore = create<ClientQueryStoreType>()(
  immer(devtools(clientQueryStoreApi))
);
