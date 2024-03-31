'use client';
import { Card, CardContent } from '@/components/ui/card';
import { RegisterSchema } from '@/helpers/ValidationSchemas/AuthSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
interface FormType {
  email: string;
  password: string;
  name: string;
}
const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(RegisterSchema),
  });

  const [values, setValues] = React.useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (values: FormType) => {
      try {
        const fetchData = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({
            ...values,
          }),
        });
        return await fetchData.json();
      } catch (error) {
        console.log(error);
        throw new Error(
          'Hali hazırda kullanılan bir e-posta girdiniz. Bir hata olduğunu düşünüyorsanız lütfen daha sonra tekrar deneyin.'
        );
      }
    },
    onSuccess: async () => {
      await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      }).then(({ ok, error }: any) => {
        if (ok) {
          router.replace('/dashboard?newuser=true');
        } else {
          toast(error);
        }
      });
    },

    onError: (err) => {
      toast(
        'Hali hazırda kullanılan bir e-posta girdiniz. Bir hata olduğunu düşünüyorsanız lütfen daha sonra tekrar deneyin.'
      );
    },
  });
  const router = useRouter();
  return (
    <main className="flex-1 px-4 md:px-6 py-6 sm:py-12 md:py-24 lg:py-32">
      <form
        onSubmit={handleSubmit(async (values) => {
          setValues(values);
          await mutateAsync(values);
        })}
        className="container mx-auto max-w-md"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-8">
          Kayıt Ol
        </h1>
        <Card>
          <CardContent>
            <div className="flex flex-col space-y-6">
              <label className="flex flex-col">
                <span className="text-sm font-medium mt-[2svh]">Ad</span>
                <input
                  className="px-2 py-1 border rounded-md"
                  {...register('name')}
                  type="name"
                />
                {errors.name ? (
                  <span className="text-red-600 mt-[1svh]">
                    {errors.name.message}
                  </span>
                ) : null}
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium mt-[2svh]">E-posta</span>
                <input
                  data-testid={'signup-email'}
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
                  data-testid={'signup-password'}
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
                data-testid={'signup-button'}
                disabled={isPending}
                className="bg-black text-white py-2 rounded-md disabled:bg-opacity-50 flex flex-row items-center justify-center"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : null}{' '}
                Kayıt Ol
              </button>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-center mt-4"
                href="/sign-in"
                data-testid={'signinpage'}
              >
                Hesabınız var mı? Giriş Yapın
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
};

export default SignUpPage;
