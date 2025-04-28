'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { 
  HiOutlineSparkles, 
  HiOutlineCake, 
  HiOutlineHeart, 
  HiOutlineStar, 
  HiOutlineGlobe,
  HiOutlineWifi,
  HiOutlineBeaker,
  HiOutlineBriefcase
} from 'react-icons/hi'

const amenities = [
  {
    icon: <HiOutlineSparkles className="w-6 h-6" />,
    title: 'INFINITY POOL',
    description: 'Panoramic Atlas Mountain views from our serene infinity pool with traditional Moroccan tilework'
  },
  {
    icon: <HiOutlineCake className="w-6 h-6" />,
    title: 'FINE DINING',
    description: 'Authentic Moroccan cuisine prepared with locally-sourced ingredients by our master chefs'
  },
  {
    icon: <HiOutlineHeart className="w-6 h-6" />,
    title: 'LUXURY HAMMAM',
    description: 'Traditional Moroccan spa treatments using aromatic oils and time-honored techniques'
  },
  {
    icon: <HiOutlineStar className="w-6 h-6" />,
    title: '24HR CONCIERGE',
    description: 'Personalized service with our dedicated team attending to your every need and desire'
  },
  {
    icon: <HiOutlineGlobe className="w-6 h-6" />,
    title: 'EXCURSION SERVICE',
    description: 'Curated desert excursions and guided tours to Ouarzazate and surrounding kasbahs'
  },
  {
    icon: <HiOutlineWifi className="w-6 h-6" />,
    title: 'HIGH-SPEED WIFI',
    description: 'Complimentary high-speed internet access throughout the property'
  },
  {
    icon: <HiOutlineBeaker className="w-6 h-6" />,
    title: 'ROOFTOP LOUNGE',
    description: 'Signature cocktails and breathtaking sunset views across the Moroccan landscape'
  },
  {
    icon: <HiOutlineBriefcase className="w-6 h-6" />,
    title: 'BUSINESS CENTER',
    description: 'Fully-equipped meeting facilities with state-of-the-art technology and stunning views'
  }
]

const AmenitiesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section id="amenities" className="relative py-32 overflow-hidden">
      {/* Background image with minimal overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg"
          alt="Moroccan luxury courtyard"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Minimal decorative element */}
      <div className="absolute top-20 left-10 w-1 h-60 bg-white/10"></div>
      <div className="absolute bottom-20 right-10 w-1 h-60 bg-white/10"></div>
      
      <div className="container relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <div className="inline-block mb-6">
            <p className="text-accent-400 uppercase tracking-[0.2em] text-sm font-light mb-2">World-Class Offerings</p>
            <div className="h-px w-12 bg-accent-500 mx-auto"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans uppercase font-light mb-8 leading-tight tracking-wide">
            Extraordinary <span className="text-accent-500">Amenities</span>
          </h2>
          
          <p className="text-white/80 text-lg font-light leading-relaxed">
            Indulge in our carefully curated collection of amenities, designed to elevate
            your Moroccan experience with unparalleled luxury and authentic cultural immersion.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          {amenities.map((amenity, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-none border border-accent-500/30 mb-6 group-hover:border-accent-500 transition-colors duration-300">
                  <div className="text-accent-400">
                    {amenity.icon}
                  </div>
                </div>
                
                <h3 className="text-lg font-sans uppercase tracking-wide mb-3 group-hover:text-accent-400 transition-colors duration-300">
                  {amenity.title}
                </h3>
                
                <p className="text-white/70 font-light leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Recognition bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-28 pt-12 border-t border-white/10"
        >
          <div className="flex flex-wrap items-center justify-center gap-12">
            <div className="flex items-center opacity-50 hover:opacity-90 transition-opacity">
              <Image src="/images/awards/conde-nast-gold.svg" alt="Condé Nast Traveller Gold List" width={100} height={40} />
            </div>
            <div className="flex items-center opacity-50 hover:opacity-90 transition-opacity">
              <Image src="/images/awards/travel-leisure.svg" alt="Travel + Leisure World's Best" width={100} height={40} />
            </div>
            <div className="flex items-center opacity-50 hover:opacity-90 transition-opacity">
              <Image src="/images/awards/forbes-five-star.svg" alt="Forbes Five Star" width={100} height={40} />
            </div>
            <div className="flex items-center opacity-50 hover:opacity-90 transition-opacity">
              <Image src="/images/awards/leading-hotels.svg" alt="Leading Hotels of the World" width={100} height={40} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AmenitiesSection