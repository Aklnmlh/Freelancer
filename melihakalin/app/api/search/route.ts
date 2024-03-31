import prisma from '@/db';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 10;
  try {
    let whereClause: any = {
      completed: {
        equals: false,
      },
    };

    if (query) {
      whereClause.title = {
        contains: query,
      };
    }

    if (category) {
      whereClause.category = {
        contains: category,
      };
    }

    const totalCount = await prisma.jobs.count({ where: whereClause });
    const totalPages = Math.ceil(totalCount / pageSize);

    const data = await prisma.jobs.findMany({
      where: whereClause,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    console.log(data);
    return NextResponse.json(
      { data, totalPages, currentPage: page, pageSize, totalCount },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'error', error },
      {
        status: 500,
      }
    );
  }
};
