'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import PaymentForm from '@/components/DashboardPage/PaymentForm';
const StripeProvider = ({ options }: { options: any }) => {
  const [promise, setPromise] = useState(null);
  useEffect(() => {
    fetch('/api/create-payment-intent/config').then(async (res) => {
      const { publishable_key } = await res.json();
      setPromise(loadStripe(publishable_key) as any);
    });
  }, []);
  const { data, isPending, mutate } = useMutation({
    mutationKey: ['payment-intent'],
    mutationFn: async () => {
      const fetchedData = await fetch('/api/create-payment-intent/config');
      const parsed = await fetchedData.json();
      return parsed;
    },
    onSuccess: (val) => {
      setPromise(loadStripe(val.publishable_key) as any);
    },
  });
  useEffect(() => {
    mutate();
  }, [mutate]);
  return (
    <>
      {!isPending && (
        <Elements
          stripe={promise}
          options={{
            clientSecret: options,
          }}
        >
          <PaymentForm />
        </Elements>
      )}
    </>
  );
};

export default StripeProvider;
