'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { navigateWithLoading } from '@/lib/navigation'

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isHomePage: boolean;
  scrolled: boolean;
}

const MobileMenu = ({ isOpen, onClose, isHomePage, scrolled }: MobileMenuProps) => {
  const pathname = usePathname()
  
  // Debug isOpen state changes
  useEffect(() => {
    console.log('Mobile menu isOpen state:', isOpen)
  }, [isOpen])
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Close menu when path changes
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Rooms & Suites' },
    { href: '/#experiences', label: 'Experiences' },
    { href: '/#dining', label: 'Dining' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ]

  // Background fade animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { delay: 0.2, duration: 0.3 }
    }
  }

  // Menu slide animation
  const menuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    exit: { 
      x: '100%',
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 40 
      }
    }
  }

  // Link hover animation
  const linkHoverVariants = {
    hover: {
      x: 10,
      transition: { type: "spring", stiffness: 400 }
    }
  }

  // Staggered list item animation
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  }

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <div
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[101] flex flex-col"
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center p-6 border-b border-neutral-100">
              <div className="font-serif text-xl tracking-wide text-neutral-900">
                Menu
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-accent-50 hover:text-accent-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        navigateWithLoading(link.href);
                      }}
                      className="group flex items-center text-xl font-light text-neutral-800 hover:text-accent-600 transition-colors"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-3">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {link.label}
                    </a>
                  </div>
                ))}
              </nav>
              
              {/* Book Now Button */}
              <div className="mt-10">
                <a 
                  href="/#booking"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    navigateWithLoading('/#booking');
                  }}
                  className="block w-full text-center py-4 bg-accent-600 text-white rounded-sm text-sm tracking-widest uppercase hover:bg-accent-700 transition-colors"
                >
                  Book Now
                </a>
              </div>
              
              {/* Social Links */}
              <div className="mt-10 flex space-x-6 justify-center">
                {['instagram', 'facebook', 'twitter'].map((social) => (
                  <a 
                    key={social}
                    href={`https://${social}.com`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-accent-600 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    {social === 'instagram' && (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    )}
                    {social === 'facebook' && (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    )}
                    {social === 'twitter' && (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Menu Footer */}
            <div className="px-6 py-5 border-t border-neutral-100 text-xs text-neutral-500 flex items-center justify-between">
              <div className="tracking-wider">BASSATINE SKOURA</div>
              <div className="tracking-wider">MOROCCO</div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default MobileMenu 