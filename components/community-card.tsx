"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReloadIcon } from "@radix-ui/react-icons";

type Community = {
  id: string;
  imgUrl: string;
  name: string;
  group: string;
  averagePrice?: number;
};

type GroupColors = {
  [key: string]: string;
};

type CommunityCardProps = {
    communities: Community[];
    loading: boolean; 
};

const groupColors: GroupColors = {
  "North West": "bg-orange-100 text-orange-500",
  "North East": "bg-green-100 text-green-500",
  "South West": "bg-cyan-100 text-cyan-500",
  "South East": "bg-yellow-100 text-yellow-500",
};


const CommunityCard: React.FC<CommunityCardProps> = ({ communities, loading }) => {
    const getBadgeClasses = (group: string) =>
      groupColors[group] || "bg-gray-200 text-gray-500";
  
      const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US').format(num);
      };

    if (loading) {
      return (
        <div className="flex justify-center items-center h-56">
          <ReloadIcon className="animate-spin text-4xl text-primary" />
        </div>
      );
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-auto">
      {communities.map((community) => (
        <Card key={community.id} className="col-span-1 overflow-hidden bg-secondary">
          <CardHeader className="w-full h-56 overflow-hidden">
            <img
              className="w-full h-56 object-cover border-b"
              src={community.imgUrl || "/placeholder.png"}
              alt={community.name}
              onError={(e) => {
                e.currentTarget.src = "/placeholder.png";
              }}
            />
          </CardHeader>
          <CardContent className="p-2">
            <div className='flex flex-row justify-between items-center'>
            <h1 className="font-bold text-xl">{community.name}</h1>
            <Badge
              variant="outline"
              className={getBadgeClasses(community.group)}
            >
              {community.group}
            </Badge>
            </div>
            <p className='text-muted-foreground'>Average Price: ${community.averagePrice ? formatNumber(community.averagePrice) : 'N/A'}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommunityCard;
