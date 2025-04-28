'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FaPlay } from 'react-icons/fa'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { IoMdQuote } from 'react-icons/io'

// Array of hero images with captions and credits
const heroImages = [
  {
    src: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Bassatine Skoura luxury hotel overlooking the palm groves',
    caption: 'Experience authentic Moroccan luxury in our tranquil desert oasis',
    credit: ''
  },
  {
    src: 'https://images.pexels.com/photos/3209049/pexels-photo-3209049.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Elegant courtyard with traditional Moroccan architecture',
    caption: 'Traditional architecture meets modern comfort in our exquisite spaces',
    credit: ''
  },
  {
    src: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Luxurious poolside with palm tree views',
    caption: 'Escape to a serene paradise where time stands still',
    credit: ''
  },
  {
    src: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Traditional Moroccan dining experience at sunset',
    caption: 'Indulge in authentic cuisine under the stars of Ouarzazate',
    credit: ''
  }
]

// Recognition/awards component
const AwardIcon = ({ icon, label }: { icon: string, label: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 flex items-center justify-center mb-2">
      {icon}
    </div>
    <span className="text-xs uppercase tracking-widest text-white/80">{label}</span>
  </div>
)

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const controls = useAnimation()
  
  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  
  // Auto-advancing slideshow
  useEffect(() => {
    startSlideInterval()
    return () => clearSlideInterval()
  }, [currentIndex])
  
  const startSlideInterval = () => {
    clearSlideInterval()
    intervalRef.current = setInterval(() => {
      goToNextSlide()
    }, 7000)
  }
  
  const clearSlideInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }
  
  const goToNextSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 700)
  }
  
  const goToPrevSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    )
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 700)
  }
  
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    
    setIsTransitioning(true)
    setCurrentIndex(index)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 700)
  }
  
  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  }
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.15,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  }
  
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3, type: "spring", stiffness: 400 }
    },
    tap: { scale: 0.98 }
  }
  
  return (
    <div 
      className="relative h-[90vh] md:h-screen overflow-hidden"
      ref={containerRef}
    >
      {/* Luxury label */}
      <div className="absolute top-8 right-8 z-30">
        <div className="gold-gradient p-px rounded-sm shadow-elegant">
          <div className="bg-white/95 px-4 py-2 rounded-sm backdrop-blur-sm">
            <span className="text-xs uppercase tracking-widest font-medium text-neutral-800">
              Luxury Destination
            </span>
          </div>
        </div>
      </div>
      
      {/* Image slider with parallax effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y, opacity }}
      >
        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={1}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={heroImages[currentIndex].src}
                alt={heroImages[currentIndex].alt}
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover object-center"
              />
              
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      
      {/* Slider controls - dots */}
      <div className="absolute bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-100 w-8'
                : 'bg-white/50 scale-75 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Arrow navigation */}
      <div className="hidden md:block absolute inset-y-0 left-4 z-20 flex items-center">
        <motion.button
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onClick={goToPrevSlide}
          className="bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
          aria-label="Previous slide"
        >
          <HiChevronLeft className="w-6 h-6" />
        </motion.button>
      </div>
      
      <div className="hidden md:block absolute inset-y-0 right-4 z-20 flex items-center">
        <motion.button
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onClick={goToNextSlide}
          className="bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
          aria-label="Next slide"
        >
          <HiChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-start">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentIndex}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-3xl md:max-w-2xl lg:max-w-3xl"
            >
              <motion.h1 
                custom={1} 
                variants={textVariants}
                className="text-4xl md:text-5xl lg:text-6xl text-white font-sans font-light leading-none tracking-wide mb-6 uppercase"
              >
                <span className="block mb-2">Bassatine Skoura</span>
                <span className="block text-xl md:text-2xl tracking-[0.3em] mt-3 font-light opacity-80">OUARZAZATE, MOROCCO</span>
              </motion.h1>
              
              <motion.div custom={2} variants={textVariants} className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <motion.span
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className="btn-primary px-8 py-3 text-sm uppercase tracking-widest shadow-lg inline-block"
                  >
                    Book Now
                  </motion.span>
                </Link>
                <Link href="/experiences">
                  <motion.span
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className="btn-outline bg-transparent border-white text-white hover:bg-white/10 px-8 py-3 text-sm uppercase tracking-widest inline-block"
                  >
                    Explore
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Minimal design element */}
      <div className="absolute bottom-0 left-0 z-20 h-1 w-full">
        <div className="bg-white/20 h-full" />
      </div>
    </div>
  )
}

export default Hero