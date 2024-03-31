import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});
export const POST = async (req: Request) => {
  const { price } = await req.json();
  console.log(price);
  const stringified = price.toString() + '00';
  const user = await getServerSession(authOptions);
  if (user) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: 'TRY',
        amount: Number(stringified),
      });
      console.log(paymentIntent);
      return NextResponse.json({ key: paymentIntent.client_secret });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error });
    }
  } else {
    return NextResponse.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    );
  }
};
