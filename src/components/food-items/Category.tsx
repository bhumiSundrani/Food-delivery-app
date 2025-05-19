"use client";
import React from 'react';
import categoriesData from '@/mock-data/food-categories.json';
import Image from 'next/image';

export default function CategoriesList() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categoriesData.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col items-center text-center group"
            >
              <div className="relative w-24 h-24 mb-3 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-50 shadow-sm group-hover:shadow-lg group-hover:ring-4 group-hover:ring-orange-200 transition-all duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                  sizes="96px"
                />
              </div>
              <span className="font-semibold text-gray-800 text-base group-hover:text-orange-500 transition-colors">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
