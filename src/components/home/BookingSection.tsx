'use client'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { addDays, format } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css"
import { motion } from 'framer-motion'

const BookingSection = () => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)

  const handleCheckInChange = (date: Date | null) => {
    setCheckInDate(date)
    if (date && (!checkOutDate || checkOutDate <= date)) {
      setCheckOutDate(addDays(date, 1))
    }
  }

  return (
    <section id="booking" className="py-32 bg-neutral-50">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white p-10 md:p-16 max-w-5xl mx-auto"
        >
          <div className="mb-10 text-center">
            <div className="mb-6 inline-block">
              <p className="text-accent-500 uppercase tracking-[0.2em] text-sm font-light mb-2">Reservations</p>
              <div className="h-px w-12 bg-accent-500 mx-auto"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-sans uppercase font-light mb-6 tracking-wide">
              Book Your <span className="text-accent-500">Stay</span>
            </h2>
          </div>
          
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Check-in Date */}
              <div className="calendar-wrapper">
                <label htmlFor="check-in" className="block uppercase text-xs tracking-[0.15em] text-neutral-600 mb-2">Check In</label>
                <DatePicker
                  id="check-in"
                  selected={checkInDate}
                  onChange={handleCheckInChange}
                  selectsStart
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={new Date()}
                  placeholderText="Select date"
                  className="w-full border border-neutral-300 p-4 text-neutral-600 focus:outline-none focus:border-accent-500 bg-transparent font-light"
                />
              </div>
              
              {/* Check-out Date */}
              <div className="calendar-wrapper">
                <label htmlFor="check-out" className="block uppercase text-xs tracking-[0.15em] text-neutral-600 mb-2">Check Out</label>
                <DatePicker
                  id="check-out"
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  selectsEnd
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={checkInDate ? addDays(checkInDate, 1) : new Date()}
                  placeholderText="Select date"
                  className="w-full border border-neutral-300 p-4 text-neutral-600 focus:outline-none focus:border-accent-500 bg-transparent font-light"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Adults */}
              <div>
                <label htmlFor="adults" className="block uppercase text-xs tracking-[0.15em] text-neutral-600 mb-2">Adults</label>
                <select 
                  id="adults" 
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full border border-neutral-300 p-4 text-neutral-600 focus:outline-none focus:border-accent-500 bg-transparent font-light appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                  ))}
                </select>
              </div>
              
              {/* Children */}
              <div>
                <label htmlFor="children" className="block uppercase text-xs tracking-[0.15em] text-neutral-600 mb-2">Children</label>
                <select 
                  id="children" 
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full border border-neutral-300 p-4 text-neutral-600 focus:outline-none focus:border-accent-500 bg-transparent font-light appearance-none"
                >
                  {[0, 1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                  ))}
                </select>
              </div>
              
              {/* Rooms */}
              <div>
                <label htmlFor="rooms" className="block uppercase text-xs tracking-[0.15em] text-neutral-600 mb-2">Rooms</label>
                <select 
                  id="rooms" 
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="w-full border border-neutral-300 p-4 text-neutral-600 focus:outline-none focus:border-accent-500 bg-transparent font-light appearance-none"
                >
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="text-center pt-6">
              <button 
                type="submit" 
                className="border-b border-accent-500 bg-transparent hover:bg-accent-50 text-neutral-800 px-12 py-4 uppercase tracking-[0.15em] text-sm font-light transition-all duration-300"
              >
                Check Availability
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default BookingSection