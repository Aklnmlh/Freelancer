import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

interface CardContent extends HTMLAttributes<HTMLDivElement> {
  price: number;
  id: string;
  title: string;
  description: string;
}

const JobCard = (props: CardContent) => {
  return (
    <Link href={`/dashboard/job/detail?id=${props.id}`}>
      <Card {...props}>
        <CardHeader>
          <h3 className="text-xl font-bold break-words">{props.title}</h3>
          <p className="text-gray-500">{props.price}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 break-words">{props.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default JobCard;
