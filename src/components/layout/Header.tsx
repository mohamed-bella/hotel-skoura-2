'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { navigateWithLoading } from '@/lib/navigation'
import BasicMobileMenu from './BasicMobileMenu'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/rooms', label: 'SUITES' },
    { href: '/#amenities', label: 'EXPERIENCES' },
    { href: '/#about', label: 'ABOUT' },
    { href: '/#gallery', label: 'GALLERY' },
    { href: '/#contact', label: 'CONTACT' },
  ]

  const getHeaderBackground = () => {
    if (!isHomePage) {
      // On non-home pages, always show background
      return 'bg-white/95 backdrop-blur-sm shadow-sm'
    }
    // On home page, show background only when scrolled
    return scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
  }

  const getTextColor = () => {
    if (!isHomePage || scrolled) {
      // Dark text on non-home pages or when scrolled
      return 'text-neutral-900'
    }
    // White text on home page when at the top
    return 'text-white'
  }

  const toggleMenu = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-500 ${
          getHeaderBackground()
        } ${isHomePage ? scrolled ? 'py-4' : 'py-6' : 'py-4'}`}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo with minimal design */}
          <Link 
            href="/" 
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault();
              navigateWithLoading('/');
            }}
          >
            <div className={`hidden md:block mr-3 h-8 w-px ${(isHomePage && !scrolled) ? 'bg-white/50' : 'bg-accent-500'}`}></div>
            <div className="font-sans text-xl font-light tracking-[0.25em] transition-colors duration-500 flex items-center">
              <span className={getTextColor()}>BASSATINE</span>
              <span className={`ml-2 text-xs tracking-[0.2em] ${(isHomePage && !scrolled) ? 'text-white/80' : 'text-accent-500'}`}>SKOURA</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateWithLoading(link.href);
                    }}
                    className={`transition-colors duration-300 text-xs tracking-[0.2em] hover:text-accent-500 ${
                      (isHomePage && !scrolled) ? 'text-white' : 'text-neutral-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Book Now Button */}
          <Link 
            href="/#booking" 
            onClick={(e) => {
              e.preventDefault();
              navigateWithLoading('/#booking');
            }}
            className={`hidden md:block px-6 py-3 text-xs tracking-[0.2em] transition-all duration-300 ${
              (isHomePage && !scrolled)
                ? 'text-white border-b border-white/50 hover:border-white' 
                : 'text-neutral-900 border-b border-accent-500 hover:bg-neutral-50'
            }`}
          >
            BOOK NOW
          </Link>

          {/* Mobile menu button - Modern minimal design */}
          <button 
            className="md:hidden z-50 w-10 h-10 flex flex-col items-center justify-center"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <motion.span
                initial={false}
                animate={{ 
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0
                }}
                className={`absolute block w-6 h-px transform transition-all duration-300 ${
                  (isHomePage && !scrolled && !isOpen) ? 'bg-white' : 'bg-neutral-900'
                }`}
                style={{ top: '6px' }}
              />
              <motion.span
                initial={false}
                animate={{ 
                  opacity: isOpen ? 0 : 1
                }}
                className={`absolute block w-6 h-px top-1/2 -translate-y-1/2 transition-all duration-300 ${
                  (isHomePage && !scrolled && !isOpen) ? 'bg-white' : 'bg-neutral-900'
                }`}
              />
              <motion.span
                initial={false}
                animate={{ 
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0
                }}
                className={`absolute block w-6 h-px transform transition-all duration-300 ${
                  (isHomePage && !scrolled && !isOpen) ? 'bg-white' : 'bg-neutral-900'
                }`}
                style={{ bottom: '6px' }}
              />
            </div>
          </button>
        </div>
      </header>
      
      {/* Luxury Mobile Menu */}
      <BasicMobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

export default Header