/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { Button } from "@/components/common/Button";
import Navbar from "@/components/common/Navbar";
import { useCart } from '@/store/cart-store';
import { Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();

  // Calculate totals
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 299 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/menu" 
            className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 py-4 border-b last:border-b-0">
                    {/* Item Image */}
                    <div className="relative w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                        <p className="text-gray-700 text-sm mb-2">₹{item.price}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-gray-900 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-lg">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                <div className="mt-6 pt-4 border-t">
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button variant="primary" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>

                {subtotal < 299 && (
                  <p className="text-sm text-orange-500 mt-2 text-center">
                    Add ₹{299 - subtotal} more for free delivery
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-700 mb-6">Add some delicious items to your cart</p>
            <Link href="/menu">
              <Button variant="primary">Browse Menu</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
} 