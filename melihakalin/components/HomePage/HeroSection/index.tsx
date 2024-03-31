import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <Image
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-contain sm:w-full lg:order-last lg:aspect-square"
            height="550"
            priority
            src="/home.jpg"
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter">
                İşin için en uygun serbest çalışanı bul, işe al!
              </h1>
              <p className="max-w-[600px] text-gray-500 sm:text-lg md:text-xl">
                Milyonlarca insan, Freelance Platform ile fikirlerini gerçeğe
                dönüştürüyor.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 min-[400px]:flex-row">
                <Link
                  href={'/dashboard'}
                  className="inline-flex h-8 sm:h-10 bg-primary text-white hover:opacity-30 transition-all duration-200 items-center justify-center rounded-md px-6 sm:px-8 text-xs sm:text-sm font-medium"
                >
                  İş ilanı ver
                </Link>
                <Link
                  data-testid="learnmore"
                  className="inline-flex h-8 sm:h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 sm:px-8 text-xs sm:text-sm font-medium"
                  href="/faq"
                >
                  Daha fazla bilgi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
