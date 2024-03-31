import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
export const revalidate = 5;
export const dynamic = 'force-dynamic';
const ProfilePage = async () => {
  const session = await getServerSession();
  const userData = await prisma.user.findFirst({
    where: {
      email: session?.user?.email!,
    },
  });
  return (
    <main className="flex-1">
      <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  Profilin
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Profil Detayları
          </h2>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">İsim</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">{userData?.name}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">E-posta</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">{userData?.email}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Bakiye</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">₺{userData?.balance}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
