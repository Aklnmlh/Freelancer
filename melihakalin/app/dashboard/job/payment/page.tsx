import React from 'react';
import prisma from '@/db';
import StripeProvider from '@/Providers/StripeProvider';
import { headers } from 'next/headers';
export const revalidate = 0;
export const dynamic = 'force-dynamic';
const JobPayment = async ({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) => {
  const data = await prisma.jobs.findFirst({
    where: { id },
  });
  const clientSecret = await fetch(
    process.env.NEXT_PUBLIC_SITE_URL + '/api/create-payment-intent',
    {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        price: data?.price,
      }),
    }
  );
  const parsed = await clientSecret.json();
  return (
    <div>
      <StripeProvider options={parsed.key} />
    </div>
  );
};

export default JobPayment;
