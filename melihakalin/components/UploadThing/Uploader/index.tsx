'use client';

import { UploadButton } from '@/lib/uploadthingutil';
import { UploadCloud } from 'lucide-react';
import { SetStateAction } from 'react';
import { toast } from 'sonner';

export default function UploaderButton({
  setUrl,
  setIsImgLoading,
}: {
  setUrl: React.Dispatch<SetStateAction<string>>;
  setIsImgLoading: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <UploadButton
      endpoint="imageUploader"
      content={{
        button: (
          <div className="flex flex-row ">
            <UploadCloud />
          </div>
        ),
      }}
      appearance={{
        container: {
          height: '8svh',
          margin: 0,
          padding: 0,
          outline: 'none',
        },
        button: {
          backgroundColor: 'green',
          outline: 'none',
        },
        allowedContent: {
          zIndex: -80,
          visibility: 'hidden',
          height: 0,
          padding: 0,
          margin: 0,
          width: 0,
          outline: 'none',
        },
      }}
      onUploadBegin={() => {
        setIsImgLoading(true);
      }}
      onClientUploadComplete={(res) => {
        setUrl(res[0].url);
        setIsImgLoading(false);

        toast('Dosya Yüklendi');
      }}
      onUploadError={(error: Error) => {
        toast(
          `Yükleme Sırasında bir hata oluştu lütfen daha sonra tekrar deneyin.`
        );
        setIsImgLoading(false);
      }}
    />
  );
}
