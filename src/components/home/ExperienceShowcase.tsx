'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const experiences = [
  {
    id: 'desert-expedition',
    title: 'Desert Expedition',
    description: 'Journey through the captivating Sahara Desert on camelback with our expert guides, culminating in a traditional Berber dinner under the stars.',
    image: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1920',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    )
  },
  {
    id: 'local-cuisine',
    title: 'Culinary Journey',
    description: 'Immerse yourself in Moroccan gastronomy with our master chef. Learn the art of tagine preparation and the secrets of authentic spice blending.',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
    )
  },
  {
    id: 'atlas-mountains',
    title: 'Atlas Exploration',
    description: 'Discover the majestic High Atlas Mountains with a private guide. Visit Berber villages and enjoy a traditional lunch with panoramic mountain views.',
    image: 'https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=1920',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
      </svg>
    )
  },
  {
    id: 'spa-retreat',
    title: 'Hammam & Spa',
    description: 'Indulge in our signature hammam ritual featuring traditional Moroccan black soap, followed by an argan oil massage and mint tea service.',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1920',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
    )
  }
]

const ExperienceShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const constraintsRef = useRef(null)

  const nextExperience = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % experiences.length)
  }

  const prevExperience = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  }

  const activeExperience = experiences[activeIndex]

  return (
    <section className="relative py-24 md:py-32 bg-neutral-950 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent-500 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-400 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-16 md:mb-24"
        >
          <h2 className="text-sm uppercase tracking-widest text-accent-400 mb-4 font-medium">Experiences</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">Unforgettable Moments</h3>
          <div className="w-16 h-0.5 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-lg text-neutral-300">
            Immerse yourself in curated experiences that blend luxury with authentic Moroccan culture, 
            each designed to create lasting memories in our desert oasis.
          </p>
        </motion.div>
        
        {/* Experience showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Experience list */}
          <div className="order-2 lg:order-1 lg:col-span-1">
            <div className="space-y-3 relative" ref={constraintsRef}>
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  className={`p-5 border-l-2 cursor-pointer transition-all duration-300 ${
                    index === activeIndex
                      ? 'border-accent-500 bg-accent-500/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1)
                    setActiveIndex(index)
                  }}
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 2 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 mr-4 text-accent-500 transition-colors ${
                      index === activeIndex ? 'text-accent-400' : 'text-neutral-400'
                    }`}>
                      {experience.icon}
                    </div>
                    <div>
                      <h4 className={`text-xl font-medium transition-colors ${
                        index === activeIndex ? 'text-white' : 'text-neutral-300'
                      }`}>
                        {experience.title}
                      </h4>
                      <p className={`mt-1 text-sm transition-colors ${
                        index === activeIndex ? 'text-neutral-200' : 'text-neutral-400'
                      }`}>
                        {experience.description.split(' ').slice(0, 6).join(' ')}...
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Experience details */}
          <div className="order-1 lg:order-2 lg:col-span-2 h-full">
            <div className="relative overflow-hidden rounded-sm aspect-[16/9] bg-neutral-900">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={activeExperience.image}
                      alt={activeExperience.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <h3 className="text-3xl md:text-4xl font-serif mb-4">{activeExperience.title}</h3>
                        <p className="text-lg text-neutral-200 mb-6 max-w-2xl">
                          {activeExperience.description}
                        </p>
                        <Link
                          href={`/experiences/${activeExperience.id}`}
                          className="inline-flex items-center text-accent-400 hover:text-accent-300 transition-colors"
                        >
                          <span className="mr-2">Reserve This Experience</span>
                          <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 1L19 5M19 5L15 9M19 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation controls */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-10">
                <button 
                  onClick={prevExperience} 
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center pointer-events-auto hover:bg-black/70 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  onClick={nextExperience} 
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center pointer-events-auto hover:bg-black/70 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {experiences.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeIndex 
                        ? 'bg-accent-500 w-6' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1)
                      setActiveIndex(index)
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* View all experiences button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link 
            href="/experiences" 
            className="inline-flex items-center justify-center px-8 py-4 border border-accent-500 text-accent-400 uppercase tracking-widest text-sm font-medium hover:bg-accent-500/10 transition-colors duration-300"
          >
            Explore All Experiences
            <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16667 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceShowcase 