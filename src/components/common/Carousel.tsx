"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Sample data for the carousel (you can replace with your own data)
const carouselData = [
  {
    id: 1,
    title: "Weekend Special",
    subtitle: "Get 30% off on all pizzas + Free Delivery",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&q=80",
    backgroundColor: "bg-red-500"
  },
  {
    id: 2,
    title: "Burger Bonanza",
    subtitle: "Buy 2 Get 1 Free on all burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80",
    backgroundColor: "bg-yellow-500"
  },
  {
    id: 3,
    title: "Pasta Paradise",
    subtitle: "20% off on all pasta dishes",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=1600&q=80",
    backgroundColor: "bg-orange-500"
  }
];

// Carousel component props
interface CarouselProps {
  // How long each slide stays (in seconds)
  autoPlayTime?: number;
  // Should the carousel loop infinitely?
  infinite?: boolean;
  // Show navigation dots?
  showDots?: boolean;
  // Show arrow buttons?
  showArrows?: boolean;
}

export default function Carousel({
  autoPlayTime = 4,
  infinite = true,
  showDots = true,
  showArrows = true
}: CarouselProps) {
  // Current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  // Control auto-play
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    if (infinite) {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    } else {
      setCurrentSlide((prev) => 
        prev === carouselData.length - 1 ? prev : prev + 1
      );
    }
  }, [infinite]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayTime * 1000);
    return () => clearInterval(interval);
  }, [currentSlide, isPlaying, autoPlayTime, nextSlide]);

  // Go to previous slide
  const prevSlide = () => {
    if (infinite) {
      setCurrentSlide((prev) => 
        prev === 0 ? carouselData.length - 1 : prev - 1
      );
    } else {
      setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
    }
  };

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsPlaying(false);
  };

  // Resume auto-play when mouse leaves
  const handleMouseLeave = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full mx-auto">
      {/* Main carousel container */}
      <div
        className="relative h-64 md:h-80 lg:h-96 overflow-hidden shadow-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Carousel slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselData.map((slide, index) => (
            <div
              key={slide.id}
              className={`w-full flex-shrink-0 relative ${slide.backgroundColor}`}
            >
              {/* Background image */}
              <div className="relative w-full h-[400px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              
              {/* Content overlay */}
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl">
                    {slide.subtitle}
                  </p>
                  <Link href="/menu">
                    <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Order Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {showArrows && (
          <>
            {/* Previous button */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            {/* Next button */}
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}
      </div>

      {/* Navigation dots */}
      {showDots && (
        <div className="flex justify-center mt-4 space-x-2">
          {carouselData.map((slide) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(carouselData.indexOf(slide))}
              className={`w-3 h-3 rounded-full transition-all ${
                carouselData.indexOf(slide) === currentSlide
                  ? 'bg-orange-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}