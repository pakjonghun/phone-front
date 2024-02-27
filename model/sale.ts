export type Sale = {
  isConfirmed: boolean;
  modelNumber: string;
  rank: string;
  distanceLog: string | null;
  recentHighSalePrice: number;
  recentLowPrice: number;
  belowAverageCount: number;
};
