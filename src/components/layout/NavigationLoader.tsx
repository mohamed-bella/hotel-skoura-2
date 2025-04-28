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
          className="fixed inset-0 z-[999] flex items-center justify-center bg-white/90 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            {/* Premium minimalist loading animation */}
            <div className="relative mb-6">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 rounded-full border-2 border-neutral-200"></div>
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-t-accent-500 border-r-transparent border-b-transparent border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1, 
                    ease: "linear", 
                    repeat: Infinity 
                  }}
                ></motion.div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full"></div>
              </div>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ 
                duration: 0.8,
                ease: "easeInOut", 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
              className="h-0.5 bg-accent-500 mb-2"
            />
            <p className="text-neutral-600 text-sm tracking-wider uppercase font-light">
              Loading Experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NavigationLoader 