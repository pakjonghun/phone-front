import { client } from '@/api/client';
import { useInfiniteQuery } from 'react-query';

type PageParams = {
  length: number;
  keyword: string;
};

const getFetch = async (query: PageParams) => {
  return client('url', { params: query }).then<string[]>((res) => res.data);
};

export const useGetListInfinity = (query: PageParams) => {
  return useInfiniteQuery<string[], unknown, PageParams, string | string[]>({
    queryKey: ['a'],
    queryFn: () => getFetch(query),
    getNextPageParam: (lastPage, allPages) => {
      const length = 10;
      const totalCount = 1000;
      const currentPage = allPages.length;
      return totalCount > currentPage * length ? currentPage + 1 : null;
    },
  });
};
