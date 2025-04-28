'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { HiOutlineUsers, HiOutlineHome, HiOutlineSparkles, HiOutlineWifi } from 'react-icons/hi'

// Upgraded luxury room data with enhanced photography
const roomTypes = [
  {
    id: 'desert-suite',
    name: 'SAHARA PRESTIGE SUITE',
    nameArabic: 'جناح صحراء فاخر',
    description: 'Private terrace with panoramic views across the desert landscape and traditional handcrafted furnishings.',
    image: 'https://images.pexels.com/photos/7746913/pexels-photo-7746913.jpeg',
    capacity: 2,
    beds: 1,
    price: 530,
    features: ['Desert View', 'Private Plunge Pool', 'Handcrafted Decor', '24-hour Butler'],
    areaInSqm: 75,
    rating: 4.9,
  },
  {
    id: 'atlas-mountain-view',
    name: 'ATLAS PANORAMA SUITE',
    nameArabic: 'جناح بانوراما الأطلس',
    description: 'Inspired by the majestic Atlas mountains, offering spectacular views and a private lounge area.',
    image: 'https://images.pexels.com/photos/3209049/pexels-photo-3209049.jpeg',
    capacity: 2,
    beds: 1,
    price: 430,
    features: ['Mountain View', 'Marble Bathroom', 'Private Lounge', 'Evening Canapés'],
    areaInSqm: 65,
    rating: 4.8,
  },
  {
    id: 'royal-kasbah',
    name: 'ROYAL KASBAH SUITE',
    nameArabic: 'الجناح الملكي القصبة',
    description: 'Our most exclusive accommodation featuring authentic Moroccan architecture and exquisite craftsmanship.',
    image: 'https://images.pexels.com/photos/6446607/pexels-photo-6446607.jpeg',
    capacity: 4,
    beds: 2,
    price: 980,
    features: ['Panoramic Terrace', 'Private Dining', 'Moroccan Hammam', 'Exclusive Access'],
    areaInSqm: 120,
    rating: 5.0,
  },
  {
    id: 'palm-grove-retreat',
    name: 'PALM GROVE RETREAT',
    nameArabic: 'ملاذ بستان النخيل',
    description: 'Secluded luxury overlooking the ancient Skoura palm groves with traditional Berber influences.',
    image: 'https://images.pexels.com/photos/6585764/pexels-photo-6585764.jpeg',
    capacity: 3,
    beds: 2,
    price: 650,
    features: ['Garden Terrace', 'Outdoor Shower', 'Private Library', 'Butler Service'],
    areaInSqm: 85,
    rating: 4.9,
  }
]

const RoomTypeSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  return (
    <section id="rooms" className="py-32 bg-neutral-50">
      <div className="container relative">
        {/* Minimal decorative element */}
        <div className="absolute top-0 right-0 w-72 h-1 bg-accent-500/10 -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-24 max-w-3xl"
        >
          <div className="mb-6">
            <p className="text-accent-500 uppercase tracking-[0.2em] text-sm font-light mb-2">Exceptional Accommodations</p>
            <div className="h-px w-12 bg-accent-500"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light uppercase tracking-wide mb-8 leading-tight">
            Luxurious <span className="text-accent-500">Moroccan</span> Residences
          </h2>
          
          <p className="text-neutral-700 text-lg font-light leading-relaxed">
            Our exquisite suites blend authentic Moroccan craftsmanship with modern luxury, 
            offering panoramic views of the Atlas Mountains and Skoura palm groves.
            Each residence is thoughtfully designed to provide an intimate connection with 
            Morocco's rich cultural heritage.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          {roomTypes.map((room) => (
            <motion.div 
              key={room.id} 
              variants={itemVariants} 
              className="group"
            >
              <div className="relative overflow-hidden mb-8 aspect-[4/3]">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Premium label */}
                <div className="absolute top-6 left-0 bg-white/80 backdrop-blur-sm text-neutral-900 px-5 py-2 text-xs uppercase tracking-widest">
                  Premium Collection
                </div>
                
                {/* Rating */}
                <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm px-3 py-1 text-sm font-light">
                  {room.rating} <span className="text-accent-500">★</span>
                </div>
                
                {/* Room size */}
                <div className="absolute bottom-6 right-6 bg-black/60 text-white px-4 py-2 text-sm">
                  {room.areaInSqm}m²
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* View details button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Link
                    href={`/rooms/${room.id}`}
                    className="border-b border-accent-500 bg-transparent text-white hover:bg-accent-500/20 px-8 py-3 uppercase tracking-wider text-sm transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-sans uppercase tracking-wide">
                      {room.name}
                    </h3>
                    <p className="text-accent-500 font-light italic text-sm mt-1">{room.nameArabic}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-sans text-accent-600">${room.price}</div>
                    <div className="text-neutral-500 text-sm">per night</div>
                  </div>
                </div>
                
                <p className="text-neutral-600 mb-6 font-light">{room.description}</p>
                
                <div className="border-t border-neutral-200 pt-6 grid grid-cols-2 gap-y-4">
                  <div className="flex items-center text-sm text-neutral-600">
                    <HiOutlineUsers className="mr-3 text-accent-500" />
                    <span>Up to {room.capacity} Guests</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <HiOutlineHome className="mr-3 text-accent-500" />
                    <span>{room.beds} King Bed{room.beds > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <HiOutlineSparkles className="mr-3 text-accent-500" />
                    <span>Luxury Bath</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <HiOutlineWifi className="mr-3 text-accent-500" />
                    <span>High Speed WiFi</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-20">
          <Link 
            href="/rooms" 
            className="inline-flex items-center bg-transparent border-b border-accent-500 text-accent-600 hover:text-accent-700 px-12 py-4 uppercase tracking-wider text-sm transition-all duration-300"
          >
            View All Residences
            <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RoomTypeSection