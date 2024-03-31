import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import prisma from '@/db';
export const PUT = async (req: Request) => {
  const session = await getServerSession(authOptions);
  try {
    const { type } = await req.json();
    if (type) {
      if (session?.user) {
        try {
          const updated = await prisma.user.update({
            where: {
              email: session.user.email as string,
            },
            data: {
              type: type,
            },
            select: {
              type: true,
            },
          });
          return NextResponse.json({ message: 'success', updated });
        } catch (error) {
          console.log(error);
          return NextResponse.json(
            { message: 'error', error },
            { status: 500 }
          );
        }
      }
    } else {
      return NextResponse.json({
        message: 'Please provide an correct body to request',
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Please provide an correct body to request',
      },
      {
        status: 400,
      }
    );
  }
};
