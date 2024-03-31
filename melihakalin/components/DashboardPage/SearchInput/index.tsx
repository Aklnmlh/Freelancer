'use client';
import { MicroscopeIcon, SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const SearchInput = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const handleSearch = () => {
    if (query.length > 2) {
      router.push(`/dashboard/search?query=${query}`);
    } else {
      toast('Lütfen en az 3 karakterli bir arama yazısı yazınız.');
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative mt-8 mb-4">
      <MicroscopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value);
        }}
        aria-label="Search jobs"
        className={
          'pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-indigo-500'
        }
        placeholder="İş ara..."
        onKeyDown={handleKeyPress} // Enter tuşu için olay dinleyici
      />
      <SearchIcon
        className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        onClick={handleSearch} // SearchIcon tıklandığında olay dinleyici
      />
    </div>
  );
};

export default SearchInput;
