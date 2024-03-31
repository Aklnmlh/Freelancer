import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface HomeContainerProps extends HTMLAttributes<HTMLElement> {
  title: string;
  children: React.ReactNode;
}
const HomeContainer = (props: HomeContainerProps) => {
  return (
    <section
      {...props}
      className={twMerge(
        'w-full py-6 sm:py-12 md:py-24 lg:py-32',
        props.className
      )}
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
          {props.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 sm:mt-8">
          {props.children}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
