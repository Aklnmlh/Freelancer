import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import prisma from '@/db';
import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conversationid = searchParams.get('conversationID');

  const session = await getServerSession(authOptions);
  if (session) {
    const data = await prisma.conversation.findFirst({
      where: {
        id: conversationid!,
        AND: {
          participants: {
            some: {
              email: session.user?.email!,
            },
          },
        },
      },
      select: {
        messages: {
          select: {
            body: true,
            fileUrl: true,
            conversationId: true,
            id: true,
            createdAt: true,
            sender: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
    if (data) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { message: 'messages not found!' },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      { message: 'not authorized' },
      {
        status: 401,
      }
    );
  }
}
