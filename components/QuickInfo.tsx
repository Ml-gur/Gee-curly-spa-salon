import React from 'react'
import { MapPin, Clock, Phone, TrendingUp } from 'lucide-react'
import { TikTokIconCompact, InstagramIconCompact } from './SocialMediaIcons'

interface QuickInfoProps {
  selectedLocation: 'kiambu' | 'roysambu'
}

export function QuickInfo({ selectedLocation }: QuickInfoProps) {
  const locations = {
    kiambu: {
      name: 'Kiambu Road Bypass',
      address: 'Next to Pro Swim',
      area: 'Kiambu Road',
      phone: '0715 589 102',
      hours: 'Mon-Sat: 8AM-8PM'
    },
    roysambu: {
      name: 'Roysambu, Lumumba Drive',
      address: 'Flash Building 2nd Floor',
      area: 'Opposite Nairobi Butchery',
      phone: '0700 235 466',
      hours: 'Mon-Sat: 8AM-8PM'
    }
  }

  const currentLocation = locations[selectedLocation]

  return (
    <section className="py-12 bg-gradient-to-br from-electric-pink-light/20 via-teal-mint-light/20 to-deep-purple-light/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-16 h-16 bg-electric-pink/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-20 h-20 bg-teal-mint/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-deep-purple/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container-mobile relative">
        {/* Mobile: 2x2 Grid Layout */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-electric-pink/20 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-gradient-to-r from-electric-pink-light to-electric-pink p-3 rounded-xl shadow-md">
                <MapPin className="w-5 h-5 text-electric-pink-dark" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800 font-inter">{currentLocation.name}</div>
                <div className="text-xs text-gray-600 font-inter">{currentLocation.address}</div>
                <div className="text-xs text-gray-600 font-inter">{currentLocation.area}</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-teal-mint/20 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-gradient-to-r from-teal-mint-light to-teal-mint p-3 rounded-xl shadow-md">
                <Clock className="w-5 h-5 text-teal-mint-dark" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800 font-inter">Opening Hours</div>
                <div className="text-xs text-gray-600 font-inter">{currentLocation.hours}</div>
                <div className="text-xs text-gray-600 font-inter">Sun: 9AM - 6PM</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-sunset-orange/20 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-gradient-to-r from-sunset-orange-light to-sunset-orange p-3 rounded-xl shadow-md">
                <Phone className="w-5 h-5 text-sunset-orange-dark" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800 font-inter">Contact Us</div>
                <div className="text-xs text-gray-600 font-inter">{currentLocation.phone}</div>
                <div className="text-xs text-gray-600 font-inter">Call anytime</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-deep-purple/20 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-gradient-to-r from-deep-purple-light to-deep-purple p-3 rounded-xl shadow-md">
                <TrendingUp className="w-5 h-5 text-deep-purple-dark" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800 font-inter">TikTok Famous</div>
                <div className="text-xs text-gray-600 font-inter">1M+ followers</div>
                <div className="text-xs text-gray-600 font-inter">@gee_curly_salon</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-electric-pink/20 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-electric-pink-light to-electric-pink p-3 rounded-xl shadow-md">
                <MapPin className="w-6 h-6 text-electric-pink-dark" />
              </div>
              <div className="text-left">
                <div className="text-base font-semibold text-gray-800 font-inter">{currentLocation.name}</div>
                <div className="text-sm text-gray-600 font-inter">{currentLocation.address}</div>
                <div className="text-sm text-gray-600 font-inter">{currentLocation.area}</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-teal-mint/20 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-teal-mint-light to-teal-mint p-3 rounded-xl shadow-md">
                <Clock className="w-6 h-6 text-teal-mint-dark" />
              </div>
              <div className="text-left">
                <div className="text-base font-semibold text-gray-800 font-inter">Opening Hours</div>
                <div className="text-sm text-gray-600 font-inter">{currentLocation.hours}</div>
                <div className="text-sm text-gray-600 font-inter">Sunday: 9AM - 6PM</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-sunset-orange/20 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-sunset-orange-light to-sunset-orange p-3 rounded-xl shadow-md">
                <Phone className="w-6 h-6 text-sunset-orange-dark" />
              </div>
              <div className="text-left">
                <div className="text-base font-semibold text-gray-800 font-inter">Contact Us</div>
                <div className="text-sm text-gray-600 font-inter">{currentLocation.phone}</div>
                <div className="text-sm text-gray-600 font-inter">Call anytime</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-deep-purple/20 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-deep-purple-light to-deep-purple p-3 rounded-xl shadow-md">
                <TrendingUp className="w-6 h-6 text-deep-purple-dark" />
              </div>
              <div className="text-left">
                <div className="text-base font-semibold text-gray-800 font-inter">TikTok Famous</div>
                <div className="text-sm text-gray-600 font-inter">1M+ followers</div>
                <div className="text-sm text-gray-600 font-inter">@gee_curly_salon</div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4">
            <a 
              href="https://www.tiktok.com/@gee_curly_salon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/80 hover:bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <TikTokIconCompact className="w-4 h-4" fill="white" />
              </div>
            </a>
            <a 
              href="https://www.instagram.com/gee_curly_salon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/80 hover:bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <InstagramIconCompact className="w-4 h-4" fill="white" />
              </div>
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-2 font-inter">Follow us for daily inspiration</p>
        </div>
      </div>
    </section>
  )
}