"use client";
import React from 'react';
import Card from './Card';
import mockData from "@/mock-data/food-items.json";

export default function FeaturedItems() {
  // Get only the first 5 items for featured section
  const featuredItems = mockData.items.slice(0, 4);

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {featuredItems.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            type={item.type as 'veg' | 'non-veg'}
            rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
} 