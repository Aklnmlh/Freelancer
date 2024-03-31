'use client';
import { Button } from '@/components/ui/button';
import { fetcher } from '@/hooks/fetcher';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

const JobApproveButton = ({ id }: { id: string }) => {
  const { mutate } = useMutation({
    mutationKey: ['JobApprove'],
    mutationFn: async (id: string) => {
      const parsed = await fetcher('/api/update/jobcompletion', 'POST', {
        id,
      });
      return parsed;
    },
    onSuccess: () => {
      toast('İş Durumu Güncellendi');
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 2000);
    },
  });
  return <Button onClick={() => mutate(id)}>İşi Onayla</Button>;
};

export default JobApproveButton;
