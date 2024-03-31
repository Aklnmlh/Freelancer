import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import prisma from '@/db';

export const POST = async (req: Request) => {
  const user = await getServerSession(authOptions);
  const { id, proof } = await req.json();
  if (user) {
    const userDetail = await prisma.user.findFirst({
      where: { email: user.user?.email },
    });

    const missionDetail = await prisma.mission.findFirst({
      where: {
        id,
      },
    });
    await prisma.mission.update({
      where: {
        id,
      },
      data: {
        completed: true,
        proof,
      },
    });
    await prisma.user.update({
      where: {
        email: user.user?.email!,
      },
      data: {
        balance: { increment: missionDetail?.price },
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
};
