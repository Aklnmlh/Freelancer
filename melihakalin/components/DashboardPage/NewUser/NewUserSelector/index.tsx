'use client';
import { Button } from '@/components/ui/button';
import { selectedList } from '@/data/constants';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const NewUserSelector = () => {
  const [selected, setSelected] = React.useState('FREELANCER');

  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationKey: ['updatetype'], // mutationKey'i burada belirtin
    mutationFn: async () => {
      const res = await fetch('/api/update/updatetype', {
        method: 'PUT',
        body: JSON.stringify({
          type: selected,
        }),
      });
      const json = await res.json();
      if (json.message == 'error') {
        throw new Error('api error');
      } else {
        return json;
      }
    },
    throwOnError: false,
    onSuccess: () => {
      window.location.href = '/dashboard';
    },
    onError: (error) => {
      toast('sistemsel hata oluştu lütfen daha sonra tekrar deneyin.');
    },
  });
  console.log(data, isPending, isSuccess);
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-row items-center justify-center my-4 sm:p-0 p-4 gap-6">
        {selectedList.map((item) => {
          return (
            <div
              key={item.value}
              onClick={() => {
                setSelected(item.value);
              }}
              className={`rounded-md duration-200 transition-all sm:h-[15svh] h-[30svh] p-2 sm:p-4 sm:w-[15svw] cursor-pointer border ${
                item.value === selected ? 'border-blue-500' : ''
              }`}
            >
              <h1
                className={`font-bold text-2xl mb-2 ${
                  item.value == selected ? '' : 'opacity-60'
                }`}
              >
                {item.name}
              </h1>
              <p className={`${item.value == selected ? '' : 'opacity-60'}`}>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
      <Button
        onClick={async () => {
          mutate();
        }}
      >
        Hadi Başlayalım
      </Button>
    </div>
  );
};

export default NewUserSelector;
