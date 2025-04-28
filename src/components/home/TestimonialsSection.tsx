'use client'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { motion, useInView } from 'framer-motion'
import { HiOutlineChevronRight } from 'react-icons/hi'
import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  {
    text: "Our stay at Bassatine Skoura was nothing short of magical. The authentic Moroccan décor, exceptional service, and breathtaking surroundings made for an unforgettable experience. The staff went above and beyond to make us feel welcome.",
    author: "SARAH JOHNSON",
    location: "London, UK"
  },
  {
    text: "From the moment we arrived, we were treated like royalty. The rooms are stunning, the food is exceptional, and the setting is paradise. If you're looking for an authentic Moroccan luxury experience, look no further than Bassatine Skoura.",
    author: "JEAN-PAUL DUBOIS",
    location: "Paris, France"
  },
  {
    text: "As a frequent traveler to Morocco, I can confidently say that Bassatine Skoura offers one of the most authentic and luxurious experiences in the country. The attention to detail, from the architecture to the service, is impeccable.",
    author: "MICHAEL ZHANG",
    location: "Toronto, Canada"
  },
  {
    text: "The perfect blend of traditional Moroccan charm and modern luxury. The staff made our honeymoon truly special with their personalized service. The rooms are spacious and beautifully decorated. We can't wait to return!",
    author: "ELENA & MARCO ROSSI",
    location: "Milan, Italy"
  }
]

const TestimonialsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-32 bg-neutral-900 text-white">
      <div className="container">
        <div className="text-center mb-16">
          <div className="mb-6 inline-block">
            <p className="text-accent-400 uppercase tracking-[0.2em] text-sm font-light mb-2">Guest Voices</p>
            <div className="h-px w-12 bg-accent-500 mx-auto"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-sans uppercase font-light mb-6 tracking-wide">
            Guest <span className="text-accent-400">Experiences</span>
          </h2>
          
          <p className="text-lg text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
            Discover what our guests have to say about their time at Bassatine Skoura.
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
            spaceBetween={30}
            pagination={{ 
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active bg-accent-500'
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
            className="py-10"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border border-white/10 p-8 h-full flex flex-col"
                >
                  <div className="h-px w-8 bg-accent-500 mb-6"></div>
                  <p className="text-white/90 leading-relaxed mb-8 flex-grow font-light">"{testimonial.text}"</p>
                  <div>
                    <p className="font-medium text-sm tracking-[0.15em]">{testimonial.author}</p>
                    <p className="text-white/60 text-sm mt-1">{testimonial.location}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="flex justify-center mt-12">
            <a href="/testimonials" className="inline-flex items-center text-white/80 hover:text-accent-400 transition-colors duration-300 group">
              <span className="border-b border-white/20 group-hover:border-accent-400 py-2 text-sm uppercase tracking-[0.2em]">View All Guest Stories</span>
              <HiOutlineChevronRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection