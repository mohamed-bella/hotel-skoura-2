'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="about" className="py-32 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg"
                alt="Bassatine Skoura hotel exterior"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 h-1/2">
              <Image
                src="https://images.pexels.com/photos/2291599/pexels-photo-2291599.jpeg"
                alt="Luxury hotel detail"
                fill
                className="object-cover border-8 border-white shadow-md"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <p className="text-accent-500 uppercase tracking-[0.2em] text-sm font-light mb-2">About Bassatine Skoura</p>
              <div className="h-px w-12 bg-accent-500"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-sans uppercase font-light mb-6 tracking-wide">
              Authentic <span className="text-accent-500">Moroccan</span> Luxury
            </h2>
            
            <p className="text-lg text-neutral-700 mb-6 font-light leading-relaxed">
              Nestled in the heart of Skoura Oasis, Bassatine Skoura is a luxury hotel that embodies the rich heritage and natural beauty of Morocco. Our establishment offers a perfect blend of traditional Moroccan architecture and modern luxury.
            </p>
            
            <p className="text-lg text-neutral-700 mb-6 font-light leading-relaxed">
              Surrounded by palm groves and with the majestic Atlas Mountains as a backdrop, our hotel provides an idyllic setting for travelers seeking both relaxation and adventure in one of Morocco's most beautiful regions.
            </p>
            
            <p className="text-lg text-neutral-700 mb-10 font-light leading-relaxed">
              At Bassatine Skoura, we pride ourselves on offering exceptional service, luxurious accommodations, and authentic Moroccan hospitality to ensure an unforgettable stay for our guests.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="border border-neutral-200 p-6 text-center">
                <div className="text-3xl font-sans font-light text-accent-600 mb-2">15+</div>
                <div className="uppercase text-sm tracking-wide text-neutral-600">Years Experience</div>
              </div>
              <div className="border border-neutral-200 p-6 text-center">
                <div className="text-3xl font-sans font-light text-accent-600 mb-2">16</div>
                <div className="uppercase text-sm tracking-wide text-neutral-600">Luxury Suites</div>
              </div>
              <div className="border border-neutral-200 p-6 text-center">
                <div className="text-3xl font-sans font-light text-accent-600 mb-2">24/7</div>
                <div className="uppercase text-sm tracking-wide text-neutral-600">Service</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection