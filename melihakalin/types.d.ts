import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { Server as NetServer, Socket } from 'net';
interface IFeaturedService {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  description: string;
}
interface ITestimonails {
  id?: string;
  name: string;
  description: string;
  img: string;
}

interface JobType {
  id: number;
  title: string;
}

export interface IJobWithMission {
  id: string;
  user: { id: string; name: string | null; email: string | null };
  description: string | null;
  title: string | null;
  price: number | null;
  category: string | null;
  isTaken: boolean;
  completed: boolean;
  takenById: string | null;
  missons: {
    id: string;
    name: string;
    price: number;
    completed: boolean;
    proof: string | null;
    jobsId: string;
  }[];
}

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
