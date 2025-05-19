"use client";
import React, { JSX, useState } from 'react';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/cart-store';
import Link from 'next/link';

interface CardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  type?: "veg" | "non-veg";
  rating?: number;
}

const Card: React.FC<CardProps> = ({ id, name, price, image, description = "", type = "veg", rating = 4.5 }) => {
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const cartItem = items.find(item => item.id === id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    addToCart({ id, name, price, image, quantity });
    setQuantity(1);
  };

  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star size={16} className="text-gray-300" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <Link href={`/menu/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white rounded-full p-1">
            {type === 'veg' ? (
              <div className="w-4 h-4 bg-green-500 rounded-full" />
            ) : (
              <div className="w-4 h-4 bg-red-500 rounded-full" />
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
          <div className="flex justify-between items-center">
            <span className="text-orange-500 font-bold">₹{price}</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
