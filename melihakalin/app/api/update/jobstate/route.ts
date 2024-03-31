import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import prisma from '@/db';
export const PUT = async (req: Request) => {
  const user = await getServerSession(authOptions);
  const { id } = await req.json();
  if (user) {
    try {
      if (id) {
        const job = await prisma.jobs.findFirst({
          where: {
            id,
          },
        });
        const userData = await prisma.user.findFirst({
          where: {
            email: user.user?.email,
          },
        });
        if (job?.isTaken) {
          return NextResponse.json(
            {
              message: "Job is already taken you can't take this job anymore.",
            },
            {
              status: 401,
            }
          );
        } else {
          const takeJob = await prisma.jobs.update({
            where: {
              id,
            },
            data: {
              isTaken: true,
              takenById: userData?.id,
            },
          });
          const isConversationExist = await prisma.conversation.findFirst({
            where: {
              AND: [
                {
                  participants: {
                    some: {
                      id: userData?.id,
                    },
                  },
                },
                {
                  participants: {
                    some: {
                      id: takeJob.userId,
                    },
                  },
                },
              ],
            },
          });
          if (isConversationExist) {
            return NextResponse.json(
              { message: 'Job taken successfully' },
              { status: 200 }
            );
          } else {
            const createConversation = await prisma.conversation.create({
              data: {
                participants: {
                  connect: [
                    { id: userData?.id },
                    {
                      id: job?.userId,
                    },
                  ],
                },
              },
            });

            return NextResponse.json(
              { message: 'Job taken successfully' },
              { status: 200 }
            );
          }
        }
      } else {
        return NextResponse.json(
          { message: 'Invalid body provided' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: 'error', error },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    );
  }
};
