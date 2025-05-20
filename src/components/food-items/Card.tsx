"use client";
import React, { JSX, useState } from 'react';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/cart-store';
import Link from 'next/link';
import Image from 'next/image';

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
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/menu/${id}`} className="block">
        <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
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
      </Link>

      {/* Add to Cart Section */}
      <div className="px-4 pb-4">
        {isInCart ? (
          <div className="flex items-center justify-between bg-orange-50 rounded-lg p-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 rounded-full hover:bg-orange-100 text-orange-500 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-gray-900 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 rounded-full hover:bg-orange-100 text-orange-500 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Link
              href="/cart"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Update Cart
            </Link>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
