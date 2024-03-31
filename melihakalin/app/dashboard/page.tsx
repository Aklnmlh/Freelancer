import { getServerSession } from 'next-auth';
import React from 'react';
import { redirect } from 'next/navigation';
import NewUserSelector from '@/components/DashboardPage/NewUser/NewUserSelector';
import { Loader2 } from 'lucide-react';
import prisma from '@/db';
import JobCard from '@/components/DashboardPage/JobCard';
import SearchInput from '@/components/DashboardPage/SearchInput';
import CreateJobButton from '@/components/DashboardPage/CreateJobButton';
export const revalidate = 5;
export const dynamic = 'force-dynamic';
const DashboardPage = async ({
  searchParams,
}: {
  searchParams: { newuser: string };
}) => {
  const session = await getServerSession();
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  if (searchParams.newuser == 'true' || user?.type == 'NOT_SET') {
    if (user?.type === 'NOT_SET') {
      return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <NewUserSelector />
        </div>
      );
    } else {
      redirect('/dashboard');
    }
  }

  const jobs = (await prisma.jobs.findMany({
    where: {
      OR: [
        {
          takenById: user?.id,
        },
        {
          userId: user?.id,
        },
      ],
    },
  })) ?? { Jobs: [] };

  return (
    <main className="flex-1">
      <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  Kontrol Panelinize Hoş Geldiniz
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-row w-full items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              İşleriniz
            </h2>
            {user?.type === 'EMPLOYER' ? (
              <div className="flex flex-row gap-4">
                <CreateJobButton user={user} />
              </div>
            ) : null}
          </div>
          <SearchInput />
          <div className="grid grid-cols-2 w-full sm:grid-cols-4 gap-4">
            {jobs ? (
              jobs.length > 0 ? (
                jobs.map((item) => {
                  /*@ts-ignore*/
                  return <JobCard key={item.id} {...item} />;
                })
              ) : (
                <p className="text-center mt-3 font-bold !w-[100svw] md:!w-full">
                  Şuan için bir işiniz bulunmuyor.
                </p>
              )
            ) : (
              <Loader2 className="animate-spin" color="blue" />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
