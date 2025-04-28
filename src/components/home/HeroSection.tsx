'use client'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// High-quality images for a luxury Moroccan hotel experience
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Timeless Elegance',
    subtitle: 'Ouarzazate, Morocco'
  },
  {
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Desert Serenity',
    subtitle: 'Atlas Mountains'
  },
  {
    image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    title: 'Luxury Retreat',
    subtitle: 'Authentic Riad Experience'
  }
]

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 7000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero background slider */}
      <AnimatePresence mode="wait">
        {heroSlides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={`slide-${index}`}
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                quality={95}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* Slide indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all duration-300 ${
              index === currentSlide ? 'w-10 bg-white' : 'w-4 bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Content container */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 container mx-auto h-full flex flex-col justify-center items-start px-4 sm:px-6 lg:px-8"
      >
        {/* Main content */}
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-px bg-white mb-6"
              ></motion.div>
              
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg font-light text-white mb-3 tracking-wider uppercase"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.h2>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl sm:text-6xl md:text-7xl font-serif text-white mb-6 leading-tight"
              >
                Bassatine <br />
                <span className="text-white/90">Skoura</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg max-w-xl text-white font-light mb-10"
              >
                An oasis of tranquility where Moroccan heritage meets modern luxury,
                nestled at the gateway to the Sahara.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link 
                  href="/rooms" 
                  className="px-8 py-4 bg-white text-black uppercase tracking-widest text-sm font-medium hover:bg-white/90 transition-colors duration-300"
                >
                  Book Your Stay
                </Link>
                <Link 
                  href="/experiences" 
                  className="px-8 py-4 bg-transparent border border-white text-white uppercase tracking-widest text-sm font-medium hover:bg-white/10 transition-colors duration-300"
                >
                  Explore
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Simple scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-10 right-8 z-30 hidden md:block"
        >
          <div className="flex flex-col items-center">
            <div className="h-14 w-px bg-white/30 mb-2 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-white"
                initial={{ y: -56 }}
                animate={{ y: 56 }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut" 
                }}
              ></motion.div>
            </div>
            <span className="text-white/70 text-xs uppercase tracking-widest">Scroll</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default HeroSection 