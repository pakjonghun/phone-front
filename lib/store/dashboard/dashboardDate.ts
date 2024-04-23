import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import dayjs, { Dayjs } from 'dayjs';
import { immer } from 'zustand/middleware/immer';

type NullableDate = Dayjs | null;

type DashboardRange = {
  saleDate: NullableDate;
  purchaseDate: NullableDate;
};

type DashboardRangeAction = {
  setSale: (date: NullableDate) => void;
  setPurchase: (date: NullableDate) => void;
};

type DashboardRangeState = DashboardRangeAction & DashboardRange;

const initState: DashboardRange = {
  saleDate: dayjs(),
  purchaseDate: dayjs(),
};

const dashboardDateApi: StateCreator<
  DashboardRangeState,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  ...initState,
  setSale: (date) =>
    set((state) => {
      state.saleDate = date;
    }),
  setPurchase: (date) =>
    set((state) => {
      state.purchaseDate = date;
    }),
});

export const useDashboardStore = create<
  DashboardRangeState,
  [['zustand/immer', never], ['zustand/devtools', never]]
>(immer(devtools(dashboardDateApi)));
