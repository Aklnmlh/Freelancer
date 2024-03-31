import { authSchemaValidate } from '@/helpers/ValidationSchemas/AuthSchema';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextResponse } from 'next/server';
import prisma from '@/db';
import { hash } from 'bcrypt';
export const POST = async (req: Request) => {
  try {
    const { email, password, name } = await req.json();
    const isValid = await authSchemaValidate(email, password, name);
    const adapter = PrismaAdapter(prisma);
    if (isValid.message) {
      const isExist = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (isExist) {
        return NextResponse.json(
          {
            message: 'User is already exist',
            success: false,
          },
          {
            status: 400,
          }
        );
      } else {
        const hashed = (await hash(password, 10)) as string;
        const data = {
          email,
          name,
          password: hashed,
        };
        //@ts-ignore
        await adapter.createUser({
          ...data,
          emailVerified: null,
        });
        return NextResponse.json({ message: 'success', success: true });
      }
    } else {
      return NextResponse.json({
        message: 'error',
        error: isValid.error,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error', error, success: false });
  }
};
