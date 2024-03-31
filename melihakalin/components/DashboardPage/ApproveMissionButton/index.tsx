'use client';
import { Button } from '@/components/ui/button';
import { fetcher } from '@/hooks/fetcher';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import UploaderButton from '@/components/UploadThing/Uploader';
const ApproveMissionButton = ({ id }: { id: string }) => {
  const { mutateAsync } = useMutation({
    mutationKey: ['approveMission'],
    mutationFn: async () => {
      try {
        const data = await fetcher('/api/update/missionstate', 'POST', {
          id,
          proof: url,
        });
      } catch (error) {
        console.log(error);
        throw new Error('Görev tamamlanırken hata oluştu');
      }
    },
    onSuccess: () => {
      toast('Görev Başarıyla tamamlandı');
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 1500);
    },
  });
  const [url, setUrl] = useState('');
  const [isImgLoading, setIsImgLoading] = useState(false);
  return (
    <div className="ml-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Görevi Bitir</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Lütfen Kanıt Sunun</AlertDialogTitle>
            <AlertDialogDescription>
              <UploaderButton
                setUrl={setUrl}
                setIsImgLoading={setIsImgLoading}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              disabled={!url}
              onClick={async () => {
                await mutateAsync();
              }}
            >
              Devam Et
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ApproveMissionButton;
