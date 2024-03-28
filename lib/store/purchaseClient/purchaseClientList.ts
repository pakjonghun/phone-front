import { LENGTH } from '@/api/constant';
import { RequestClientList } from '@/hooks/search/client/type';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PurchaseClientQueryAction = {
  setKeyword: (keyword: string) => void;
};

export const initPurchaseClientQuery: RequestClientList = {
  keyword: '',
  length: LENGTH,
};

type PurchaseClientQueryStoreType = RequestClientList & PurchaseClientQueryAction;

const purchaseClientQueryStoreApi: StateCreator<
  PurchaseClientQueryStoreType,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set, get) => ({
  ...initPurchaseClientQuery,
  setKeyword: (keyword) =>
    set(
      (state) => {
        state.keyword = keyword;
      },
      false,
      'setKeyword'
    ),
});

export const usePurchaseClientQueryStore = create<PurchaseClientQueryStoreType>()(
  immer(devtools(purchaseClientQueryStoreApi))
);
