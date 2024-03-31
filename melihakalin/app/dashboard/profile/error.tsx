'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h2>Bilgileri Alırken Bir Hata meydana geldi!</h2>
      <Button
        onClick={() => {
          window.location.href = window.location.href;
        }}
      >
        Tekrar Dene
      </Button>
    </div>
  );
}
