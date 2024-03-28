import { Client } from '@/model/client';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ClientTable = {
  selectedClientList: Client[];
  setSelectedClientList: (clientList: Client[]) => void;
  handleSelectAllClick: (flatClientData: Client[]) => void;
  hasSelectedItem: () => boolean;
  isMultiConfirmLoading: boolean;
  setIsMultiConfirmLoading: (value: boolean) => void;
};

const clientTableApi: StateCreator<
  ClientTable,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set, get) => ({
  isMultiConfirmLoading: false,
  setIsMultiConfirmLoading: (value) =>
    set((state) => {
      state.isMultiConfirmLoading = value;
    }),
  selectedClientList: [],
  hasSelectedItem: () => get().selectedClientList.length > 0,
  setSelectedClientList: (clientList) =>
    set(
      (state) => {
        state.selectedClientList = clientList;
      },
      false,
      'setSelectedClient'
    ),
  handleSelectAllClick: (flatClientData: Client[]) =>
    set((state) => {
      if (!flatClientData) return;

      if (get().selectedClientList.length === flatClientData.length) {
        state.selectedClientList = [];
      } else {
        state.selectedClientList = flatClientData;
      }
    }),
});

export const useClientTable = create<
  ClientTable,
  [['zustand/immer', never], ['zustand/devtools', never]]
>(immer(devtools(clientTableApi)));
