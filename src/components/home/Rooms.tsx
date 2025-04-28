'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

type RoomType = {
  id: string
  name: string
  description: string
  pricePerNight: number
  bedType: string
  size: string
  occupancy: string
  amenities: string[]
  images: string[]
}

const luxuryRooms: RoomType[] = [
  {
    id: 'imperial-suite',
    name: 'Imperial Suite',
    description: 'Our most prestigious accommodation, featuring a private terrace with panoramic desert views, a plunge pool, and traditional Moroccan architectural elements blended with modern luxury.',
    pricePerNight: 950,
    bedType: 'King Size Canopy Bed',
    size: '120 sq m',
    occupancy: 'Up to 2 Adults',
    amenities: [
      'Private Plunge Pool',
      'Panoramic Desert Views',
      'Handcrafted Furniture',
      'Fireplace',
      'Luxury Bath Amenities',
      'Evening Turndown Service'
    ],
    images: [
      'https://images.pexels.com/photos/7031723/pexels-photo-7031723.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/6466236/pexels-photo-6466236.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/6186840/pexels-photo-6186840.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ]
  },
  {
    id: 'royal-palm-suite',
    name: 'Royal Palm Suite',
    description: 'A spacious suite inspired by Moroccan royalty, featuring high ceilings with ornate details, a private courtyard, and handcrafted furnishings from local artisans.',
    pricePerNight: 750,
    bedType: 'King Size Four-Poster Bed',
    size: '90 sq m',
    occupancy: 'Up to 2 Adults',
    amenities: [
      'Private Courtyard',
      'Sitting Area',
      'Walk-in Rainfall Shower',
      'Artisan Crafted Decor',
      'Premium Sound System',
      'Butler Service'
    ],
    images: [
      'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/6585750/pexels-photo-6585750.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/6585760/pexels-photo-6585760.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ]
  },
  {
    id: 'desert-view-pavilion',
    name: 'Desert View Pavilion',
    description: 'An elegant pavilion with floor-to-ceiling windows that frame the stunning desert landscape, featuring a private garden with traditional Moroccan seating area.',
    pricePerNight: 650,
    bedType: 'King Size or Twin Beds',
    size: '75 sq m',
    occupancy: 'Up to 3 Adults',
    amenities: [
      'Private Garden',
      'Desert Views',
      'Moroccan Seating Area',
      'Luxury Linens',
      'Complimentary Mini Bar',
      'Evening Canapes'
    ],
    images: [
      'https://images.pexels.com/photos/6186507/pexels-photo-6186507.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/6186654/pexels-photo-6186654.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/6480209/pexels-photo-6480209.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ]
  }
]

const Rooms = () => {
  const [activeRoom, setActiveRoom] = useState<RoomType>(luxuryRooms[0])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const constraintsRef = useRef(null)
  
  const changeImage = (newIndex: number) => {
    setDirection(newIndex > currentImageIndex ? 1 : -1)
    setCurrentImageIndex(newIndex)
  }
  
  const nextImage = () => {
    setDirection(1)
    setCurrentImageIndex((prev) => 
      prev === activeRoom.images.length - 1 ? 0 : prev + 1
    )
  }
  
  const prevImage = () => {
    setDirection(-1)
    setCurrentImageIndex((prev) => 
      prev === 0 ? activeRoom.images.length - 1 : prev - 1
    )
  }
  
  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  }
  
  const transitionSettings = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.5 }
  }
  
  const roomTabVariants = {
    inactive: { opacity: 0.6, y: 0 },
    active: { 
      opacity: 1, 
      y: -5,
      transition: { duration: 0.3 }
    },
    hover: { 
      y: -3,
      opacity: 0.9,
      transition: { duration: 0.2 }
    }
  }
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }
  
  return (
    <section className="py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="text-accent-600 text-sm uppercase tracking-[0.25em]">Luxury Accommodations</span>
            <h2 className="text-4xl md:text-5xl font-serif text-neutral-800 mt-4">Exquisite Rooms & Suites</h2>
            <div className="w-16 h-1 bg-accent-500 mx-auto mt-6"></div>
          </motion.div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-3/5 relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentImageIndex}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transitionSettings}
                    className="absolute w-full h-full"
                  >
                    <Image
                      src={activeRoom.images[currentImageIndex]}
                      alt={`${activeRoom.name} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {activeRoom.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => changeImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'w-8 bg-white' : 'bg-white/60'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Room tabs */}
            <div className="mt-6 flex space-x-4">
              {luxuryRooms.map((room) => (
                <motion.button
                  key={room.id}
                  variants={roomTabVariants}
                  initial="inactive"
                  animate={activeRoom.id === room.id ? "active" : "inactive"}
                  whileHover="hover"
                  onClick={() => {
                    setActiveRoom(room)
                    setCurrentImageIndex(0)
                  }}
                  className={`px-4 py-2 text-sm font-medium focus:outline-none transition-all duration-300 ${
                    activeRoom.id === room.id 
                      ? 'text-accent-600 border-b-2 border-accent-500' 
                      : 'text-neutral-500 border-b-2 border-transparent'
                  }`}
                >
                  {room.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Right: Room Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-2/5"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoom.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="h-full flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-serif text-neutral-800">{activeRoom.name}</h3>
                  <div className="flex flex-col items-end">
                    <span className="text-accent-600 text-2xl font-light">${activeRoom.pricePerNight}</span>
                    <span className="text-neutral-500 text-sm">per night</span>
                  </div>
                </div>
                
                <p className="text-neutral-600 mb-6">{activeRoom.description}</p>
                
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 gap-y-4 mb-8"
                >
                  <motion.div variants={fadeInUp} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
                    </svg>
                    <span className="text-sm text-neutral-700">{activeRoom.bedType}</span>
                  </motion.div>
                  
                  <motion.div variants={fadeInUp} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                    <span className="text-sm text-neutral-700">{activeRoom.size}</span>
                  </motion.div>
                  
                  <motion.div variants={fadeInUp} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm text-neutral-700">{activeRoom.occupancy}</span>
                  </motion.div>
                </motion.div>
                
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-neutral-800 mb-3">Room Amenities</h4>
                  <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                    {activeRoom.amenities.map((amenity, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex items-center text-sm text-neutral-600"
                      >
                        <svg className="w-4 h-4 text-accent-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {amenity}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <Link 
                    href={`/rooms/${activeRoom.id}`}
                    className="inline-flex items-center justify-center px-8 py-3 bg-accent-500 text-white uppercase tracking-wider text-sm font-medium hover:bg-accent-600 transition-colors w-full"
                  >
                    Book This Room
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Rooms 