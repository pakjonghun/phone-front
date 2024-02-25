import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  cookies().delete('userInfo');
  return NextResponse.json({ message: 'success' });
}
