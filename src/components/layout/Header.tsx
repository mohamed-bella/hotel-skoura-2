'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenuAlt4, HiX } from 'react-icons/hi'
import { usePathname } from 'next/navigation'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/#rooms', label: 'SUITES' },
    { href: '/#amenities', label: 'EXPERIENCES' },
    { href: '/#about', label: 'ABOUT' },
    { href: '/#gallery', label: 'GALLERY' },
    { href: '/#contact', label: 'CONTACT' },
  ]

  const getHeaderBackground = () => {
    if (!isHomePage) {
      // On non-home pages, always show background
      return 'bg-white/95 backdrop-blur-sm shadow-sm'
    } else {
      // On home page, show background only when scrolled
      return scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }
  }

  const getTextColor = () => {
    if (!isHomePage || scrolled) {
      // Dark text on non-home pages or when scrolled
      return 'text-neutral-900'
    } else {
      // White text on home page when at the top
      return 'text-white'
    }
  }

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        getHeaderBackground()
      } ${isHomePage ? scrolled ? 'py-4' : 'py-6' : 'py-4'}`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo with minimal design */}
        <Link href="/" className="flex items-center">
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
          className={`hidden md:block px-6 py-3 text-xs tracking-[0.2em] transition-all duration-300 ${
            (isHomePage && !scrolled)
              ? 'text-white border-b border-white/50 hover:border-white' 
              : 'text-neutral-900 border-b border-accent-500 hover:bg-neutral-50'
          }`}
        >
          BOOK NOW
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden z-20"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <HiX className="h-6 w-6 text-white" />
          ) : (
            <HiOutlineMenuAlt4 className={`h-6 w-6 ${(isHomePage && !scrolled) ? 'text-white' : 'text-neutral-900'}`} />
          )}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-neutral-900/95 z-10 flex flex-col items-center justify-center"
            >
              <div className="h-px w-20 bg-accent-500 mb-8"></div>
              <nav className="flex flex-col items-center space-y-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="text-sm font-light tracking-[0.2em] text-white hover:text-accent-400"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link 
                  href="/#booking" 
                  className="mt-6 border-b border-accent-500 px-6 py-3 text-white text-sm tracking-[0.2em] hover:text-accent-400"
                  onClick={() => setIsOpen(false)}
                >
                  BOOK NOW
                </Link>
              </nav>
              <div className="h-px w-20 bg-accent-500 mt-8"></div>
              
              <div className="absolute bottom-8 text-white/60 text-xs tracking-[0.3em]">
                OUARZAZATE • MOROCCO
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header