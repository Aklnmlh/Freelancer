import { SocketProvider } from '@/Providers/SocketProvider';
import React from 'react';

const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  return <SocketProvider>{children}</SocketProvider>;
};

export default DashboardTemplate;
