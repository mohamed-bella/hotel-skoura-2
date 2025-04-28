'use client'
import { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// Define the global window interface outside the component
declare global {
  interface Window {
    startNavigation?: () => void;
  }
}

const NavigationLoader = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  
  // Reset loading state when pathname changes (navigation completes)
  useEffect(() => {
    setIsLoading(false)
  }, [pathname, searchParams])
  
  // Export a function to trigger loading state - safely for SSR
  useEffect(() => {
    // Only run this in browser, not during server-side rendering
    if (typeof window !== 'undefined') {
      window.startNavigation = () => setIsLoading(true)
    }
    
    // Clean up when component unmounts
    return () => {
      if (typeof window !== 'undefined') {
        window.startNavigation = undefined
      }
    }
  }, []) // Empty dependency array means this runs once on mount
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="bg-white rounded-lg shadow-xl p-7 flex flex-col items-center"
          >
            <div className="w-16 h-16 border-4 border-t-accent-500 border-r-accent-500/60 border-b-accent-500/40 border-l-accent-500/20 rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-600 font-medium">Loading experience...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NavigationLoader 