import { Server } from 'socket.io';
import cors from 'cors';
import prisma from '@/db';

const corsMiddleware = cors({ origin: '*' });

export default function SocketHandler(req: any, res: any) {
  if (res.socket.server.io) {
    console.log('Already set up');
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: '/api/socket/io',
    addTrailingSlash: false,
    connectionStateRecovery: {},
  });

  io.on('connection', (socket) => {
    const clientId = socket.id;
    console.log(`A client connected. ID: ${clientId}`);

    socket.on('joinRoom', (room) => {
      // Join the room when requested
      socket.join(room);
      console.log(`Socket ${clientId} joined room ${room}`);
    });

    socket.on('message', async (data) => {
      const parsed = await JSON.parse(data);
      try {
        console.log(parsed);
        const createdValue = await prisma.message.create({
          data: {
            body: parsed.message,
            fileUrl: parsed.url,
            sender: {
              connect: {
                id: parsed.user,
              },
            },
            conversation: {
              connect: {
                id: parsed.conversationId,
              },
            },
          },
          select: {
            body: true,
            conversationId: true,
            fileUrl: true,
            createdAt: true,
            id: true,
            sender: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        });

        // Emit the message to all clients in the room
        io.to(parsed.conversationId).emit('message', createdValue);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected.');
    });
  });

  corsMiddleware(req, res, () => {
    res.socket.server.io = io;
    res.end();
  });
}
