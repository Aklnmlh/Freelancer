import MessagesShower from '@/components/DashboardPage/MessagesShower';
import React from 'react';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
export const revalidate = 5;
export const dynamic = 'force-dynamic';
const MessagesPage = async ({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) => {
  const session = await getServerSession();
  const currentUser = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    select: {
      id: true,
      name: true,
    },
  });
  const participants = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          id: currentUser?.id,
        },
      },
    },
    select: {
      id: true,
      participants: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  console.log(participants);
  return (
    <main className="flex-1 ">
      <section className="w-full py-12  bg-gray-100">
        <div
          className={
            id
              ? 'grid grid-cols-1 sm:grid-cols-[0.5fr,1.5fr] '
              : 'flex items-center justify-center flex-row w-full'
          }
        >
          <aside className="bg-white w-full sm:w-[80%] rounded-md overflow-auto scrollbar-hide   sm:mb-0">
            <h2 className="text-2xl bg-white p-2 sticky top-0 font-bold tracking-tighter sm:text-3xl break-words ">
              Önceden Konuştuğunuz Kişiler
            </h2>
            <div className="flex flex-col px-2 gap-8 w-full h-full">
              {participants.length > 0 ? (
                participants.map((item, index) => {
                  return (
                    <a
                      key={item.id}
                      className=" text-center bg-gray-300 px-[5svw] w-full border rounded-md hover:bg-opacity-30 p-2 "
                      href={`/dashboard/messages?id=${item.id}`}
                    >
                      {
                        item.participants.filter(
                          (user) => user.id != currentUser?.id
                        )[0].name
                      }
                    </a>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </aside>
          {id ? (
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Mesajlarınız
              </h2>
              <MessagesShower currentuser={currentUser?.id!} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
    </main>
  );
};

export default MessagesPage;
