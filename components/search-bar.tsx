"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import CommunityCard from '@/components/community-card';

interface Community {
  id: number;
  name: string;
  imgUrl: string;
  group: string;
}


const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Added isLoading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const communitiesResponse = await fetch("/api/communities");
        const homesResponse = await fetch("/api/homes");
  
        if (!communitiesResponse.ok || !homesResponse.ok) {
          throw new Error(`HTTP error!`);
        }
  
        const communitiesData: Community[] = await communitiesResponse.json();
        const homesData = await homesResponse.json();
  
        
        const priceTotals: Record<string, number> = {};
        const homeCounts: Record<string, number> = {};
  
        homesData.forEach(home => {
          if (!priceTotals[home.communityId]) {
            priceTotals[home.communityId] = 0;
            homeCounts[home.communityId] = 0;
          }
          priceTotals[home.communityId] += home.price;
          homeCounts[home.communityId]++;
        });
  
        
        const averagePrices: Record<string, number> = {};
        for (const id in priceTotals) {
          averagePrices[id] = priceTotals[id] / homeCounts[id];
        }
  
        
        const updatedCommunities = communitiesData
        .map(community => ({
          ...community,
          averagePrice: averagePrices[community.id]
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setCommunities(updatedCommunities);
    } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const filteredCommunities = searchQuery
    ? communities
        .filter(community =>
          community.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name))
    : communities;

  return (
    <div>
      <div className="relative max-w-[400px] my-5 m-auto">
        <Input 
          placeholder='Search Communities' 
          className='bg-secondary focus:border-muted-foreground'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <MagnifyingGlassIcon />
        </div>
      </div>
      <CommunityCard communities={filteredCommunities} loading={isLoading} />
    </div>
  );
};

export default SearchBar;
