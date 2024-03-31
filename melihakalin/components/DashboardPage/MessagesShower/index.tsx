'use client';
import { useSocket } from '@/Providers/SocketProvider';
import { Input } from '@/components/ui/input';
import React, { useEffect, useRef, useState } from 'react';
import type { Socket } from 'socket.io';
import { Button } from '@/components/ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import UploaderButton from '@/components/UploadThing/Uploader';
import { useSearchParams } from 'next/navigation';
import { Loader2, SendHorizontalIcon } from 'lucide-react';
import Image from 'next/image';
import Modal from '@/components/Modal';
export interface IMessage {
  id: string;
  messages: {
    id: string;
    createdAt: Date;
    conversationId: string;
    fileUrl: string | null;
    body: string;
    sender: {
      id: string;
      name: string | null;
      email: string | null;
    };
  }[];
}
interface IData {
  body: string;
  fileUrl: string;
  conversationId: string;
  id: string;
  createdAt: Date;
  sender: { name: string; id: string };
}

const MessagesShower = ({ currentuser }: { currentuser: string }) => {
  const { socket, isConnected } = useSocket() as {
    isConnected: boolean;
    socket: Socket;
  };

  const [url, setUrl] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const queryClient = useQueryClient();
  const searchparams = useSearchParams();
  const conversationId = searchparams?.get('id') as string;
  const [isImgLoading, setIsImgLoading] = useState<boolean>(false);
  const { data, isLoading } = useQuery({
    queryKey: ['messages', conversationId], // Include conversationId in the queryKey
    queryFn: async () => {
      const fetched = await fetch(
        `/api/message?conversationID=${conversationId}`
      );
      return await fetched.json();
    },
  });

  useEffect(() => {
    if (isConnected) {
      // Join the room when the component mounts
      socket.emit('joinRoom', conversationId);

      socket.on('message', (res: IData) => {
        const currentData: { messages: IData[] } = queryClient.getQueryData([
          'messages',
          conversationId, // Include conversationId in the queryKey
        ]) as { messages: IData[] };

        const updatedMessages = {
          messages: [...currentData.messages, res],
        };

        queryClient.setQueryData(['messages', conversationId], updatedMessages);
      });
    }
  }, [isConnected, socket, conversationId, queryClient]);
  useEffect(() => {
    if (ref.current) {
      //@ts-ignore
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [data]);

  const handleSend = () => {
    setMessage('');
    try {
      socket.emit(
        'message',
        JSON.stringify({
          user: currentuser,
          message: message,
          url: url ?? '',
          conversationId,
        })
      );
    } catch (error) {
      console.error('Error emitting message:', error);
    }
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const ref = useRef(null);
  return (
    <div className="mt-8">
      <div className="flex flex-col space-y-4 max-h-[58svh] overflow-x-scroll hide-scrollbar max-w-[100svw]">
        {!isLoading && data != undefined ? (
          data?.messages.map((item: IData, index: any) => {
            return (
              <div
                ref={ref}
                key={index * 45}
                className={`${
                  item.sender.id == currentuser
                    ? 'bg-green-200 ml-auto'
                    : 'bg-gray-200'
                } w-1/2 p-4 rounded-md`}
              >
                <h3 className="text-xl text-gray-500">{item.sender.name}</h3>
                {item.fileUrl ? (
                  <button onClick={openModal}>
                    <Modal>
                      <Image
                        className="w-full h-full "
                        src={item.fileUrl}
                        width={1000}
                        height={1000}
                        alt="message"
                      />
                    </Modal>
                  </button>
                ) : (
                  ''
                )}
                <p className=" font-bold break-words">{item.body}</p>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center w-full">
            <Loader2 className="animate-spin" />
          </div>
        )}
      </div>

      <div className="mt-8 sticky bg-white bottom-0 h-[10svh] flex flex-col sm:flex-row items-center justify-center">
        <Input
          value={message}
          onChange={(e) => {
            setMessage(e.currentTarget.value);
          }}
          className="w-full mx-2 border rounded-md"
          id="message"
          placeholder="Mesajınızı Girin..."
        />
        <div className="flex  gap-0 flex-row items-center w-full sm:w-fit justify-between sm:justify-center">
          <UploaderButton setUrl={setUrl} setIsImgLoading={setIsImgLoading} />
          <Button
            disabled={!message || isImgLoading}
            onClick={() => {
              handleSend();
              if (ref.current) {
                //@ts-ignore
                ref.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'end',
                });
              }
            }}
            className="mx-2"
          >
            <SendHorizontalIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessagesShower;
