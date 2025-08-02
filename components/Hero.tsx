import { useState, useEffect } from 'react'
import { Calendar, MessageCircle, Play, Users, TrendingUp, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { TikTokIconCompact } from './SocialMediaIcons'

interface HeroProps {
  selectedLocation: 'kiambu' | 'roysambu'
  onLocationChange: (location: 'kiambu' | 'roysambu') => void
}

export function Hero({ selectedLocation, onLocationChange }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false])

  const locations = {
    kiambu: {
      name: 'Kiambu Road Bypass',
      address: 'Next to Pro Swim',
      phone: '0715 589 102',
      mapLink: 'https://maps.google.com/?q=Kiambu+Road+Bypass+Pro+Swim'
    },
    roysambu: {
      name: 'Roysambu, Lumumba Drive',
      address: 'Opposite Nairobi Butchery, Flash Building 2nd Floor',
      phone: '0700 235 466',
      mapLink: 'https://maps.google.com/?q=Roysambu+Lumumba+Drive+Flash+Building'
    }
  }

  // Authentic GeeCurly Salon hero images
  const heroImages = [
    {
      src: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753876962/Whisk_737cc87c1c_cdszer.jpg',
      alt: 'GeeCurly Salon - Professional hair styling session with expert stylists',
      title: 'Expert Hair Styling',
      description: 'Professional cuts and styling by our skilled artists'
    },
    {
      src: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753876962/Whisk_533d7ba70b_lhwamy.jpg',
      alt: 'GeeCurly Salon - Beautiful natural hair transformation and care',
      title: 'Natural Hair Excellence',
      description: 'Celebrating and enhancing your natural beauty'
    },
    {
      src: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753876961/Whisk_b2404e7d62_k1dqw3.jpg',
      alt: 'GeeCurly Salon - Premium nail care and manicure services',
      title: 'Premium Nail Care',
      description: 'Professional manicure and pedicure services'
    },
    {
      src: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753876961/Whisk_0e91700ddc_ao7phy.jpg',
      alt: 'GeeCurly Salon - Team of professional stylists and happy clients',
      title: 'Team Excellence',
      description: 'Professional team delivering exceptional experiences'
    },
    {
      src: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753876955/Whisk_1b87c9c8a3_mjjj0k.jpg',
      alt: 'GeeCurly Salon - Relaxing salon atmosphere with quality service',
      title: 'Luxurious Experience',
      description: 'Relaxing atmosphere where you feel like royalty'
    }
  ]

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, heroImages.length])

  // Scroll animation for location cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-card-index') || '0')
            setVisibleCards(prev => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    )

    // Observe location cards after component mounts
    setTimeout(() => {
      const cards = document.querySelectorAll('[data-card-index]')
      cards.forEach(card => observer.observe(card))
    }, 100)

    return () => observer.disconnect()
  }, [])

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentImageIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    const newIndex = currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1
    goToSlide(newIndex)
  }

  const goToNext = () => {
    const newIndex = currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1
    goToSlide(newIndex)
  }

  const scrollToBooking = () => {
    const element = document.getElementById('booking')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleWhatsAppContact = () => {
    const phone = locations[selectedLocation].phone
    const message = `Hello GeeCurly Salon! I'd like to book an appointment at your ${locations[selectedLocation].name} location.`
    const whatsappUrl = `https://wa.me/254${phone.slice(1)}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* Hero Section - Clean and Minimal with Image Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-electric-pink/40 via-deep-purple/30 to-black/50"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* TikTok Social Proof Badge with Authentic Logo */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-pink-500/90 to-purple-600/90 backdrop-blur-sm rounded-2xl px-6 py-3">
            <div className="flex items-center space-x-3 text-white">
              {/* Authentic TikTok Logo */}
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <TikTokIconCompact className="w-5 h-5" fill="white" />
              </div>
              <div>
                <div className="font-bold">Trusted by 1M+ on TikTok</div>
                <div className="text-sm opacity-90">@gee_curly_salon</div>
              </div>
              <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">1M+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="mb-6">
            <Sparkles className="w-12 h-12 text-white mx-auto mb-4 animate-pulse" />
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <span className="font-script bg-gradient-to-r from-white via-electric-pink-light to-teal-mint-light bg-clip-text text-transparent">
              GeeCurly Salon
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/95 mb-4 font-inter font-medium">
            Your Beauty, Our Passion
          </p>
          
          <p className="text-xl text-white/90 mb-8 font-inter">
            Now Smarter With AI
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={scrollToBooking}
              className="bg-electric-pink hover:bg-electric-pink-dark text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Now</span>
            </button>
            
            <button
              onClick={handleWhatsAppContact}
              className="bg-teal-mint hover:bg-teal-mint-dark text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Image Indicators */}
          <div className="flex justify-center space-x-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Information Grid Section - Below Hero with 2x1 Grid Layout */}
      <section className="py-16 bg-cream-white">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="font-script bg-gradient-to-r from-electric-pink to-deep-purple bg-clip-text text-[rgba(253,253,253,1)]">
                Choose Your GeeCurly Salon Location
              </span>
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Two convenient locations across Nairobi to serve you better
            </p>
          </div>

          {/* Location Grid - Enhanced Mobile 2x1 Layout */}
          <div className="max-w-6xl mx-auto">
            {/* Mobile: 2x1 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {Object.entries(locations).map(([key, location], index) => (
                <div
                  key={key}
                  data-card-index={index}
                  className={`group relative overflow-hidden rounded-3xl border-2 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                    selectedLocation === key
                      ? 'border-electric-pink bg-gradient-to-br from-electric-pink-light/40 to-teal-mint-light/20 shadow-xl scale-105'
                      : 'border-gray-200 bg-white hover:border-electric-pink-light hover:shadow-lg'
                  } ${
                    visibleCards[index] 
                      ? 'animate-slideInUp opacity-100' 
                      : 'opacity-0'
                  }`}
                  onClick={() => onLocationChange(key as 'kiambu' | 'roysambu')}
                  style={{
                    animationDelay: visibleCards[index] ? `${index * 0.3}s` : '0s'
                  }}
                >
                  {/* Selected indicator */}
                  {selectedLocation === key && (
                    <div className="absolute top-4 right-4 bg-electric-pink text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-pulse">
                      ✓
                    </div>
                  )}
                  
                  <div className="p-6 md:p-8">
                    {/* Location Header */}
                    <div className="flex items-center space-x-4 mb-6">
                      {/* Location Icon */}
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        selectedLocation === key 
                          ? 'bg-electric-pink shadow-lg' 
                          : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-electric-pink-light group-hover:to-electric-pink'
                      }`}>
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          selectedLocation === key ? 'bg-white shadow-inner' : 'bg-white group-hover:bg-white'
                        }`}>
                          <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                            selectedLocation === key ? 'text-electric-pink' : 'text-gray-600 group-hover:text-electric-pink'
                          }`}>
                            {key === 'kiambu' ? 'K' : 'R'}
                          </span>
                        </div>
                      </div>

                      {/* Location Name and Area */}
                      <div className="flex-1 text-left">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors">{location.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${selectedLocation === key ? 'bg-electric-pink animate-pulse' : 'bg-teal-mint'}`}></div>
                          <span className="text-sm md:text-base text-gray-600 font-medium">{location.address.split(',')[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location Address */}
                    <div className="mb-6">
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">{location.address}</p>
                    </div>
                    
                    {/* Info Grid - Mobile optimized */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-3 md:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="text-xs md:text-sm text-gray-500 mb-1 font-medium">Phone</div>
                        <div className="font-bold text-gray-800 text-sm md:text-base">{location.phone}</div>
                      </div>
                      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-3 md:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="text-xs md:text-sm text-gray-500 mb-1 font-medium">Hours</div>
                        <div className="font-bold text-gray-800 text-sm md:text-base">8AM - 8PM</div>
                      </div>
                    </div>

                    {/* Action Buttons - Mobile optimized */}
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={`https://wa.me/254${location.phone.slice(1)}?text=Hello GeeCurly Salon! I'd like to book at ${location.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-teal-mint to-teal-mint-dark hover:from-teal-mint-dark hover:to-teal-mint text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm md:text-base">WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${location.phone}`}
                        className="bg-gradient-to-r from-sunset-orange to-sunset-orange-dark hover:from-sunset-orange-dark hover:to-sunset-orange text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span className="text-sm md:text-base">Call</span>
                      </a>
                    </div>
                  </div>

                  {/* Animated border for selected state */}
                  {selectedLocation === key && (
                    <div className="absolute inset-0 rounded-3xl border-2 border-electric-pink animate-pulse pointer-events-none"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Stats Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center border border-gray-100 transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-electric-pink mb-2">1M+</div>
              <div className="text-sm text-gray-600">TikTok Followers</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center border border-gray-100 transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-teal-mint mb-2">2</div>
              <div className="text-sm text-gray-600">Locations</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center border border-gray-100 transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-sunset-orange mb-2">24/7</div>
              <div className="text-sm text-gray-600">AI Booking</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center border border-gray-100 transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-deep-purple mb-2">5★</div>
              <div className="text-sm text-gray-600">Service Rating</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}