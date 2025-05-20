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
  type?: "veg" | "non-veg";
  rating?: number;
}

const Card: React.FC<CardProps> = ({ id, name, price, image, type = "veg", rating = 4.5 }) => {
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);

  const cartItem = items.find(item => item.id === id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    addToCart({ id, name, price, image, quantity });
    setQuantity(1);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link href={`/menu/${id}`