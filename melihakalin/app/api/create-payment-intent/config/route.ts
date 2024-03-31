import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const user = await getServerSession(authOptions);
  if (user) {
    return NextResponse.json({
      publishable_key: process.env.STRIPE_PUBLIC_KEY,
    });
  } else {
    return NextResponse.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    );
  }
};
