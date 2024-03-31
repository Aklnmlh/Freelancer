import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ITestimonails } from '@/types';
import React from 'react';

const TestimonialCard = (props: ITestimonails) => {
  const fallback = props.name.split(' ');
  return (
    <Card>
      <CardHeader>
        <Avatar>
          <AvatarImage className="w-8 sm:w-10 h-8 sm:h-10" src={props.img} />
          <AvatarFallback>
            {fallback[0].split('')[0]}
            {fallback[1].split('')[0]}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-lg sm:text-xl font-bold mt-2">{props.name}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">{props.description}</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
