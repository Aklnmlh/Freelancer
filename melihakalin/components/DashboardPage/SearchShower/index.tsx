'use client';
import ProfileLoading from '@/app/dashboard/profile/loading';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SearchCard from '../SearchCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export interface IJobs {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  completed: boolean;
  userId: string;
}

const fetchData = async (query: string, category: string, page: number) => {
  const data = await fetch(
    `/api/search?query=${query}&category=${category}&page=${page}`
  );
  return await data.json();
};

const SearchShower = ({
  query,
  category,
  page,
  currentPage,
}: {
  query: string;
  category: string;
  page: number;
  currentPage: number;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [query, category, page],
    queryFn: () => fetchData(query, category, page),
  });
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div
        className={`grid grid-cols-1 w-[50svw] ${
          !isLoading && data.data && data.data.length >= 3
            ? 'sm:grid-cols-3'
            : 'sm:grid-cols-1'
        } gap-4`}
      >
        {!isLoading ? (
          data.data && data.data.length > 0 ? (
            data.data?.map((item: IJobs, index: number) => {
              return <SearchCard key={index * 4} {...item} />;
            })
          ) : (
            <div className="flex w-full items-center justify-center text-center font-bold text-lg">
              <p className="text-center w-full">İş Bulunamadı</p>
            </div>
          )
        ) : (
          <ProfileLoading />
        )}
      </div>
      {!isLoading
        ? data.data &&
          data.data.length > 0 && (
            <div className="mt-8 flex flex-row items-center justify-center">
              {currentPage > 1 && (
                <Link
                  className="text-black rounded-md border bg-gray-300 transition-all duration-200 hover:opacity-70 p-2"
                  href={{
                    pathname: '/dashboard/search',
                    query: {
                      page: currentPage - 1,
                      query: query || undefined,
                      category: category || undefined,
                    },
                  }}
                >
                  Önceki
                </Link>
              )}
              <Button
                className="mx-2 disabled:opacity-100"
                variant="default"
                disabled
              >
                {currentPage}
              </Button>
              {!isLoading ? (
                data.data &&
                data.data.length > 0 && (
                  <Link
                    className="text-black rounded-md border bg-gray-300 transition-all duration-200 hover:opacity-70 p-2"
                    href={{
                      pathname: '/dashboard/search',
                      query: {
                        page: currentPage + 1,
                        query: query || undefined,
                        category: category || undefined,
                      },
                    }}
                  >
                    Sonraki
                  </Link>
                )
              ) : (
                <></>
              )}
            </div>
          )
        : null}
    </div>
  );
};

export default SearchShower;
