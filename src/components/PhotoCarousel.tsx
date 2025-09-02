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
  const [direction, setDirection] = useState(0);
  
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Ultra-fast auto-play
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Lightning-fast drag handling
  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    const swipeThreshold = 30; // More sensitive
    
    if (info.offset.x > swipeThreshold) {
      prevSlide();
    } else if (info.offset.x < -swipeThreshold) {
      nextSlide();
    }
  }, [nextSlide, prevSlide]);

  // Hardcore animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 15 : -15,
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  // Get dynamic positioning for uneven layout
  const getUnevenPosition = (index: number) => {
    const positions = [
      { x: 0, y: 0, scale: 1, rotate: 0 },
      { x: -15, y: 8, scale: 0.85, rotate: -2 },
      { x: 20, y: -12, scale: 0.9, rotate: 1.5 },
      { x: -8, y: 15, scale: 0.82, rotate: -1 },
      { x: 12, y: -8, scale: 0.88, rotate: 2 },
    ];
    return positions[index % positions.length];
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Hardcore background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-from)_0%,_transparent_50%)] from-blue-100/20" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-cyan-100/40 to-blue-100/40 rounded-full blur-3xl" />
      
      <motion.div 
        className="container mx-auto px-4 md:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Asymmetric header with uneven styling */}
        <div className="mb-12 md:mb-20">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
            variants={itemVariants}
          >
            <div className="lg:col-span-7">
              <motion.h2 
                className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 leading-none tracking-tighter"
                style={{ 
                  background: 'linear-gradient(135deg, #1f2937 0%, #3b82f6 70%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Trusted by
                <br />
                <span className="relative">
                  Doctors
                  <motion.div 
                    className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  />
                </span>
              </motion.h2>
            </div>
            <motion.div 
              className="lg:col-span-5 transform lg:translate-y-4"
              variants={itemVariants}
            >
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                Healthcare professionals worldwide use our cutting-edge AI technology 
                to revolutionize patient care and clinical excellence.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Ultra-modern asymmetric carousel */}
        <motion.div 
          className="relative max-w-7xl mx-auto"
          variants={itemVariants}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Mobile: Uneven stacked cards */}
          <div className="block lg:hidden">
            <div className="relative h-[500px] overflow-visible">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.2,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="absolute inset-0 perspective-1000"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 0.95 }}
                >
                  {/* Main card with uneven positioning */}
                  <motion.div
                    className="relative mx-auto w-80 h-96 transform-gpu"
                    animate={getUnevenPosition(currentIndex)}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      duration: 0.15
                    }}
                  >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-black/20 border border-white/50">
                      <img
                        src={carouselImages[currentIndex].src}
                        alt={carouselImages[currentIndex].alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      {/* Dynamic gradient overlay */}
                      <div 
                        className="absolute inset-0 opacity-80"
                        style={{
                          background: `linear-gradient(${135 + (currentIndex * 30)}deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, rgba(59,130,246,0.1) 100%)`
                        }}
                      />
                      
                      {/* Floating caption card */}
                      {carouselImages[currentIndex].caption && (
                        <motion.div 
                          className="absolute -bottom-8 -right-4 w-72"
                          initial={{ opacity: 0, x: 50, y: 20 }}
                          animate={{ opacity: 1, x: 0, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
                        >
                          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/40 transform rotate-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              {carouselImages[currentIndex].caption}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              Empowering healthcare
                            </p>
                            <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop: Hardcore uneven grid layout */}
          <div className="hidden lg:block">
            <div className="relative h-[600px] overflow-visible">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.18,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                  className="absolute inset-0"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.05}
                  onDragEnd={handleDragEnd}
                >
                  {/* Asymmetric layout with main + floating elements */}
                  <div className="relative w-full h-full flex items-center">
                    {/* Main hero image - off-center */}
                    <motion.div 
                      className="relative w-3/5 h-5/6 ml-8 transform-gpu"
                      animate={{
                        rotateY: Math.sin(currentIndex * 0.5) * 2,
                        rotateX: Math.cos(currentIndex * 0.3) * 1,
                      }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-black/30 border border-white/50">
                        <img
                          src={carouselImages[currentIndex].src}
                          alt={carouselImages[currentIndex].alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        
                        {/* Advanced gradient system */}
                        <div 
                          className="absolute inset-0 opacity-70"
                          style={{
                            background: [
                              `linear-gradient(${45 + (currentIndex * 25)}deg, rgba(0,0,0,0.4) 0%, transparent 50%)`,
                              `linear-gradient(${225 + (currentIndex * 25)}deg, rgba(59,130,246,0.2) 0%, transparent 60%)`
                            ].join(', ')
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* Floating caption panel - asymmetric positioning */}
                    {carouselImages[currentIndex].caption && (
                      <motion.div 
                        className="absolute top-1/4 right-8 w-80 z-10"
                        initial={{ opacity: 0, x: 100, rotateY: 20 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ delay: 0.05, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/60 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                          <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
                            {carouselImages[currentIndex].caption}
                          </h3>
                          <p className="text-gray-600 font-light leading-relaxed">
                            Revolutionizing healthcare with AI-driven precision
                          </p>
                          
                          {/* Decorative elements */}
                          <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg animate-pulse" />
                          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-md" />
                        </div>
                      </motion.div>
                    )}

                    {/* Ambient preview thumbnails */}
                    <div className="absolute bottom-8 left-8 flex space-x-3">
                      {carouselImages.slice(0, 3).map((image, index) => (
                        <motion.div
                          key={index}
                          className={`w-16 h-16 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
                            index === currentIndex ? 'ring-2 ring-blue-500 scale-110' : 'opacity-60 hover:opacity-100'
                          }`}
                          onClick={() => goToSlide(index)}
                          whileHover={{ scale: 1.1, rotateY: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Floating navigation - ultra modern */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-20">
                <motion.button
                  onClick={prevSlide}
                  className="pointer-events-auto w-16 h-16 bg-white/80 hover:bg-white backdrop-blur-2xl rounded-2xl shadow-xl border border-white/40 flex items-center justify-center group transform hover:scale-110 transition-all duration-200"
                  whileHover={{ scale: 1.1, rotateY: -10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-7 w-7 text-gray-700 group-hover:text-blue-600 transition-colors transform group-hover:-translate-x-0.5" />
                </motion.button>

                <motion.button
                  onClick={nextSlide}
                  className="pointer-events-auto w-16 h-16 bg-white/80 hover:bg-white backdrop-blur-2xl rounded-2xl shadow-xl border border-white/40 flex items-center justify-center group transform hover:scale-110 transition-all duration-200"
                  whileHover={{ scale: 1.1, rotateY: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-7 w-7 text-gray-700 group-hover:text-blue-600 transition-colors transform group-hover:translate-x-0.5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Ultra-modern asymmetric navigation */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Dynamic dot navigation */}
            <div className="flex items-center space-x-3">
              {carouselImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-200 rounded-full relative ${
                    index === currentIndex
                      ? 'w-12 h-3'
                      : 'w-3 h-3 hover:scale-125'
                  }`}
                  whileHover={{ scale: index === currentIndex ? 1 : 1.25 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <div 
                    className={`w-full h-full rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                      layoutId="activeDot"
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Lightning progress indicator */}
            <div className="flex items-center space-x-4 text-sm">
              <motion.div 
                className="bg-white/80 backdrop-blur-xl rounded-full px-4 py-2 shadow-lg border border-white/40"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-bold text-gray-900">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-gray-500 mx-1">/</span>
                <span className="text-gray-600">
                  {String(carouselImages.length).padStart(2, '0')}
                </span>
              </motion.div>
              
              {/* Ultra-fast progress bar */}
              <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentIndex + 1) / carouselImages.length) * 100}%` }}
                  transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};