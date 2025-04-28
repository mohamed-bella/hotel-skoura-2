'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const rooms = [
  {
    id: 'royal-suite',
    name: 'Royal Suite',
    description: 'Our crown jewel featuring a private terrace, plunge pool, and unparalleled Atlas Mountain views.',
    price: 650,
    image: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1920',
    details: [
      'Mountain View', '120m²', 'Private Pool', 'Luxury Bath'
    ],
  },
  {
    id: 'garden-pavilion',
    name: 'Garden Pavilion',
    description: 'A serene private villa nestled within our palm gardens with traditional Moroccan design elements.',
    price: 450,
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920',
    details: [
      'Garden View', '85m²', 'Private Terrace', 'Outdoor Shower'
    ],
  },
  {
    id: 'desert-view-suite',
    name: 'Desert View Suite',
    description: 'Panoramic windows showcase the desert landscape in this meticulously designed luxury suite.',
    price: 550,
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920',
    details: [
      'Desert View', '95m²', 'Sunken Bathtub', 'Lounge Area'
    ],
  }
]

const RoomShowcase = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.1, 0.4], [100, 0])

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-neutral-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full border border-neutral-800"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full border border-neutral-800"></div>
        <svg className="absolute top-[30%] right-[15%] w-[400px] h-[400px] text-accent-500/10" viewBox="0 0 100 100">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
        </svg>
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
          <h2 className="text-sm uppercase tracking-widest text-accent-500 mb-4 font-medium">Accommodation</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-6">Luxurious Retreats</h3>
          <div className="w-16 h-0.5 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600">
            Our curated collection of accommodations offers unparalleled comfort with authentic Moroccan design elements.
            Each space tells a story of craftsmanship and luxury.
          </p>
        </motion.div>
        
        {/* Rooms showcase */}
        <motion.div style={{ opacity, y }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative ${index === 0 ? 'lg:col-span-2' : ''}`}
            >
              <div className={`group overflow-hidden rounded-sm ${index === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes={index === 0 ? '(max-width: 1024px) 100vw, 1024px' : '(max-width: 1024px) 100vw, 512px'}
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Room name overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 transition-transform duration-500 ease-out">
                    <div className="flex justify-between items-end">
                      <div>
                        <h4 className="text-2xl md:text-3xl font-serif text-white mb-2">{room.name}</h4>
                        <div className="flex space-x-4 mb-4">
                          {room.details.map((detail, i) => (
                            <span key={i} className="text-sm text-sand-200">{detail}</span>
                          ))}
                        </div>
                        <p className="text-white/80 max-w-xl mb-6 hidden md:block">
                          {room.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-white/70 mb-1">From</div>
                        <div className="text-2xl md:text-3xl font-serif text-accent-400">${room.price}</div>
                        <div className="text-xs text-white/70">per night</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-white/20">
                      <Link 
                        href={`/rooms/${room.id}`}
                        className="inline-flex items-center text-white hover:text-accent-400 transition-colors"
                      >
                        <span className="mr-2">Explore Room</span>
                        <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 1L19 5M19 5L15 9M19 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                      
                      <button className="px-4 py-2 border border-white/30 text-white text-sm uppercase tracking-wider hover:bg-white/10 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View all rooms button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link 
            href="/rooms" 
            className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 text-white uppercase tracking-widest text-sm font-medium hover:bg-accent-600 transition-colors duration-300"
          >
            View All Accommodations
            <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16667 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default RoomShowcase 