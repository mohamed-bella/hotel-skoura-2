'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import HeroSection from '@/components/home/HeroSection'
import RoomTypeSection from '@/components/home/RoomTypeSection'
import AmenitiesSection from '@/components/home/AmenitiesSection'
import BookingSection from '@/components/home/BookingSection'
import AboutSection from '@/components/home/AboutSection'
import GallerySection from '@/components/home/GallerySection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import ContactSection from '@/components/home/ContactSection'
import SEO from '@/components/SEO'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO pageType="home" />
      
      <HeroSection />
      <RoomTypeSection />
      <AmenitiesSection />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <BookingSection />
      <ContactSection />
    </motion.div>
  )
}