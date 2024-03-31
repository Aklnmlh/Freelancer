import nextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/db';
import Stripe from 'stripe';
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });
        if (user && (await compare(password, user.password as string))) {
          if (!user.cus_id) {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
              apiVersion: '2023-10-16',
            });
            await stripe.customers
              .create({
                email: user.email!,
              })
              .then(async (customer) => {
                return prisma.user.update({
                  where: { id: user.id },
                  data: {
                    cus_id: customer.id,
                  },
                });
              });
            return {
              ...user,
            };
          } else {
            return {
              ...user,
            };
          }
        } else {
          throw new Error('Geçersiz E-posta Adresi veya Şifre');
        }
      },
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2023-10-16',
      });
      await stripe.customers
        .create({
          email: user.email!,
        })
        .then(async (customer) => {
          return prisma.user.update({
            where: { id: user.id },
            data: {
              cus_id: customer.id,
            },
          });
        });
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/',
  },
};

export const handler = nextAuth(authOptions);
