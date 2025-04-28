'use client'
import { useState } from 'react'
import Hero from '@/components/home/Hero'
import RoomTypeSection from '@/components/home/RoomTypeSection'
import AmenitiesSection from '@/components/home/AmenitiesSection'
import BookingSection from '@/components/home/BookingSection'
import AboutSection from '@/components/home/AboutSection'
import GallerySection from '@/components/home/GallerySection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import ContactSection from '@/components/home/ContactSection'

export default function TestPage() {
  const [currentComponent, setCurrentComponent] = useState<string | null>('hero')
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl mb-4">Component Test Page</h1>
        
        <div className="flex flex-wrap gap-2 mb-8">
          <button 
            className={`px-4 py-2 border ${currentComponent === 'hero' ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => setCurrentComponent('hero')}
          >
            Hero
          </button>
          <button 
            className={`px-4 py-2 border ${currentComponent === 'roomtype' ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => setCurrentComponent('roomtype')}
          >
            RoomTypeSection
          </button>
          <button 
            className={`px-4 py-2 border ${currentComponent === 'amenities' ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => setCurrentComponent('amenities')}
          >
            AmenitiesSection
          </button>
        </div>
        
        <div className="border p-4">
          {currentComponent === 'hero' && <Hero />}
          {currentComponent === 'roomtype' && <RoomTypeSection />}
          {currentComponent === 'amenities' && <AmenitiesSection />}
        </div>
      </div>
    </div>
  )
} 