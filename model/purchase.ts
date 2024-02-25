export type Purchase = {
  isConfirmed: boolean;
  modelNumber: string;
  rank: string;
  distanceLog: string | null;
  recentHighSalePrice: number;
  recentRowPrice: number;
  belowAverageCount: number;
};
