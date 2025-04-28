'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { motion, useInView } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/pagination'

const galleryImages = [
  {
    src: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    alt: "Luxurious hotel suite interior"
  },
  {
    src: "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg",
    alt: "Elegant dining area with Moroccan influences"
  },
  {
    src: "https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg",
    alt: "Serene infinity pool overlooking landscapes"
  },
  {
    src: "https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg",
    alt: "Lush hotel garden with palm trees"
  },
  {
    src: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    alt: "Minimalist hotel lobby with local artifacts"
  },
  {
    src: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
    alt: "Hotel exterior with traditional architecture"
  }
]

const GallerySection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="gallery" className="py-32 bg-neutral-100">
      <div className="container">
        <div className="text-center mb-16">
          <div className="mb-6 inline-block">
            <p className="text-accent-500 uppercase tracking-[0.2em] text-sm font-light mb-2">Visual Journey</p>
            <div className="h-px w-12 bg-accent-500 mx-auto"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-sans uppercase font-light mb-6 tracking-wide">
            Property <span className="text-accent-500">Gallery</span>
          </h2>
          
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto font-light leading-relaxed">
            Take a visual journey through our luxurious hotel and get a glimpse of the experiences 
            awaiting you at Bassatine Skoura.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            pagination={{ 
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active bg-accent-500'
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="py-10"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="overflow-hidden group"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm uppercase tracking-wide">
                        {image.alt}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default GallerySection