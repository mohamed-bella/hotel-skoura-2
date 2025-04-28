'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// Luxury room collection data
const luxuryRooms = [
  {
    id: 'royal-suite',
    name: 'Royal Suite',
    description: 'Our most opulent accommodation featuring a private terrace with panoramic desert views, handcrafted Moroccan furnishings, and a lavish marble bathroom with soaking tub.',
    price: 450,
    size: '120 sq m',
    capacity: '2 Adults',
    mainImage: 'https://images.pexels.com/photos/4946956/pexels-photo-4946956.jpeg?auto=compress&cs=tinysrgb&w=1920',
    features: ['Private Terrace', 'King Size Bed', 'Butler Service', 'Luxury Spa Amenities']
  },
  {
    id: 'desert-villa',
    name: 'Desert Villa',
    description: 'An exclusive retreat with private pool and garden, offering seclusion and luxury in a traditional Moroccan setting with modern amenities and breathtaking desert views.',
    price: 850,
    size: '200 sq m',
    capacity: '4 Adults',
    mainImage: 'https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&w=1920',
    features: ['Private Pool', 'Kitchenette', 'Dining Area', 'Outdoor Lounge']
  },
  {
    id: 'garden-pavilion',
    name: 'Garden Pavilion',
    description: 'Nestled within our palm gardens, these elegant pavilions offer a serene sanctuary with traditional Moroccan décor, luxurious bedding, and a private outdoor shower.',
    price: 380,
    size: '85 sq m',
    capacity: '2 Adults',
    mainImage: 'https://images.pexels.com/photos/6585763/pexels-photo-6585763.jpeg?auto=compress&cs=tinysrgb&w=1920',
    features: ['Garden View', 'Outdoor Shower', 'Queen Size Bed', 'Moroccan Sitting Area']
  },
  {
    id: 'palm-suite',
    name: 'Palm Suite',
    description: 'A sophisticated suite combining modern luxury with authentic Moroccan craftsmanship, featuring a generous living space and private balcony overlooking our lush gardens.',
    price: 320,
    size: '70 sq m',
    capacity: '2 Adults',
    mainImage: 'https://images.pexels.com/photos/6758773/pexels-photo-6758773.jpeg?auto=compress&cs=tinysrgb&w=1920',
    features: ['Balcony', 'Living Area', 'Walk-in Shower', 'Smart Entertainment System']
  }
]

const RoomsShowcase = () => {
  const [activeRoom, setActiveRoom] = useState(luxuryRooms[0])
  const [visibleRoom, setVisibleRoom] = useState(luxuryRooms[0])
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Change room with transition direction
  const changeRoom = (room: typeof activeRoom, newDirection: number) => {
    if (room.id === activeRoom.id) return
    
    setDirection(newDirection)
    setVisibleRoom(activeRoom) // Store current room before transition
    setActiveRoom(room)
  }
  
  // Animation variants
  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.8 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 1.05,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    })
  }
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }
  
  return (
    <section className="py-24 bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-accent-400 text-sm uppercase tracking-[0.25em] mb-3"
          >
            Luxury Accommodations
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-white mb-6"
          >
            Curated Spaces for Refined Comfort
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-20 h-px bg-accent-500 mx-auto"
          />
        </div>
        
        {/* Room Showcase */}
        <div ref={containerRef} className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Room Image */}
          <div className="h-[500px] md:h-[700px] relative rounded-lg overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeRoom.id}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={activeRoom.mainImage}
                  alt={activeRoom.name}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Price tag */}
                <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm px-6 py-3 border border-white/10">
                  <span className="text-accent-400 text-sm font-medium">From</span>
                  <div className="text-white text-2xl font-light">${activeRoom.price} <span className="text-sm text-white/60">per night</span></div>
                </div>
                
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Room Info */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoom.id}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentVariants}
                className="text-white"
              >
                <motion.h3 
                  variants={itemVariants}
                  className="text-4xl font-serif text-white mb-4"
                >
                  {activeRoom.name}
                </motion.h3>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-white/80 text-lg mb-6"
                >
                  {activeRoom.description}
                </motion.p>
                
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-6 mb-8"
                >
                  <div className="flex flex-col">
                    <span className="text-accent-400 text-sm uppercase tracking-wider mb-1">Room Size</span>
                    <span className="text-white text-2xl font-light">{activeRoom.size}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-accent-400 text-sm uppercase tracking-wider mb-1">Occupancy</span>
                    <span className="text-white text-2xl font-light">{activeRoom.capacity}</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="mb-10"
                >
                  <h4 className="text-accent-400 text-sm uppercase tracking-wider mb-4">Room Features</h4>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {activeRoom.features.map((feature) => (
                      <li key={feature} className="flex items-center text-white/80">
                        <svg className="w-4 h-4 text-accent-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap gap-4"
                >
                  <Link 
                    href={`/accommodation/${activeRoom.id}`}
                    className="px-8 py-4 bg-accent-500 text-white uppercase tracking-widest text-sm font-medium hover:bg-accent-600 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                  
                  <Link 
                    href="/booking" 
                    className="px-8 py-4 border border-white/30 text-white uppercase tracking-widest text-sm font-medium hover:bg-white/10 transition-colors duration-300"
                  >
                    Book Now
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            
            {/* Room Selection */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h4 className="text-accent-400 text-sm uppercase tracking-wider mb-6">Explore Our Rooms</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {luxuryRooms.map((room, index) => (
                  <button
                    key={room.id}
                    onClick={() => changeRoom(room, index > luxuryRooms.findIndex(r => r.id === activeRoom.id) ? 1 : -1)}
                    className={`relative group ${activeRoom.id === room.id ? 'ring-2 ring-accent-500' : ''}`}
                  >
                    <div className="relative h-24 overflow-hidden">
                      <Image
                        src={room.mainImage}
                        alt={room.name}
                        fill
                        className={`object-cover transition-all duration-500 ${activeRoom.id === room.id ? 'scale-105' : 'group-hover:scale-110'}`}
                      />
                      <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${activeRoom.id === room.id ? 'opacity-0' : 'group-hover:opacity-0'}`} />
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 py-1 px-2 text-[10px] font-medium uppercase tracking-wider text-center ${activeRoom.id === room.id ? 'bg-accent-500' : 'bg-black/70 group-hover:bg-accent-500/80'}`}>
                      {room.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* View All Link */}
        <div className="mt-16 text-center">
          <Link 
            href="/accommodation" 
            className="inline-flex items-center text-white hover:text-accent-400 uppercase tracking-widest text-sm font-medium transition-colors duration-300"
          >
            <span>View All Accommodations</span>
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RoomsShowcase 