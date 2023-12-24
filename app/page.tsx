import React from 'react';
import SearchBar from '@/components/search-bar'; // Assuming SearchBar is in the components folder

export default function Home() {
  return (
    <main className="flex flex-col max-w-[1200px] p-4 m-auto gap-4">
      <SearchBar />
    </main>
  );
}
