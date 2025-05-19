"use client"
import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, MapPin, Search } from 'lucide-react';
import { Button } from "@/components/common/Button";
import Link from 'next/link';
import { useCart } from '@/store/cart-store';

// Navigation bar component for food delivery app
export default function Navbar() {
  // State to control mobile menu open/close
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get cart items from the store
  const { items } = useCart();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg relative">
      {/* Main navbar container */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left side - Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-orange-500">
                  🍔 FoodieGo
                </h1>
              </Link>
            </div>
          </div>

          {/* Center - (removed location & search) */}
          <div className="flex-1" />

          {/* Right side - Navigation items (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            {/* Cart icon with count */}
            <Link href="/cart" className="relative cursor-pointer">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-500" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* User profile */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <User className="w-6 h-6 text-gray-700 hover:text-orange-500" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-orange-500 focus:outline-none focus:text-orange-500 transition-all duration-300"
            >
            <span className="relative block h-6 w-6">
                <Menu
                className={`absolute top-0 left-0 text-white h-6 w-6 transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                }`}
                />
                <X
                className={`absolute top-0 left-0 h-6 w-6 text-white transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                />
            </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu (shows when hamburger is clicked) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t transition-all duration-300 border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile navigation links */}
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md">
              Home
            </Link>
            {/* Mobile cart */}
            <Link href="/cart" className="flex items-center justify-between px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md cursor-pointer">
              <span>Cart</span>
              <div className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-1" />
                {cartCount > 0 && (
                  <span className="relative -top-2 right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
            {/* Mobile sign in */}
            <div className="flex items-center px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md cursor-pointer">
              <User className="w-5 h-5 mr-2" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}