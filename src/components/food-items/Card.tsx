"use client";
import React, { JSX, useState } from 'react';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/cart-store';

interface CardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  type?: "veg" | "non-veg";
  rating?: number;
}

export default function Card({ id, name, price, image, description = "", type = "veg", rating = 4.5 }: CardProps) {
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
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image}
          alt={name}
          className="object-cover transform transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
            type === 'non-veg' 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {type === 'non-veg' ? 'Non-Veg' : 'Veg'}
          </span>
        </div>
        {/* Quick Add Button */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            onClick={handleAddToCart}
            className="w-full bg-white text-orange-500 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors"
          >
            <ShoppingCart size={18} />
            {isInCart ? 'Add More' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight flex-1">
            {name}
          </h3>
          <div className="text-xl font-bold text-green-600 whitespace-nowrap">
            ₹{price}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {rating}
            </span>
          </div>
          {isInCart && (
            <span className="text-sm text-orange-500 font-medium">
              {cartItem.quantity} in cart
            </span>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="p-1 rounded-full hover:bg-gray-100 text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={quantity <= 1}
            >
              <Minus size={16} className="text-gray-600" />
            </button>
            <span className="w-8 text-center text-gray-700 font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Plus size={16} className="text-gray-600" />
            </button>
          </div>
          <button 
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 active:transform active:scale-95 flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
