import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row gap-2 py-4 sm:py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500">
        © Freelance Platform. Tüm hakları saklıdır.
      </p>
      <nav className="sm:ml-auto flex gap-2 sm:gap-4 md:gap-6">
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/tos"
        >
          Kullanım Koşulları
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/privacy"
        >
          Gizlilik Sözleşmesi
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
