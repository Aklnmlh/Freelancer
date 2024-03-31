import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import prisma from '@/db';

export const POST = async (req: Request) => {
  const user = await getServerSession(authOptions);
  const { id } = await req.json();
  if (user) {
    const userDetail = await prisma.user.findFirst({
      where: { email: user.user?.email },
    });
    const isAuthorized = await prisma.jobs.findFirst({
      where: {
        AND: [
          {
            id,
          },
          {
            userId: userDetail?.id,
          },
        ],
      },
    });
    if (isAuthorized) {
      await prisma.jobs.update({
        where: {
          id,
        },
        data: {
          completed: true,
        },
      });
      const balancePrevious = await prisma.user.findFirst({
        where: {
          id: isAuthorized?.takenById as string,
        },
      });
      const newBalance = balancePrevious?.balance as number;
      await prisma.user.update({
        where: {
          id: isAuthorized?.takenById as string,
        },
        data: {
          balance: (newBalance + isAuthorized.price!) as number,
        },
      });
      return NextResponse.json(
        { message: 'Updated successfully' },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        { message: 'unauthorized' },
        {
          status: 401,
        }
      );
    }
  } else {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }
};
