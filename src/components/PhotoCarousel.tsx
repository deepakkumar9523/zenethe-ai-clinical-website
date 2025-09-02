"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
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

  // Handle drag/swipe
  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold) {
      prevSlide();
    } else if (info.offset.x < -swipeThreshold) {
      nextSlide();
    }
  }, [nextSlide, prevSlide]);

  // Get visible slides for mobile center mode
  const getVisibleSlides = () => {
    const slides = [];
    
    // Previous slide
    const prevIndex = currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1;
    // Next slide  
    const nextIndex = currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1;
    
    slides.push({ index: prevIndex, position: 'prev' });
    slides.push({ index: currentIndex, position: 'current' });
    slides.push({ index: nextIndex, position: 'next' });
    
    return slides;
  };

  const visibleSlides = getVisibleSlides();

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Trusted by Doctors
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Healthcare professionals worldwide use our AI RAG technology 
            to enhance patient care and clinical decision-making.
          </motion.p>
        </div>

        {/* Mobile-First Modern Carousel */}
        <motion.div 
          className="relative max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Mobile Center Mode Carousel */}
          <div className="block md:hidden">
            <div className="relative h-80 flex items-center justify-center overflow-visible px-4">
              {visibleSlides.map(({ index, position }) => {
                const isCenter = position === 'current';
                const isPrev = position === 'prev';
                const isNext = position === 'next';
                
                return (
                  <motion.div
                    key={`${index}-${position}`}
                    className={`absolute transition-all duration-300 ease-out ${
                      isCenter 
                        ? 'z-20 scale-100' 
                        : 'z-10 scale-75 opacity-60'
                    }`}
                    animate={{
                      x: isCenter ? 0 : isPrev ? -120 : 120,
                      scale: isCenter ? 1 : 0.75,
                      opacity: isCenter ? 1 : 0.6,
                    }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    onClick={() => !isCenter && goToSlide(index)}
                    whileTap={{ scale: isCenter ? 0.98 : 0.73 }}
                  >
                    <div className={`w-72 h-72 rounded-2xl overflow-hidden shadow-lg ${
                      isCenter ? 'shadow-2xl' : 'shadow-md'
                    }`}>
                      <img
                        src={carouselImages[index].src}
                        alt={carouselImages[index].alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                        isCenter ? 'opacity-100' : 'opacity-0'
                      }`} />
                      
                      {/* Caption only on center slide */}
                      {isCenter && carouselImages[index].caption && (
                        <motion.div 
                          className="absolute bottom-4 left-4 right-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                        >
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {carouselImages[index].caption}
                            </h3>
                            <p className="text-gray-600 text-xs">
                              Empowering healthcare with AI
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Desktop Full-Width Carousel */}
          <div className="hidden md:block">
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="relative aspect-[20/9]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="absolute inset-0"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                  >
                    <img
                      src={carouselImages[currentIndex].src}
                      alt={carouselImages[currentIndex].alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Desktop Caption */}
                    {carouselImages[currentIndex].caption && (
                      <motion.div 
                        className="absolute bottom-8 left-8 right-1/2"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
                          <h3 className="text-3xl font-semibold text-gray-900 mb-2">
                            {carouselImages[currentIndex].caption}
                          </h3>
                          <p className="text-gray-600 text-base font-light">
                            Empowering healthcare with AI-driven insights
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Desktop Navigation */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-8">
                <motion.button
                  onClick={prevSlide}
                  className="pointer-events-auto w-14 h-14 bg-white/90 hover:bg-white backdrop-blur-xl rounded-full shadow-xl border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                </motion.button>

                <motion.button
                  onClick={nextSlide}
                  className="pointer-events-auto w-14 h-14 bg-white/90 hover:bg-white backdrop-blur-xl rounded-full shadow-xl border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Modern Dot Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            {carouselImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
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

          {/* Quick Progress Indicator */}
          <div className="mt-6 w-full max-w-md mx-auto">
            <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentIndex + 1) / carouselImages.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
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