'use client';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '@/hooks/fetcher';
import { useRouter, useSearchParams } from 'next/navigation';
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();
  const id = searchParams?.get('id');
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationKey: ['paymentstate'],
    mutationFn: async () => {
      const data = await fetcher('/api/update/paymentstate', 'PUT', {
        id,
      });
      return data;
    },
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}`,
      },
      redirect: 'if_required',
    });

    if (error) {
      toast(error.message as string);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      await mutateAsync();
      toast('Ödeme Başarılı Kontrol Paneline Yönlendiriliyorsunuz.');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" className="p-4" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button
        className="w-full mt-2 bg-green-500 hover:bg-green-400"
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        {isProcessing ? 'İşleniyor... ' : 'Şimdi Öde'}
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default PaymentForm;
