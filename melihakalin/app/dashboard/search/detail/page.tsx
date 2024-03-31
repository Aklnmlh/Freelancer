import DetailJobButton from '@/components/DashboardPage/DetailJobButton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserIcon } from 'lucide-react';
import React from 'react';
import prisma from '@/db';
import ApproveMissionButton from '@/components/DashboardPage/ApproveMissionButton';
import { getServerSession } from 'next-auth';
import { IJobWithMission } from '@/types';
let data: IJobWithMission;
const SearchDetailPage = async ({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) => {
  try {
    //@ts-ignore
    data = await prisma?.jobs.findFirst({
      where: {
        id,
      },
      select: {
        category: true,
        completed: true,
        description: true,
        price: true,
        id: true,
        title: true,
        isTaken: true,
        takenById: true,
        missons: true,
        user: {
          select: {
            email: true,
            name: true,
            id: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
  console.log(data);
  const session = await getServerSession();
  console.log(session);
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="mt-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between w-full">
                <h2 className="text-2xl font-bold">{data?.title}</h2>
                {data && data?.isTaken ? (
                  <p>İş Alınmış Durumda</p>
                ) : data && data.missons && data?.missons.length > 0 ? (
                  <></>
                ) : (
                  <DetailJobButton {...data!} />
                )}
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">{data?.description}</p>
                {data && data.missons && data.missons.length > 0 ? (
                  <div>
                    <h1 className="font-semibold text-lg">Görevler</h1>
                    <ul className="px-8">
                      {data?.missons.map((item) => {
                        return (
                          <li
                            key={item.id}
                            className="list-disc flex flex-row  "
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-3 w-full  gap-2">
                              <div>
                                <h1>Görev Başlığı</h1>
                                {item.name}
                              </div>
                              <div>
                                <h1>Görev Ücreti</h1>
                                {item.price}
                              </div>
                            </div>
                            {item.completed === false ? (
                              //@ts-ignore
                              data &&
                              data?.user.email == session?.user?.email ? (
                                <></>
                              ) : (
                                <ApproveMissionButton id={item.id} />
                              )
                            ) : (
                              'Görev Tamamlanmış Halde'
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
                <div className="mt-8 flex flex-col items-center md:flex-row md:items-start md:justify-between">
                  <div className="flex items-center gap-4">
                    <UserIcon className="w-8 h-8" />
                    <p className="font-medium text-lg">{data?.user.name}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-lg font-bold">Ücret: ₺{data?.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SearchDetailPage;
