"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

const carouselImages: CarouselImage[] = [
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a2b36515-35bc-4491-8685-99d6e797cbcb/generated_images/professional-female-doctor-in-white-coat-48ba8898-20250902153515.jpg",
    alt: "Professional female doctor in white coat using tablet to access AI-powered medical records",
    caption: "AI-Enhanced Patient Care"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a2b36515-35bc-4491-8685-99d6e797cbcb/generated_images/diverse-medical-team-of-doctors-collabor-00220501-20250902153529.jpg", 
    alt: "Diverse medical team of doctors collaborating with digital health technology",
    caption: "Collaborative Healthcare Solutions"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a2b36515-35bc-4491-8685-99d6e797cbcb/generated_images/male-doctor-in-hospital-corridor-reviewi-e1ff720f-20250902153541.jpg",
    alt: "Male doctor in hospital corridor reviewing patient data on mobile device",
    caption: "Mobile Medical Intelligence"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a2b36515-35bc-4491-8685-99d6e797cbcb/generated_images/healthcare-specialist-using-advanced-dia-ec6c8adb-20250902153550.jpg",
    alt: "Healthcare specialist using advanced diagnostic tools with AI assistance",
    caption: "Precision Diagnostics"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a2b36515-35bc-4491-8685-99d6e797cbcb/generated_images/doctor-and-patient-consultation-with-dig-1e58bb53-20250902153601.jpg",
    alt: "Doctor and patient consultation with digital health interface",
    caption: "Patient-Centered Technology"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a2b36515-35bc-4491-8685-99d6e797cbcb/generated_images/medical-specialist-analyzing-complex-med-be83191c-20250902153613.jpg",
    alt: "Medical specialist analyzing complex medical data with AI assistance",
    caption: "Intelligent Medical Analysis"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a2b36515-35bc-4491-8685-99d6e797cbcb/generated_images/diverse-healthcare-team-using-integrated-ca4ca6b1-20250902153624.jpg",
    alt: "Diverse healthcare team using integrated digital platforms",
    caption: "Seamless Medical Workflows"
  }
];

export const DoctorCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trusted by Doctors
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Healthcare professionals worldwide use our AI RAG technology 
            to enhance patient care and clinical decision-making.
          </motion.p>
        </div>

        {/* Modern Card-Based Carousel */}
        <motion.div 
          className="relative max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Main Carousel Container */}
          <div 
            className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative aspect-[16/9] lg:aspect-[20/9]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src={carouselImages[currentIndex].src}
                    alt={carouselImages[currentIndex].alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Modern Caption Card */}
                  {carouselImages[currentIndex].caption && (
                    <motion.div 
                      className="absolute bottom-8 left-8 right-8 lg:bottom-12 lg:left-12 lg:right-1/2"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-2xl border border-white/20">
                        <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                          {carouselImages[currentIndex].caption}
                        </h3>
                        <p className="text-gray-600 text-sm lg:text-base font-light">
                          Empowering healthcare with AI-driven insights
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Minimal Navigation */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-6 lg:px-8">
              <motion.button
                onClick={prevSlide}
                className="pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 bg-white/90 hover:bg-white backdrop-blur-xl rounded-full shadow-xl border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 bg-white/90 hover:bg-white backdrop-blur-xl rounded-full shadow-xl border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
              </motion.button>
            </div>
          </div>

          {/* Modern Dot Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            {carouselImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-blue-600'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Subtle Progress Indicator */}
          <div className="mt-8 w-full max-w-md mx-auto">
            <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentIndex + 1) / carouselImages.length) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm font-medium text-gray-900">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-sm text-gray-500">
                of {String(carouselImages.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};