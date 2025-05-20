"use client";
import React from "react";
import Carousel from "@/components/common/Carousel";
import Navbar from "@/components/common/Navbar";
import CategoriesList from "@/components/food-items/Category";
import FeaturedItems from "@/components/food-items/FeaturedItems";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br pb-10 from-orange-50 via-white to-orange-100">
      <Navbar />
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center pt-6 pb-10 px-2 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto pb-4 rounded-2xl overflow-hidden shadow-lg mb-10">
          <Carousel />
        </div>
        <div className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur rounded-xl shadow-lg px-2 py-4 sm:px-8 sm:py-6 flex flex-col gap-4 md:flex-row md:gap-8 md:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-500 text-xl font-bold">⏱️</span>
            <div>
              <div className="font-semibold text-gray-900">Fast Delivery</div>
              <div className="text-gray-500 text-sm">30-45 min delivery</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-500 text-xl font-bold">⭐</span>
            <div>
              <div className="font-semibold text-gray-900">Best Quality</div>
              <div className="text-gray-500 text-sm">4.8/5 rating</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-500 text-xl font-bold">🚚</span>
            <div>
              <div className="font-semibold text-gray-900">Free Delivery</div>
              <div className="text-gray-500 text-sm">On orders above ₹299</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
        </div>
        <CategoriesList />
        <div className="flex justify-center mt-6">
          <Link href="/menu" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition">
            View More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Items</h2>
        </div>
        <FeaturedItems />
        <div className="flex justify-center mt-6">
          <Link href="/menu" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition">
            View More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-14 flex flex-col items-center text-center bg-gradient-to-r from-orange-100 via-white to-orange-50 rounded-2xl shadow-lg mt-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Order Now &amp; Enjoy Delicious Food!</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Browse our menu, add your favorites to the cart, and get them delivered hot and fresh to your doorstep. Fast, easy, and always tasty!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/menu" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow transition">View Menu</a>
          <a href="/cart" className="inline-block bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold px-8 py-3 rounded-lg shadow transition">Go to Cart</a>
        </div>
      </section>
    </main>
  );
}
