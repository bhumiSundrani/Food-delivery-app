"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const categories = [
  {
    id: 1,
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800',
    count: 12
  },
  {
    id: 2,
    name: 'Pizza',
    image: 'https://cdn.britannica.com/08/177308-050-94D9D6BE/Food-Pizza-Basil-Tomato.jpg',
    count: 8
  },
  {
    id: 3,
    name: 'Pasta',
    image: 'https://es.cravingsjournal.com/wp-content/uploads/2023/05/pasta-con-salsa-cremosa-de-tomate-1.jpg',
    count: 6
  },
  {
    id: 4,
    name: 'Fries',
    image: 'https://th.bing.com/th/id/OIP.YMcBCV0YsoYknxQqGhOnDAHaE7?rs=1&pid=ImgDetMain',
    count: 4
  },
  {
    id: 5,
    name: 'Drinks',
    image: 'https://clickhowto.com/wp-content/uploads/2018/01/cocktails.jpg',
    count: 10
  },
  {
    id: 6,
    name: 'Desserts',
    image: 'http://4.bp.blogspot.com/_Pe9obweD_W8/TH5lSLYTgPI/AAAAAAAAABU/jWp0YWwlP8A/s1600/white-chocolate-parfait-flambeed-cherries200711131[1].jpg',
    count: 7
  },
  {
    id: 7,
    name: 'Sandwiches',
    image: 'https://www.rd.com/wp-content/uploads/2016/03/aol-food-perfect-sandwich-ft.jpg',
    count: 5
  },
  {
    id: 8,
    name: 'Wraps',
    image: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Cranberry-Turkey-Wraps_EXPS_HCA18_27665_D02_22_11b-1.jpg',
    count: 4
  },
  {
    id: 9,
    name: 'Sides',
    image: 'https://www.sickchirpse.com/wp-content/uploads/2016/04/McDonalds-Nuggets-1.jpg',
    count: 6
  }
];

const CategoriesList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/menu?category=${category.name.toLowerCase()}`}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-32 rounded-xl overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} items</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesList;
