import { client } from '@/util';
import { cookies } from 'next/headers';

export const serverMe = async () => {
  const cookie = cookies().get('userInfo')?.value;
  console.log('send cookiecookie', cookie);
  if (!cookie) {
    return;
  }
  return client(
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/me`, {
      headers: {
        Cookie: cookie,
      },
      credentials: 'include',
      cache: 'no-store',
      next: { revalidate: 0 },
    })
  );
};
