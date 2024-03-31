import { getServerSession } from 'next-auth';
import React from 'react';
import prisma from '@/db';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserIcon } from 'lucide-react';
import JobApproveButton from '@/components/DashboardPage/JobApproveButton';
import Link from 'next/link';
export const revalidate = 5;
export const dynamic = 'force-dynamic';
const JobDetails = async ({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) => {
  const user = await getServerSession();
  const userDetail = await prisma.user.findFirst({
    where: {
      email: user?.user?.email,
    },
  });
  const isAuthorized = await prisma.jobs.findFirst({
    where: {
      OR: [
        {
          takenById: userDetail?.id,
        },
        {
          userId: userDetail?.id,
        },
      ],
    },
    select: {
      category: true,
      completed: true,
      userId: true,
      id: true,
      price: true,
      status: true,
      isTaken: true,
      title: true,
      description: true,
      takenById: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  const jobDetail = await prisma.jobs.findFirst({
    where: {
      id,
    },
    select: {
      missons: true,
      title: true,
      takenById: true,
      completed: true,
      isTaken: true,
      id: true,
      description: true,
      price: true,
    },
  });
  console.log(jobDetail);
  return (
    <div>
      {isAuthorized ? (
        <main className="flex-1">
          <div className="container h-full w-full my-[15svh]">
            {isAuthorized.userId === userDetail?.id ? (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between h-full w-full">
                    <h2 className="text-2xl font-bold">{jobDetail?.title}</h2>
                    {jobDetail?.takenById ? (
                      jobDetail?.completed ? (
                        <>İşi Hali Hazırda Onayladınız</>
                      ) : (
                        <JobApproveButton id={jobDetail?.id} />
                      )
                    ) : jobDetail?.isTaken && jobDetail?.completed === false ? (
                      <>İş Hala Alınmamış Durumda</>
                    ) : null}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 mb-4">
                      {jobDetail?.description}
                    </p>
                    {jobDetail?.missons && jobDetail.missons.length > 0 ? (
                      <>
                        <h1 className="font-semibold text-lg">Görevler</h1>
                        <ul className="px-8">
                          {jobDetail.missons.map((item) => {
                            return (
                              <li
                                key={item.id}
                                className="list-disc flex flex-row  "
                              >
                                <div className="flex flex-row  gap-2">
                                  <div>
                                    <h1>Görev Başlığı</h1>
                                    {item.name}
                                  </div>
                                  <div>
                                    <h1>Görev Ücreti</h1>
                                    {item.price}
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : null}
                    <div className="mt-8 flex flex-col items-center md:flex-row md:items-start md:justify-between">
                      <Link
                        href={'/dashboard/messages'}
                        className="flex items-center gap-4"
                      >
                        <UserIcon className="w-8 h-8" />
                        <p className="font-medium text-lg">{userDetail.name}</p>
                      </Link>
                      <div className="mt-4 md:mt-0">
                        <p className="text-lg font-bold">
                          Ücret: ₺{jobDetail?.price}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between h-full w-full">
                  <h2 className="text-2xl font-bold">{jobDetail?.title}</h2>
                  {jobDetail?.completed ? (
                    <>Müşteri İşi Onayladı Bakiyenizi Kontrol Edin Lütfen</>
                  ) : (
                    <>Müşteri Onayı Bekleniyor</>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">{jobDetail?.description}</p>

                  <div className="mt-8 flex flex-col items-center md:flex-row md:items-start md:justify-between">
                    <Link
                      href={'/dashboard/messages'}
                      className="flex items-center gap-4"
                    >
                      <UserIcon className="w-8 h-8" />
                      <p className="font-medium text-lg">
                        {isAuthorized.user.name}
                      </p>
                    </Link>
                    <div className="mt-4 md:mt-0">
                      <p className="text-lg font-bold">
                        Ücret: ₺{jobDetail?.price}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      ) : (
        <p>Bu Veriyi Görmek İçin Yetkili Değilsiniz.</p>
      )}
    </div>
  );
};

export default JobDetails;
