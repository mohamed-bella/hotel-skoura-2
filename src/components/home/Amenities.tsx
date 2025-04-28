'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Luxury amenities data
const luxuryAmenities = [
  {
    id: 'spa',
    title: 'Luxury Spa',
    description: 'Our award-winning spa features traditional Moroccan hammam, private treatment rooms, and a curated selection of rejuvenating therapies using local ingredients.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 4.5C7.5 4.5 8.33333 6.33333 12 6.33333C15.6667 6.33333 16.5 4.5 16.5 4.5M16.5 19.5C16.5 19.5 15.6667 17.6667 12 17.6667C8.33333 17.6667 7.5 19.5 7.5 19.5M12 19.5V13.5M12 10.5V4.5M20.25 12.75C20.25 16.8921 16.8921 20.25 12.75 20.25H11.25C7.10786 20.25 3.75 16.8921 3.75 12.75V11.25C3.75 7.10786 7.10786 3.75 11.25 3.75H12.75C16.8921 3.75 20.25 7.10786 20.25 11.25V12.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 'dining',
    title: 'Fine Dining',
    description: 'Experience authentic Moroccan cuisine reimagined with contemporary techniques. Our restaurant showcases local ingredients with panoramic views of the desert.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 6.75H18.2M18.2 6.75C19.1941 6.75 20 7.55589 20 8.55V12C20 12.9941 19.1941 13.8 18.2 13.8H16M18.2 6.75V13.8M8 6.75H12M12 6.75H16M12 6.75V13.8M16 13.8H12M12 13.8H8M22 18.75C22 19.9926 21.5 21 20.5 21C19.5 21 19 19.9926 19 18.75C19 17.5074 20.5 15 20.5 15C20.5 15 22 17.5074 22 18.75ZM15.25 20.25H6C4.34315 20.25 3 18.9069 3 17.25V7.5C3 5.84315 4.34315 4.5 6 4.5H18C19.6569 4.5 21 5.84315 21 7.5V13.38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: 'https://images.pexels.com/photos/6270541/pexels-photo-6270541.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 'infinity-pool',
    title: 'Infinity Pool',
    description: 'Our spectacular infinity pool seems to merge with the horizon, offering breathtaking views of the desert landscape while providing a refreshing sanctuary.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 13C2 11.1144 2 10.1716 2.58579 9.58579C3.17157 9 4.11438 9 6 9H18C19.8856 9 20.8284 9 21.4142 9.58579C22 10.1716 22 11.1144 22 13C22 14.8856 22 15.8284 21.4142 16.4142C20.8284 17 19.8856 17 18 17H6C4.11438 17 3.17157 17 2.58579 16.4142C2 15.8284 2 14.8856 2 13Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 9V6M14 9V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 11.5L3.5 12M22 11.5L20.5 12M2 14.5L3.5 14M22 14.5L20.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 'garden',
    title: 'Palm Gardens',
    description: 'Wander through our meticulously maintained gardens featuring rare palms, aromatic herbs, and flowering desert plants that create a serene oasis experience.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22V16M12 22C10.1144 22 9.17157 22 8.58579 21.4142C8 20.8284 8 19.8856 8 18V16H12M12 22C13.8856 22 14.8284 22 15.4142 21.4142C16 20.8284 16 19.8856 16 18V16H12M8 16C5.1716 16 3.75739 16 2.87868 15.1213C2 14.2426 2 12.8284 2 10C2 7.17157 2 5.75736 2.87868 4.87868C3.75736 4 5.17157 4 8 4L6 8.5L8 16ZM16 16C18.8284 16 20.2426 16 21.1213 15.1213C22 14.2426 22 12.8284 22 10C22 7.17157 22 5.75736 21.1213 4.87868C20.2426 4 18.8284 4 16 4L18 8.5L16 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: 'https://images.pexels.com/photos/5017871/pexels-photo-5017871.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 'excursions',
    title: 'Desert Excursions',
    description: 'Explore the majestic Moroccan desert with our curated excursions led by expert local guides, including sunset camel rides and stargazing experiences.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 21.5V17.5M14 21.5V17.5M7 10.5V7M17 10.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 13.5L3.08054 13.5483C6.52047 15.7646 9.84294 17 12 17C14.157 17 17.4797 15.7646 20.9196 13.5481L21 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 10.5H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 6.5C8 4.29086 9.79086 2.5 12 2.5C14.2091 2.5 16 4.29086 16 6.5V7.5H8V6.5Z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    image: 'https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 'wellness',
    title: 'Wellness Center',
    description: 'Our holistic wellness center offers yoga sessions at sunrise, meditation spaces, and personalized wellness programs to rejuvenate body and mind.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 19.5C2 15.8146 5.06642 13.5 12 13.5C18.9336 13.5 22 15.8146 22 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    image: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=1920'
  }
]

const Amenities = () => {
  const [activeAmenity, setActiveAmenity] = useState(luxuryAmenities[0])
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }
  
  return (
    <section className="py-24 bg-neutral-900 relative overflow-hidden">
      {/* Background design element */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src="/images/pattern.svg"
            alt="Moroccan pattern"
            width={500}
            height={500}
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          <p className="text-accent-400 text-sm uppercase tracking-[0.25em] mb-3">Exclusive Offerings</p>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Exceptional Amenities & Experiences</h2>
          <div className="w-20 h-px bg-accent-500 mx-auto mb-8"></div>
          <p className="text-white/70 text-lg">
            Indulge in our curated selection of world-class amenities and services designed to elevate your stay from memorable to extraordinary.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
          {/* Amenities Navigation */}
          <div className="md:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {luxuryAmenities.map((amenity) => (
                <motion.button
                  key={amenity.id}
                  variants={itemVariants}
                  onClick={() => setActiveAmenity(amenity)}
                  className={`w-full text-left p-5 flex items-start gap-4 rounded-sm transition-all duration-300 ${
                    activeAmenity.id === amenity.id
                      ? 'bg-accent-500/10 border-l-4 border-accent-500'
                      : 'border-l-4 border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className={`mt-1 transition-colors duration-300 ${
                    activeAmenity.id === amenity.id ? 'text-accent-500' : 'text-white/50'
                  }`}>
                    {amenity.icon}
                  </div>
                  <div>
                    <h3 className={`text-lg font-medium mb-1 transition-colors duration-300 ${
                      activeAmenity.id === amenity.id ? 'text-accent-400' : 'text-white'
                    }`}>
                      {amenity.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2">{amenity.description}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
          
          {/* Amenity Details */}
          <div className="md:col-span-3">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src={activeAmenity.image}
                alt={activeAmenity.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
              
              {/* Image overlay with content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-serif text-white mb-3">{activeAmenity.title}</h3>
                <p className="text-white/80 mb-6 max-w-lg">{activeAmenity.description}</p>
                <Link 
                  href={`/amenities/${activeAmenity.id}`} 
                  className="inline-flex items-center text-accent-400 hover:text-accent-300 transition-colors duration-300"
                >
                  <span className="text-sm uppercase tracking-widest font-medium">Discover More</span>
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Link 
            href="/amenities" 
            className="inline-block px-8 py-4 bg-accent-500 text-white uppercase tracking-widest text-sm font-medium hover:bg-accent-600 transition-colors duration-300"
          >
            View All Amenities & Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Amenities 