import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

interface CardContent extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  price: number;
  id: string;
}

const SearchCard = (props: CardContent) => {
  return (
    <Link className="w-full" href={`/dashboard/search/detail?id=${props.id}`}>
      <Card {...props}>
        <CardHeader>
          <h3 className="text-xl font-bold">{props.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{props.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SearchCard;
