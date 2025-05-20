"use client";
import React, { useState } from 'react';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/cart-store';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  type?: "veg" | "non-veg";
  rating?: number;
  initialQuantity?: number;
}

const Card = ({ id, name, price, image, type = "veg", rating = 4.5, initialQuantity = 1 }: CardProps) => {
  const { addToCart, updateQuantity, items } = useCart();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [showQuantity, setShowQuantity] = useState(false);
  const router = useRouter();

  const cartItem = items.find(item => item.id === id);
  const isInCart = !!cartItem;
  const itemCount = cartItem?.quantity || 0;

  const handleCartAction = () => {
    if (!isInCart) {
      addToCart({ id, name, price, image, quantity });
      setShowQuantity(true);
    } else {
      updateQuantity(id, quantity);
      router.push('/cart');
    }
  };

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (isInCart) {
      updateQuantity(id, newQuantity);
    }
  };

  const decrement = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    if (isInCart) {
      updateQuantity(id, newQuantity);
    }
  };

  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="fill-yellow-400 stroke-yellow-400 w-4 h-4" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="absolute stroke-yellow-400 w-4 h-4" />
            <div className="absolute overflow-hidden w-2 h-4">
              <Star className="fill-yellow-400 stroke-yellow-400 w-4 h-4" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="stroke-yellow-400 w-4 h-4" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/menu/${id}`}>
        <div className="relative h-48 w-full">
          <Image 
            src={image} 
            alt={name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium text-white bg-opacity-80 bg-gray-800">
            <span className={`inline-block w-3 h-3 rounded-full mr-1 ${type === 'veg' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {type === 'veg' ? 'Veg' : 'Non-Veg'}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-lg font-bold text-green-600">₹{price}</p>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {renderStars()}
          </div>
          <span className="text-sm text-gray-600">{rating}</span>
          {isInCart && (
            <span className="ml-auto text-sm text-orange-500">{itemCount} in cart</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          {(isInCart || showQuantity) && (
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                onClick={decrement}
                className="p-1 text-gray-500 hover:text-orange-500 focus:outline-none"
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-1 text-gray-700">{quantity}</span>
              <button 
                onClick={increment}
                className="p-1 text-gray-500 hover:text-orange-500 focus:outline-none"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
          
          <button
            onClick={handleCartAction}
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
          >
            <ShoppingCart size={16} className="mr-1" />
            {isInCart ? 'Update Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;