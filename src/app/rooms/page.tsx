'use client'
import { useState, useEffect, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getAllRooms, Room } from '@/lib/api'
import { 
  HiOutlineUser, 
  HiOutlineCalendar, 
  HiOutlineHome, 
  HiOutlineUsers, 
  HiOutlineCurrencyDollar, 
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker
} from 'react-icons/hi'

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRoom, setSelectedRoom] = useState('')
  const [checkInDate, setCheckInDate] = useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [formFeedback, setFormFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const roomIdFromUrl = searchParams.get('roomId')
    if (roomIdFromUrl) {
      setSelectedRoom(roomIdFromUrl)
    }
    
    const fetchRooms = async () => {
      setIsLoading(true)
      try {
        const roomsData = await getAllRooms()
        setRooms(roomsData)
      } catch (error) {
        console.error('Error fetching rooms:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchRooms()
  }, [searchParams])
  
  const handleCheckInChange = (date: Date | null) => {
    setCheckInDate(date)
    if (date && (!checkOutDate || checkOutDate <= date)) {
      const nextDay = new Date(date)
      nextDay.setDate(date.getDate() + 1)
      setCheckOutDate(nextDay)
    }
  }
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validation
    if (!name || !email || !selectedRoom || !checkInDate || !checkOutDate) {
      setFormFeedback('Please fill all the required fields')
      setIsSubmitting(false)
      return
    }
    
    // Create message for WhatsApp
    const selectedRoomObj = rooms.find(room => room.id === selectedRoom)
    const roomName = selectedRoomObj ? selectedRoomObj.name : selectedRoom
    
    const checkInDateFormatted = checkInDate ? 
      `${checkInDate.getDate()}/${checkInDate.getMonth() + 1}/${checkInDate.getFullYear()}` : ''
    
    const checkOutDateFormatted = checkOutDate ? 
      `${checkOutDate.getDate()}/${checkOutDate.getMonth() + 1}/${checkOutDate.getFullYear()}` : ''
    
    const message = `Hello, I would like to book a ${roomName}.\n\n` +
      `Check-in date: ${checkInDateFormatted}\n` +
      `Check-out date: ${checkOutDateFormatted}\n` +
      `Guests: ${adults} adults, ${children} children\n\n` +
      `My details:\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Address: ${address}\n\n` +
      `Please contact me with availability and booking details.`
    
    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)
    
    // WhatsApp business number - replace with your hotel's number
    const whatsappNumber = '212600000000' // Example Moroccan number
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank')
    
    setFormFeedback('Redirecting to WhatsApp...')
    
    // Reset form after successful submission
    setTimeout(() => {
      setName('')
      setEmail('')
      setAddress('')
      setCheckInDate(null)
      setCheckOutDate(null)
      setAdults(2)
      setChildren(0)
      setFormFeedback('')
      setIsSubmitting(false)
    }, 2000)
  }
  
  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Spacer div to push content below fixed header */}
      <div className="h-24"></div>
      
      {/* Page Header */}
      <div className="relative bg-neutral-900 py-32 mb-16">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <Image 
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury Moroccan hotel room"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">Our Rooms</h1>
          <p className="max-w-2xl mx-auto text-white/80 text-lg">
            Discover our luxurious rooms, each designed to provide an authentic Moroccan 
            experience with modern comfort and elegance.
          </p>
        </div>
      </div>
      
      <div className="container pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Rooms Display */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <div className="animate-spin h-12 w-12 border-4 border-accent-500 border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {rooms.map((room) => (
                  <motion.div 
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 ${
                      selectedRoom === room.id ? 'ring-2 ring-accent-500' : ''
                    }`}
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image 
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-white text-xl font-semibold">{room.name}</h3>
                            <div className="flex items-center text-white/90 text-sm mt-1">
                              <HiOutlineUsers className="mr-1" /> 
                              <span>Up to {room.capacity} guests</span>
                            </div>
                          </div>
                          <div className="bg-white/90 backdrop-blur-sm text-accent-600 px-3 py-1 text-lg font-medium rounded-sm">
                            ${room.price}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-neutral-600 mb-4">{room.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {room.features.map((feature, idx) => (
                          <span 
                            key={idx} 
                            className="bg-neutral-100 text-neutral-700 px-3 py-1 text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <div className="flex items-center text-neutral-600 text-sm">
                          <HiOutlineHome className="mr-2" />
                          <span>{room.beds} {room.beds > 1 ? 'Beds' : 'Bed'}</span>
                        </div>
                        <Link 
                          href={`/rooms/${room.id}`} 
                          className="text-accent-600 hover:text-accent-700 font-medium text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          {/* Booking Form */}
          <div className="lg:sticky lg:top-32 h-fit">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-serif mb-6">Contact via WhatsApp</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Room Selection */}
                <div className="mb-4">
                  <label className="block text-neutral-700 mb-2 font-medium">Select Room Type*</label>
                  <div className="grid grid-cols-2 gap-2">
                    {isLoading ? (
                      <div className="col-span-2 py-3 text-center text-neutral-500">Loading rooms...</div>
                    ) : (
                      rooms.map((room) => (
                        <button
                          type="button"
                          key={room.id}
                          className={`px-4 py-3 text-left border rounded-md transition-colors ${
                            selectedRoom === room.id
                              ? 'border-accent-500 bg-accent-50 text-accent-700'
                              : 'border-neutral-200 hover:border-accent-300'
                          }`}
                          onClick={() => setSelectedRoom(room.id)}
                        >
                          <div className="font-medium">{room.name}</div>
                          <div className="text-sm text-neutral-600">${room.price}/night</div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
                
                {/* Dates */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-neutral-700 mb-2 font-medium">Check In*</label>
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
                    <label className="block text-neutral-700 mb-2 font-medium">Check Out*</label>
                    <div className="relative">
                      <DatePicker
                        selected={checkOutDate}
                        onChange={setCheckOutDate}
                        selectsEnd
                        startDate={checkInDate}
                        endDate={checkOutDate}
                        minDate={checkInDate}
                        placeholderText="Select date"
                        className="w-full border border-neutral-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      />
                      <HiOutlineCalendar className="absolute right-3 top-3 text-neutral-400" />
                    </div>
                  </div>
                </div>
                
                {/* Guests */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-neutral-700 mb-2 font-medium">Adults*</label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value))}
                      className="w-full border border-neutral-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-700 mb-2 font-medium">Children</label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(parseInt(e.target.value))}
                      className="w-full border border-neutral-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      {[0, 1, 2, 3].map((num) => (
                        <option key={num} value={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="mb-4">
                  <label className="block text-neutral-700 mb-2 font-medium">Full Name*</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full border border-neutral-300 rounded-md py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      required
                    />
                    <HiOutlineUser className="absolute left-3 top-3 text-neutral-400" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-neutral-700 mb-2 font-medium">Email Address*</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full border border-neutral-300 rounded-md py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      required
                    />
                    <HiOutlineMail className="absolute left-3 top-3 text-neutral-400" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-neutral-700 mb-2 font-medium">Address</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address"
                      className="w-full border border-neutral-300 rounded-md py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                    <HiOutlineLocationMarker className="absolute left-3 top-3 text-neutral-400" />
                  </div>
                </div>
                
                {formFeedback && (
                  <div className="mb-4 p-3 bg-accent-50 text-accent-700 rounded-md text-sm">
                    {formFeedback}
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-accent-600 hover:bg-accent-700 text-white rounded-md py-3 font-medium transition-colors flex items-center justify-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <HiOutlinePhone className="mr-2" /> Contact via WhatsApp
                    </>
                  )}
                </button>
              </form>
            </motion.div>
            
            {/* Additional Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6 mt-6"
            >
              <h3 className="text-lg font-medium mb-3">Why Book Directly?</h3>
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 