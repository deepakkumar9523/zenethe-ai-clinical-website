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

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === ' ') {
        event.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isPlaying]);

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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trusted by Doctors Worldwide
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Healthcare professionals across the globe rely on our AI-powered RAG technology 
            to enhance patient care, streamline workflows, and make more informed clinical decisions.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <motion.div 
          className="relative max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          role="region"
          aria-label="Doctor testimonial carousel"
        >
          {/* Main Carousel */}
          <div 
            className="relative overflow-hidden rounded-2xl shadow-2xl bg-white"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative aspect-[16/10] md:aspect-[16/9]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.6 
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src={carouselImages[currentIndex].src}
                    alt={carouselImages[currentIndex].alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Caption */}
                  {carouselImages[currentIndex].caption && (
                    <motion.div 
                      className="absolute bottom-6 left-6 right-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-4 shadow-lg">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {carouselImages[currentIndex].caption}
                        </h3>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 group"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-slate-700 group-hover:text-blue-600 transition-colors" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 group"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-slate-700 group-hover:text-blue-600 transition-colors" />
            </button>

            {/* Play/Pause Indicator */}
            <div className="absolute top-4 right-4 z-10">
              <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                isPlaying ? 'bg-green-500' : 'bg-yellow-500'
              }`}>
                <div className="sr-only">
                  {isPlaying ? 'Auto-play enabled' : 'Auto-play paused'}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center mt-8 space-x-3">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-blue-600'
                    : 'w-3 h-3 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
            <motion.div
              className="h-full bg-blue-600"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentIndex + 1) / carouselImages.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-slate-500">
              {currentIndex + 1} of {carouselImages.length}
            </span>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div 
          className="text-center mt-8 text-sm text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="hidden md:block">
            Use arrow keys to navigate • Hover to pause auto-play
          </p>
          <p className="md:hidden">
            Swipe to navigate • Tap to pause
          </p>
        </motion.div>
      </div>
    </section>
  );
};