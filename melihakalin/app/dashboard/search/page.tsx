import SearchShower from '@/components/DashboardPage/SearchShower';
import { categoriesList } from '@/data/constants';
import Link from 'next/link';
import React from 'react';
export const revalidate = 5;
export const dynamic = 'force-dynamic';
const SearchPage = async (props: any) => {
  const { page, query, category } = props.searchParams as {
    page: string;
    query: string;
    category: string;
  };

  const currentPage = page ? Number(page) : 1;
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container w-full px-4 md:px-6">
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-4 items-start py-2">
            <h3 className="text-xl font-bold">Kategoriler</h3>
            <div className="grid gap-1">
              {categoriesList.map((item) => (
                <Link
                  key={item.name}
                  className="font-semibold"
                  href={`/dashboard/search?category=${item.name}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <SearchShower
          currentPage={currentPage}
          category={category || ''}
          page={currentPage}
          query={query || ''}
        />
      </div>
    </section>
  );
};

export default SearchPage;
