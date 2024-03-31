'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
const ProfileMenu = ({ session }: { session: Session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-xs sm:text-sm font-medium  outline-none">
        Profil
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
        <Link href={'/dashboard/profile'}>
          <DropdownMenuItem className="cursor-pointer">Profil</DropdownMenuItem>
        </Link>
        <Link href={'/dashboard/messages'}>
          <DropdownMenuItem className="cursor-pointer">
            Mesajlar
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={async () => {
            await signOut({
              callbackUrl: '/',
              redirect: true,
            });
          }}
          className="cursor-pointer"
        >
          Çıkış Yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
