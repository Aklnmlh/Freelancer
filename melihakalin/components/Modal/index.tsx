import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-transparent sm:left-1/3 h-full border-none">
        <div className="sm:w-[60svw] h-full">{children}</div>
        <AlertDialogCancel>Kapat</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
