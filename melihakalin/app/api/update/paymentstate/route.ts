import prisma from '@/db';
import { NextResponse } from 'next/server';
export const PUT = async (req: Request) => {
  const { id } = await req.json();
  await prisma.jobs.update({
    where: { id },
    data: {
      status: 'PAID',
    },
  });
  return NextResponse.json({
    message: 'OK',
  });
};
