'use client'
import { motion } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock } from 'react-icons/hi'

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <div className="mb-6 inline-block">
            <p className="text-accent-500 uppercase tracking-[0.2em] text-sm font-light mb-2">Get In Touch</p>
            <div className="h-px w-12 bg-accent-500 mx-auto"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-sans uppercase font-light mb-6 tracking-wide">
            Contact <span className="text-accent-500">Us</span>
          </h2>
          
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto font-light leading-relaxed">
            We're here to assist you with any inquiries. Reach out to us and experience
            our dedicated customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-sans uppercase font-light tracking-wide mb-10">Get in Touch</h3>
            
            <div className="space-y-10 mb-12">
              <div className="flex items-start">
                <div className="mr-6 text-accent-500">
                  <HiOutlineLocationMarker className="text-2xl" />
                </div>
                <div>
                  <h4 className="uppercase tracking-wide text-sm mb-2">Our Location</h4>
                  <p className="text-neutral-600 font-light">Skoura Oasis, Ouarzazate Province, Morocco</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-6 text-accent-500">
                  <HiOutlinePhone className="text-2xl" />
                </div>
                <div>
                  <h4 className="uppercase tracking-wide text-sm mb-2">Phone Number</h4>
                  <p className="text-neutral-600 font-light">+212 5XX XXX XXX</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-6 text-accent-500">
                  <HiOutlineMail className="text-2xl" />
                </div>
                <div>
                  <h4 className="uppercase tracking-wide text-sm mb-2">Email Address</h4>
                  <p className="text-neutral-600 font-light">info@bassatineskoura.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-6 text-accent-500">
                  <HiOutlineClock className="text-2xl" />
                </div>
                <div>
                  <h4 className="uppercase tracking-wide text-sm mb-2">Opening Hours</h4>
                  <p className="text-neutral-600 font-light">Front Desk: 24/7</p>
                  <p className="text-neutral-600 font-light">Restaurant: 7:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-neutral-200 pt-10">
              <h4 className="uppercase tracking-wide text-sm mb-6">Follow Us</h4>
              <div className="flex space-x-6">
                {['facebook', 'instagram', 'twitter'].map((platform) => (
                  <a 
                    key={platform}
                    href={`https://${platform}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-neutral-200 w-12 h-12 flex items-center justify-center hover:border-accent-500 transition-colors"
                  >
                    <img 
                      src={`https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/${platform}.svg`} 
                      alt={platform}
                      className="w-5 h-5"
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-sans uppercase font-light tracking-wide mb-10">Send a Message</h3>
            
            <form className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block uppercase text-xs tracking-[0.15em] text-neutral-600 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full border border-neutral-300 p-4 text-neutral-600 focus:outline-none focus:border-accent-500 bg-transparent font-light" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block uppercase text-xs tracking-[0.15em] text-neutral-600 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full border border-neutral-300 p-4 text-neutral-600 focus:outline-none focus:border-accent-500 bg-transparent font-light" 
                    required 
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block uppercase text-xs tracking-[0.15em] text-neutral-600 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full border border-neutral-300 p-4 text-neutral-600 focus:outline-none focus:border-accent-500 bg-transparent font-light" 
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block uppercase text-xs tracking-[0.15em] text-neutral-600 mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full border border-neutral-300 p-4 text-neutral-600 focus:outline-none focus:border-accent-500 bg-transparent font-light" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block uppercase text-xs tracking-[0.15em] text-neutral-600 mb-2">Your Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full border border-neutral-300 p-4 text-neutral-600 focus:outline-none focus:border-accent-500 bg-transparent font-light resize-none" 
                  required
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="border-b border-accent-500 bg-transparent hover:bg-accent-50 text-neutral-800 px-12 py-4 uppercase tracking-[0.15em] text-sm font-light transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection