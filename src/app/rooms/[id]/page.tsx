'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules'
import DatePicker from 'react-datepicker'
import { addDays, format, differenceInDays } from 'date-fns'
import { 
  FaBed, 
  FaUsers, 
  FaBath, 
  FaWifi, 
  FaSnowflake, 
  FaTv, 
  FaCheck, 
  FaWhatsapp,
  FaArrowLeft
} from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'react-datepicker/dist/react-datepicker.css'
import { HiOutlineCalendar, HiOutlineUser } from 'react-icons/hi'

import { getRoomDetails } from '@/lib/api'
import { navigateWithLoading } from '@/lib/navigation'

// Higher quality room images
const roomGalleryImages = {
  'double-room': [
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ],
  'twin-room': [
    "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ],
  'triple-room': [
    "https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ],
  'quadruple-room': [
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1584132905271-512c958d674a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ]
}

const RoomDetailPage = () => {
  const params = useParams()
  const roomId = params.id as string
  
  const [room, setRoom] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [checkInDate, setCheckInDate] = useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  // Number of nights and total cost
  const nightsCount = checkInDate && checkOutDate 
    ? differenceInDays(checkOutDate, checkInDate) 
    : 0
  const totalCost = nightsCount * (room?.price || 0)

  useEffect(() => {
    const fetchRoomData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would fetch from an API
        const roomData = await getRoomDetails(roomId)
        setRoom(roomData)
      } catch (error) {
        console.error('Error fetching room details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (roomId) {
      fetchRoomData()
    }
  }, [roomId])

  const handleCheckInChange = (date: Date | null) => {
    setCheckInDate(date)
    if (date && (!checkOutDate || checkOutDate <= date)) {
      setCheckOutDate(addDays(date, 1))
    }
  }
  
  const handleBookViaWhatsApp = () => {
    if (!room) return;
    
    const checkInDateFormatted = checkInDate ? 
      `${checkInDate.getDate()}/${checkInDate.getMonth() + 1}/${checkInDate.getFullYear()}` : 'Not selected';
    
    const checkOutDateFormatted = checkOutDate ? 
      `${checkOutDate.getDate()}/${checkOutDate.getMonth() + 1}/${checkOutDate.getFullYear()}` : 'Not selected';
    
    const message = `Hello, I would like to book a ${room.name}.\n\n` +
      `Check-in date: ${checkInDateFormatted}\n` +
      `Check-out date: ${checkOutDateFormatted}\n` +
      `Guests: ${adults} adults, ${children} children\n\n` +
      `Please contact me with availability and pricing details.`;
    
    // WhatsApp business number - replace with your hotel's number
    const whatsappNumber = '212600000000'; // Example Moroccan number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-accent-500 border-r-accent-500/60 border-b-accent-500/40 border-l-accent-500/20 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-serif mb-4">Room Not Found</h1>
        <p className="mb-8">The room you are looking for does not exist.</p>
        <button 
          onClick={() => navigateWithLoading('/#rooms')} 
          className="px-6 py-3 bg-accent-600 text-white rounded-md hover:bg-accent-700 transition-colors"
        >
          View All Rooms
        </button>
      </div>
    )
  }
  
  // Get room gallery images or use fallbacks
  const galleryImages = roomGalleryImages[roomId as keyof typeof roomGalleryImages] || [
    room.image,
    "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg",
  ];

  return (
    <div className="bg-neutral-50">
      {/* Spacer div to push content below fixed header */}
      <div className="h-24"></div>
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="relative h-[60vh] md:h-[70vh]">
          <Image 
            src={galleryImages[0]}
            alt={room.name}
            fill
            priority
            quality={95}
            className="object-cover"
          />
        </div>
        
        {/* Back button */}
        <button 
          onClick={() => navigateWithLoading('/rooms')}
          className="absolute top-8 left-8 z-20 bg-white/80 backdrop-blur-sm hover:bg-white text-neutral-800 rounded-full p-3 transition-colors"
          aria-label="Back to rooms"
        >
          <FaArrowLeft className="h-5 w-5" />
        </button>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container relative z-20 -mt-32 md:-mt-36"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h5 className="text-accent-600 uppercase tracking-wider text-sm mb-2">Luxury Accommodation</h5>
                <h1 className="text-3xl md:text-4xl font-serif mb-2">{room.name}</h1>
                <div className="flex items-center text-neutral-600">
                  <FaUsers className="mr-2 text-accent-500" />
                  <span>Up to {room.capacity} guests</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-2xl md:text-3xl text-accent-600 font-serif">
                  ${room.price} <span className="text-lg text-neutral-600 font-sans">/night</span>
                </div>
                <div className="text-sm text-neutral-500 mt-1">Taxes & fees included</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6 text-neutral-700 mb-6 border-t border-b border-neutral-100 py-6">
              <div className="flex items-center">
                <FaUsers className="mr-2 text-accent-500" />
                <span>{room.capacity} Guests</span>
              </div>
              <div className="flex items-center">
                <FaBed className="mr-2 text-accent-500" />
                <span>{room.beds} {room.beds > 1 ? 'Beds' : 'Bed'}</span>
              </div>
              <div className="flex items-center">
                <FaBath className="mr-2 text-accent-500" />
                <span>1 Bathroom</span>
              </div>
              <div className="flex items-center">
                <FaWifi className="mr-2 text-accent-500" />
                <span>Free WiFi</span>
              </div>
              <div className="flex items-center">
                <FaSnowflake className="mr-2 text-accent-500" />
                <span>Air Conditioning</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Room Description */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 bg-white rounded-lg shadow-md p-8"
            >
              <h2 className="text-2xl font-serif mb-6 text-neutral-800">About This Room</h2>
              <p className="text-neutral-700 mb-6 leading-relaxed">
                Our spacious {room.name.toLowerCase()} offers unparalleled comfort for {room.capacity === 2 ? 'couples' : 'group travelers or families'}. 
                {room.id === 'double-room' && " It features a luxurious king-size bed for a peaceful night's sleep and elegant furnishings."}
                {room.id === 'twin-room' && " It features two comfortable single beds and a stylish, modern design throughout."}
                {room.id === 'triple-room' && " It features a large king-size bed for peaceful sleep and a single bed to accommodate a third guest."}
                {room.id === 'quadruple-room' && " It features a king-size bed and two single beds, accommodating up to four guests in comfort and style."}
                The private bathroom is equipped with all modern amenities for a relaxing bathing experience.
              </p>
              <p className="text-neutral-700 mb-6 leading-relaxed">
                With its high-quality facilities and generous space, this room is the perfect choice for a comfortable and unforgettable stay in the heart of Morocco's most enchanting landscapes.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                All rooms include daily housekeeping, complimentary welcome drinks, and free access to our hammam and pool facilities.
              </p>
            </motion.section>
            
            {/* Room Photos */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-serif mb-6 text-neutral-800">Room Gallery</h3>
              <Swiper
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination, EffectFade, Autoplay]}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="rounded-lg overflow-hidden shadow-md"
              >
                {galleryImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="aspect-[16/9] relative">
                      <Image
                        src={image}
                        alt={`${room.name} image ${index + 1}`}
                        fill
                        quality={90}
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.section>
            
            {/* Amenities */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12 bg-white rounded-lg shadow-md p-8"
            >
              <h3 className="text-2xl font-serif mb-6 text-neutral-800">Room Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: <FaSnowflake />, name: 'Air conditioner' },
                  { icon: <FaTv />, name: 'Smart TV' },
                  { icon: <FaWifi />, name: 'High-Speed WiFi' },
                  { icon: <FaCheck />, name: 'Premium Towels' },
                  { icon: <FaCheck />, name: 'Traditional Slippers' },
                  { icon: <FaCheck />, name: 'Hair Dryer' },
                  { icon: <FaCheck />, name: 'Organic Toiletries' },
                  { icon: <FaCheck />, name: 'Espresso Machine' },
                  { icon: <FaCheck />, name: 'In-room Safe' },
                  { icon: <FaCheck />, name: 'Welcome Drink' },
                  { icon: <FaCheck />, name: 'Pet Friendly' },
                  { icon: <FaCheck />, name: 'Mini Refrigerator' },
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 border border-neutral-200 rounded-md hover:border-accent-300 transition-colors">
                    <span className="text-accent-500 mr-3">{amenity.icon}</span>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </motion.section>
            
            {/* Room Policies */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <h3 className="text-2xl font-serif mb-6 text-neutral-800">Room Policies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-lg mb-3 text-neutral-800">Check-in & Check-out</h4>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-2">✓</span>
                      Check-in: 2:00 PM - 10:00 PM
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-2">✓</span>
                      Check-out: Until 12:00 PM
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-2">✓</span>
                      Early check-in available upon request
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-3 text-neutral-800">Cancellation Policy</h4>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-2">✓</span>
                      Free cancellation up to 48 hours before arrival
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-2">✓</span>
                      50% charge for cancellations within 48 hours
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-2">✓</span>
                      No refund for no-shows
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>
          </div>
          
          {/* Booking Form */}
          <div className="lg:sticky lg:top-32 h-fit">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
            >
              <h2 className="text-2xl font-serif mb-6 text-neutral-800">Book This Room</h2>
              
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-700 mb-2 font-medium">Check In</label>
                    <div className="relative">
                      <DatePicker
                        selected={checkInDate}
                        onChange={handleCheckInChange}
                        selectsStart
                        startDate={checkInDate}
                        endDate={checkOutDate}
                        minDate={new Date()}
                        placeholderText="Select date"
                        className="w-full border border-neutral-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      />
                      <HiOutlineCalendar className="absolute right-3 top-3 text-neutral-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-neutral-700 mb-2 font-medium">Check Out</label>
                    <div className="relative">
                      <DatePicker
                        selected={checkOutDate}
                        onChange={setCheckOutDate}
                        selectsEnd
                        startDate={checkInDate}
                        endDate={checkOutDate}
                        minDate={checkInDate || new Date()}
                        placeholderText="Select date"
                        className="w-full border border-neutral-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      />
                      <HiOutlineCalendar className="absolute right-3 top-3 text-neutral-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div>
                  <label className="block text-neutral-700 mb-2 font-medium">Adults</label>
                  <div className="relative">
                    <select
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value))}
                      className="w-full border border-neutral-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent appearance-none"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    <HiOutlineUser className="absolute right-3 top-3 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-neutral-700 mb-2 font-medium">Children</label>
                  <div className="relative">
                    <select
                      value={children}
                      onChange={(e) => setChildren(parseInt(e.target.value))}
                      className="w-full border border-neutral-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent appearance-none"
                    >
                      {[0, 1, 2, 3].map((num) => (
                        <option key={num} value={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
                      ))}
                    </select>
                    <HiOutlineUser className="absolute right-3 top-3 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              {/* Price Summary */}
              {checkInDate && checkOutDate && (
                <div className="mb-6 bg-neutral-50 p-4 rounded-md">
                  <h4 className="font-medium mb-3">Price Summary</h4>
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-600">${room.price} x {nightsCount} night{nightsCount !== 1 ? 's' : ''}</span>
                    <span className="font-medium">${totalCost}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-600">Taxes & fees</span>
                    <span className="font-medium">Included</span>
                  </div>
                  <div className="border-t border-neutral-200 mt-3 pt-3 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="text-accent-600 font-medium">${totalCost}</span>
                  </div>
                </div>
              )}
              
              <button 
                onClick={handleBookViaWhatsApp}
                className="w-full bg-accent-600 hover:bg-accent-700 text-white rounded-md py-3 font-medium transition-colors flex items-center justify-center"
              >
                <FaWhatsapp className="mr-2 h-5 w-5" /> Book via WhatsApp
              </button>
            </motion.div>
            
            {/* Additional Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-medium mb-3 text-neutral-800">Why Book Directly?</h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-start">
                  <span className="text-accent-500 mr-2">✓</span>
                  Best rate guarantee
                </li>
                <li className="flex items-start">
                  <span className="text-accent-500 mr-2">✓</span>
                  Flexible cancellation policy
                </li>
                <li className="flex items-start">
                  <span className="text-accent-500 mr-2">✓</span>
                  Personalized service via WhatsApp
                </li>
                <li className="flex items-start">
                  <span className="text-accent-500 mr-2">✓</span>
                  Complimentary welcome drinks
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-neutral-100">
                <button 
                  onClick={() => navigateWithLoading('/rooms')}
                  className="text-accent-600 hover:text-accent-700 font-medium flex items-center"
                >
                  <FaArrowLeft className="mr-2 h-3 w-3" /> Back to all rooms
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetailPage