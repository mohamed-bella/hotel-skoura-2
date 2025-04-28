import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-serif text-white mb-6">Bassatine Skoura</h3>
            <p className="text-neutral-300 mb-6">
              A luxurious retreat in the heart of Skoura, Morocco, offering premium accommodations and unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-500 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-500 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-500 transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Rooms & Suites', href: '/#rooms' },
                { label: 'Amenities', href: '/#amenities' },
                { label: 'Gallery', href: '/#gallery' },
                { label: 'About Us', href: '/#about' },
                { label: 'Contact', href: '/#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-neutral-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-serif text-white mb-6">Contact Us</h4>
            <div className="space-y-4 text-neutral-300">
              <p className="flex items-start">
                <FaMapMarkerAlt className="mr-3 mt-1 text-accent-500" />
                <span>Skoura Oasis, Ouarzazate Province, Morocco</span>
              </p>
              <p className="flex items-center">
                <FaPhone className="mr-3 text-accent-500" />
                <span>+212 5XX XXX XXX</span>
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-3 text-accent-500" />
                <span>info@bassatineskoura.com</span>
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-serif text-white mb-6">Newsletter</h4>
            <p className="text-neutral-300 mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-accent-500 placeholder-neutral-500"
              />
              <button type="submit" className="btn-accent">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Bassatine Skoura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer