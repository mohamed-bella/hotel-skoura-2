'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'

type ExperienceType = {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  icon: React.ReactNode
}

const experiences: ExperienceType[] = [
  {
    id: 'desert-sunset',
    title: 'Desert Sunset Experience',
    subtitle: 'Magical Moments',
    description: 'Embark on a guided journey through the majestic dunes of Skoura as the sun paints the desert in golden hues. Culminate your evening with traditional Moroccan tea service atop a private dune.',
    image: 'https://images.pexels.com/photos/3375699/pexels-photo-3375699.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17V21M6 17V21M18 17V21M3 13H21M5 13V8C5 5.23858 7.23858 3 10 3H14C16.7614 3 19 5.23858 19 8V13M12 7V9" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 'culinary-workshop',
    title: 'Moroccan Culinary Workshop',
    subtitle: 'Authentic Flavors',
    description: 'Join our master chef for an immersive cooking class, discovering centuries-old techniques and recipes. Source ingredients from our organic garden and learn to create traditional Moroccan delicacies.',
    image: 'https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14V17M12 14V17M16 14V17M4 11H20M18 7C18 9.20914 15.3137 11 12 11C8.68629 11 6 9.20914 6 7C6 4.79086 8.68629 3 12 3C15.3137 3 18 4.79086 18 7Z" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 7V10.5C20 10.5 18 13 12 13C6 13 4 10.5 4 10.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 'hammam-ritual',
    title: 'Traditional Hammam Ritual',
    subtitle: 'Wellness & Rejuvenation',
    description: 'Indulge in our signature hammam experience, a time-honored Moroccan bathing ritual. Enjoy a purifying steam, exfoliation with traditional black soap, and a relaxing massage with argan oil.',
    image: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&w=1600',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 21L5 21M17 21L19 21M5 3V7M19 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M19 7C19 10.866 15.866 14 12 14C8.13401 14 5 10.866 5 7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 17H14L12 21L10 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 'stargazing',
    title: 'Private Desert Stargazing',
    subtitle: 'Celestial Wonders',
    description: 'Experience the brilliance of the Saharan night sky guided by our resident astronomer. Enjoy privileged views of constellations through our telescope while reclining on plush Moroccan cushions.',
    image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
]

const Experiences = () => {
  const [activeExperience, setActiveExperience] = useState<ExperienceType>(experiences[0])
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px 0px" })
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    if (isInView) {
      setIsVisible(true)
    }
  }, [isInView])
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }
  
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 }
    }
  }
  
  const iconWrapperVariants = {
    inactive: { 
      scale: 1,
      opacity: 0.7,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      color: 'rgba(255, 255, 255, 0.7)'
    },
    active: { 
      scale: 1.05,
      opacity: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'rgb(255, 255, 255)',
      color: 'rgb(255, 255, 255)',
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.1,
      opacity: 0.9,
      transition: { duration: 0.2 }
    }
  }
  
  return (
    <section className="relative py-24 overflow-hidden bg-neutral-900" ref={sectionRef}>
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: isVisible ? 1 : 1.1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <Image
            src={activeExperience.image}
            alt={activeExperience.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/70 to-neutral-900/80"></div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-white"
        >
          <motion.div variants={itemVariants} className="mb-16 text-center max-w-3xl mx-auto">
            <span className="text-accent-400 text-sm uppercase tracking-[0.25em]">Curated Experiences</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">Unforgettable Moments</h2>
            <div className="w-16 h-1 bg-accent-500 mx-auto mt-6"></div>
            <p className="text-white/80 mt-6 max-w-2xl mx-auto">
              Immerse yourself in the rich culture, natural beauty, and timeless traditions of Morocco with our carefully curated collection of exclusive experiences.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Experience Content */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExperience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span 
                    variants={fadeInVariants}
                    className="text-accent-400 text-sm uppercase tracking-[0.15em]"
                  >
                    {activeExperience.subtitle}
                  </motion.span>
                  
                  <motion.h3 
                    variants={itemVariants}
                    className="text-3xl md:text-4xl font-serif text-white mt-2"
                  >
                    {activeExperience.title}
                  </motion.h3>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="w-12 h-0.5 bg-accent-500 mt-6"
                  ></motion.div>
                  
                  <motion.p 
                    variants={itemVariants}
                    className="text-white/80 mt-6 text-lg"
                  >
                    {activeExperience.description}
                  </motion.p>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="mt-8"
                  >
                    <Link 
                      href={`/experiences/${activeExperience.id}`}
                      className="inline-flex items-center px-6 py-3 bg-accent-500 text-white text-sm uppercase tracking-wider font-medium hover:bg-accent-600 transition-colors"
                    >
                      Reserve This Experience
                      <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Right: Experience Navigation */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              {experiences.map((experience) => (
                <motion.button
                  key={experience.id}
                  variants={iconWrapperVariants}
                  initial="inactive"
                  animate={activeExperience.id === experience.id ? "active" : "inactive"}
                  whileHover="hover"
                  onClick={() => setActiveExperience(experience)}
                  className={`relative p-6 border rounded-lg flex flex-col items-center text-center transition-all duration-300 focus:outline-none`}
                >
                  <div className="w-12 h-12 mb-4">
                    {experience.icon}
                  </div>
                  <h4 className="text-base font-medium mb-1">{experience.title}</h4>
                  <span className="text-xs text-white/60">{experience.subtitle}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Pattern */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.05 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="moroccanPattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale(2)">
            <path d="M10,0 L20,10 L10,20 L0,10 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M10,5 L15,10 L10,15 L5,10 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#moroccanPattern)" />
        </svg>
      </motion.div>
    </section>
  )
}

export default Experiences 