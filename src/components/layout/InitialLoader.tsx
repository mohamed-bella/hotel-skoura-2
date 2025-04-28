'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const InitialLoader = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show loader for at least 1.5 seconds for visual impact
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 relative w-16 h-16"
            >
              {/* Inline SVG logo to avoid image loading issues */}
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Circular background */}
                <circle cx="32" cy="32" r="30" fill="white" stroke="#DBA570" strokeWidth="1.5"/>
                
                {/* Stylized "B" letter */}
                <path d="M28 20H36C38.2091 20 40 21.7909 40 24C40 26.2091 38.2091 28 36 28H28V20Z" stroke="#DBA570" strokeWidth="1.5"/>
                <path d="M28 28H38C40.2091 28 42 29.7909 42 32C42 34.2091 40.2091 36 38 36H28V28Z" stroke="#DBA570" strokeWidth="1.5"/>
                <path d="M28 36H34C36.2091 36 38 37.7909 38 40C38 42.2091 36.2091 44 34 44H28V36Z" stroke="#DBA570" strokeWidth="1.5"/>
                <line x1="28" y1="20" x2="28" y2="44" stroke="#DBA570" strokeWidth="1.5"/>
                
                {/* Decorative elements */}
                <circle cx="32" cy="16" r="2" fill="#DBA570"/>
                <circle cx="32" cy="48" r="2" fill="#DBA570"/>
              </svg>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl font-serif text-neutral-800 mb-6"
            >
              Bassatine Skoura
            </motion.h2>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ 
                duration: 1,
                ease: "easeInOut"
              }}
              className="h-0.5 bg-accent-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InitialLoader 