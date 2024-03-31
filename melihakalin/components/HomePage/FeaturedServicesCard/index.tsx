import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

interface FeaturedServicesCard
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  subtitle: string;
  href: string;
  description: string;
}

const FeaturedServicesCard = (props: FeaturedServicesCard) => {
  return (
    <Link {...props} href={props.href}>
      <Card>
        <CardHeader>
          <h3 className="text-lg sm:text-xl font-bold">{props.title}</h3>
          <Badge className="mt-2">{props.subtitle}</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{props.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FeaturedServicesCard;
