'use client';
import { PlaneIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import ProfileMenu from './ProfileMenu';

const Header = () => {
  const session = useSession();
  React.useEffect(() => {
    const targetElement = document.getElementById(
      window.location.hash.substring(1)
    );
    if (targetElement) {
      window.scrollTo({
        behavior: 'smooth',
        top: targetElement.offsetTop,
      });
    }
  }, []);
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <PlaneIcon className="w-6 h-6" />
        <span className="sr-only">Freelance Platform</span>
      </Link>
      <nav className="ml-auto flex gap-2 sm:gap-4 md:gap-6">
        {session.status === 'authenticated' && (
          <Link
            className="text-xs sm:text-sm font-medium hover:underline underline-offset-4"
            href="/dashboard"
          >
            Hesabım
          </Link>
        )}

        <Link
          className="text-xs sm:text-sm font-medium hover:underline underline-offset-4"
          href="/#testimonial"
        >
          Referanslar
        </Link>
        {session.status === 'authenticated' ? (
          <ProfileMenu session={session.data} />
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
