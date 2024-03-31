import { authOptions } from '@/auth';
import { jobValidator } from '@/helpers/ValidationSchemas/JobSchema';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import prisma from '@/db';
export const POST = async (req: Request) => {
  const user = await getServerSession(authOptions);
  const body = (await req.json()) as {
    title: string;
    description: string;
    category: string;
    price?: string;
    missions?: {
      task: string;
      price: string;
    }[];
  };

  if (!user) {
    return NextResponse.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    );
  }

  try {
    const validated = await jobValidator(body);
    if (!validated.error) {
      if (body.missions && body.missions.length > 0) {
        // console.log(body.missions, body);
        let price: number;
        if (body.missions && body.missions.length === 1) {
          // Eğer sadece bir mission varsa, direkt olarak onun price'ını al
          price = Number(body.missions[0].price);
        } else {
          // Birden çok mission varsa veya hiç mission yoksa, reduce kullanarak topla
          price = body.missions.reduce(
            (a, b) => Number(a) + Number(b.price),
            0
          );
        }
        const missionsData = body.missions?.map((mission) => ({
          name: mission.task,
          price: Number(mission.price),
        }));
        console.log(price);
        const job = await prisma.jobs.create({
          data: {
            category: body.category,
            description: body.description,
            price: Number(price),
            title: body.title,
            user: {
              connect: {
                email: user.user?.email!,
              },
            },
            missons: {
              createMany: {
                data: missionsData,
              },
            },
          },
        });
        return NextResponse.json(
          { message: 'Job created successfully', job },
          {
            status: 201,
          }
        );
      } else {
        const job = await prisma.jobs.create({
          data: {
            description: body.description,
            price: Number(body.price),
            category: body.category,
            title: body.title,
            user: {
              connect: {
                email: user.user?.email!,
              },
            },
          },
          select: {
            id: true,
          },
        });
        return NextResponse.json(
          { message: 'Job created successfully', job },
          {
            status: 201,
          }
        );
      }
    } else {
      return NextResponse.json(
        { message: 'error', error: validated.error },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error', error });
  }
};
