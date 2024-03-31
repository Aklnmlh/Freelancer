'use client';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
interface IJobDetail {
  id: string;
  title: string | null;
  isTaken: boolean;
  takenById: string | null;
  user: {
    name: string | null;
    id: string;
    email: string | null;
  };
  description: string | null;
  category: string | null;
  price: number | null;
  completed: boolean;
}
const DetailJobButton = (props: IJobDetail) => {
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationKey: ['jobtake'],
    mutationFn: async () => {
      try {
        const postData = await fetch('/api/update/jobstate', {
          method: 'PUT',
          body: JSON.stringify({
            id: props.id,
          }),
        });
        const parsed = await postData.json();
        return parsed;
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
    onSuccess: () => {
      toast('İş Başarıyla Alındı');
      router.push('/dashboard/messages');
    },
    onError: (err) => {
      toast('İşi alırken bir hata oluştu. İş alınmış olabilir.');
    },
  });
  const session = useSession();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>İşi Al</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="overflow-y-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            İş Yapma Anlaşması
          </AlertDialogTitle>
          {session.status === 'authenticated' ? (
            <AlertDialogDescription className="text-left gap-1 grid grid-cols-1">
              <strong className="text-lg text-black text-left">
                Taraflar:
              </strong>
              <strong className="text-lg text-black text-left">
                1. İşveren:
              </strong>
              <p>Adı Soyadı: {props.user.name}</p>
              <p>E-Posta Adresi: {props.user.email}</p>
              <strong className="text-lg text-black text-left">
                2. İş Yapan:
              </strong>
              <p>Adı Soyadı:{session.data?.user?.name}</p>
              <p>E-Posta Adresi: {session.data?.user?.email}</p>
              <strong className="text-lg text-black text-left">
                İş Bilgileri:
              </strong>
              <p>İş Başlığı:{props.title}</p>
              <p>İş Açıklaması:{props.description}</p>
              <strong className="text-lg text-black text-left">Ücret:</strong>
              <p>Ücret:₺{props.price}</p>
              <strong className="text-lg text-black text-left">
                İşin Kabul Edilmesi:
              </strong>
              <p>
                İş Yapan, işi belirlenen tarihlerde ve standartlara uygun bir
                şekilde tamamlayacağını taahhüt eder.
              </p>
              <strong className="text-lg text-black text-left">
                Gizlilik Taahhüdü:
              </strong>
              <p>
                İş Yapan, işle ilgili bilgileri gizli tutmayı kabul eder. Bu
                sözleşme, taraflar arasında dürüst bir işbirliği sağlamayı
                amaçlar.
              </p>
            </AlertDialogDescription>
          ) : (
            <Loader2 className="animate-spin" size={32} />
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <Button disabled={isPending} onClick={() => mutate()}>
            Onayla
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DetailJobButton;
