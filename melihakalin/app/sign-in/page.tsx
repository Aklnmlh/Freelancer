'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { LoginSchema } from '@/helpers/ValidationSchemas/AuthSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();

  return (
    <main className="flex-1 px-4 md:px-6 py-6 sm:py-12 md:py-24 lg:py-32">
      <form
        onSubmit={handleSubmit(async (values) => {
          await signIn('credentials', { ...values, redirect: false }).then(
            ({ ok, error }: any) => {
              if (ok) {
                window.location.href = '/dashboard?newuser=true';
              } else {
                toast(error);
              }
            }
          );
        })}
        className="container mx-auto max-w-md"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-8">
          Giriş Yap
        </h1>
        <Card>
          <CardContent>
            <div className="flex flex-col space-y-6">
              <label className="flex flex-col">
                <span className="text-sm font-medium mt-[2svh]">E-posta</span>
                <input
                  data-testid={'email'}
                  className="px-2 py-1 border rounded-md"
                  {...register('email')}
                  type="email"
                />
                {errors.email ? (
                  <span className="text-red-600 mt-[1svh]">
                    {errors.email.message}
                  </span>
                ) : null}
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium">Şifre</span>
                <input
                  data-testid={'password'}
                  {...register('password')}
                  className="px-2 py-1 border rounded-md"
                  type="password"
                />
                {errors.password ? (
                  <span className="text-red-600 mt-[1svh]">
                    {errors.password.message}
                  </span>
                ) : null}
              </label>
              <button
                data-testid={'login'}
                className="bg-black text-white py-2 rounded-md"
              >
                Giriş Yap
              </button>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-center mt-4"
                href="/sign-up"
                data-testid={'signuppage'}
              >
                Hesabınız yok mu? Kayıt olun
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
};

export default SignInPage;
