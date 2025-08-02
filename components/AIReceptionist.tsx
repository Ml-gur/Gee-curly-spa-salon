import { useState, useRef, useEffect } from 'react'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  RefreshCw, 
  ArrowLeft, 
  Sparkles, 
  Phone, 
  MapPin,
  Clock,
  Star,
  Zap,
  Heart,
  Settings,
  User,
  Calendar,
  CheckCircle,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Copy,
  Check
} from 'lucide-react'
import { useBooking } from './booking/BookingContext'

// AI Response Interface with enhanced formatting
interface AIResponse {
  text: string
  type: 'welcome' | 'booking' | 'info' | 'confirmation' | 'escalation' | 'error'
  quickActions?: string[]
  confidence: number
  suggestions?: string[]
  bookingData?: any
  formatted?: boolean
  sections?: ResponseSection[]
}

// Enhanced message structure
interface ResponseSection {
  title?: string
  content: string
  type: 'text' | 'list' | 'info' | 'highlight' | 'booking'
  items?: string[]
  emphasis?: boolean
}

// Message Interface with rich formatting
interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: AIResponse['type']
  quickActions?: string[]
  suggestions?: string[]
  confidence?: number
  bookingData?: any
  sections?: ResponseSection[]
  formatted?: boolean
}

// Customer Memory Interface
interface CustomerMemory {
  id: string
  name?: string
  phone?: string
  email?: string
  preferredServices: string[]
  preferredStylists: string[]
  conversationHistory: string[]
  lastVisit?: Date
  preferredLocation?: 'kiambu' | 'roysambu'
}

// Enhanced Booking Flow State
interface BookingFlowState {
  step: 'greeting' | 'location_selection' | 'service_selection' | 'stylist_selection' | 'date_selection' | 'time_selection' | 'customer_info' | 'confirmation' | 'completed'
  selectedLocation?: 'kiambu' | 'roysambu'
  selectedService?: any
  selectedStylist?: any
  selectedDate?: string
  selectedTime?: string
  customerInfo?: { name: string; phone: string; email?: string }
  notes?: string
}

interface AIReceptionistProps {
  selectedLocation: 'kiambu' | 'roysambu'
}

// GeeCurly Salon Information
const SALON_INFO = {
  name: "GeeCurly Salon",
  tagline: "Your Beauty, Our Passion — Now Smarter With AI",
  socialProof: "Trusted by 1M+ beauty lovers on TikTok",
  tiktokHandle: "@gee_curly_salon",
  locations: {
    kiambu: {
      name: "Kiambu Road Bypass",
      address: "Next to Pro Swim",
      area: "Kiambu Road",
      phone: "0715 589 102",
      whatsapp: "254715589102"
    },
    roysambu: {
      name: "Roysambu, Lumumba Drive",
      address: "Opposite Nairobi Butchery, Flash Building 2nd Floor",
      area: "Roysambu",
      phone: "0700 235 466",
      whatsapp: "254700235466"
    }
  },
  hours: {
    weekdays: "8:00 AM - 8:00 PM",
    sunday: "9:00 AM - 6:00 PM"
  },
  owner: "Sam Karanja"
}

// Text formatting utility
const formatMessage = (text: string): ResponseSection[] => {
  const sections: ResponseSection[] = []
  const lines = text.split('\n').filter(line => line.trim())
  
  let currentSection: ResponseSection | null = null
  let currentList: string[] = []
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    // Check if line is a title (starts with **)
    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      // Finish current section if exists
      if (currentSection) {
        if (currentList.length > 0) {
          currentSection.items = [...currentList]
          currentList = []
        }
        sections.push(currentSection)
      }
      
      // Start new section
      currentSection = {
        title: trimmedLine.slice(2, -2),
        content: '',
        type: 'highlight'
      }
    }
    // Check if line is a list item (starts with • or -)
    else if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
      const item = trimmedLine.replace(/^[•-]\s*/, '')
      currentList.push(item)
      
      if (!currentSection) {
        currentSection = {
          content: '',
          type: 'list'
        }
      } else {
        currentSection.type = 'list'
      }
    }
    // Regular text
    else if (trimmedLine) {
      if (currentList.length > 0 && currentSection) {
        currentSection.items = [...currentList]
        currentList = []
        sections.push(currentSection)
        currentSection = null
      }
      
      if (!currentSection) {
        currentSection = {
          content: trimmedLine,
          type: 'text'
        }
      } else {
        currentSection.content += (currentSection.content ? ' ' : '') + trimmedLine
      }
    }
  }
  
  // Finish last section
  if (currentSection) {
    if (currentList.length > 0) {
      currentSection.items = [...currentList]
    }
    sections.push(currentSection)
  }
  
  return sections
}

// Enhanced customer info parsing
const parseCustomerInfo = (message: string) => {
  const lowerMessage = message.toLowerCase()
  
  // Extract name - look for patterns like "my name is", "name:", "I'm", etc.
  let name = ''
  const namePatterns = [
    /(?:my name is|i am|i'm|name is|name:)\s*([a-z\s]+?)(?:\s*,|\s*phone|\s*email|\s*$)/i,
    /^([a-z\s]+?)(?:\s*,|\s*phone|\s*email)/i
  ]
  
  for (const pattern of namePatterns) {
    const nameMatch = message.match(pattern)
    if (nameMatch && nameMatch[1]) {
      name = nameMatch[1].trim()
      break
    }
  }
  
  // Extract phone - look for Kenyan phone patterns
  let phone = ''
  const phonePatterns = [
    /(?:phone|number|tel|mobile|call)[\s:]*([+]?254\s*[0-9\s-]{8,})/i,
    /(?:phone|number|tel|mobile|call)[\s:]*([0][0-9\s-]{8,})/i,
    /([+]?254\s*[0-9\s-]{8,})/,
    /([0][0-9\s-]{8,})/
  ]
  
  for (const pattern of phonePatterns) {
    const phoneMatch = message.match(pattern)
    if (phoneMatch && phoneMatch[1]) {
      phone = phoneMatch[1].replace(/\s|-/g, '').trim()
      break
    }
  }
  
  // Extract email
  let email = ''
  const emailMatch = message.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i)
  if (emailMatch) {
    email = emailMatch[1].trim()
  }
  
  return {
    name: name || null,
    phone: phone || null,
    email: email || null
  }
}

// Message component for better rendering
const MessageBubble = ({ message, onQuickAction, onCopy }: { 
  message: Message, 
  onQuickAction: (action: string) => void,
  onCopy: (text: string) => void
}) => {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    onCopy(message.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  if (message.sender === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-electric-pink text-white p-4 rounded-2xl rounded-br-md shadow-lg">
          <div className="whitespace-pre-wrap break-words">{message.text}</div>
          <div className="flex items-center justify-end mt-2 space-x-2">
            <span className="text-xs text-white/70">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Bot message with enhanced formatting
  const sections = message.sections || formatMessage(message.text)
  
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-electric-pink to-deep-purple rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Bot className="w-4 h-4 text-white" />
          </div>
          
          <div className="bg-white text-gray-800 p-4 rounded-2xl rounded-bl-md shadow-lg border border-gray-100 flex-1">
            {/* Message content with proper formatting */}
            <div className="space-y-3">
              {sections.map((section, index) => (
                <div key={index}>
                  {section.title && (
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 text-electric-pink mr-2" />
                      {section.title}
                    </h4>
                  )}
                  
                  {section.type === 'list' && section.items ? (
                    <ul className="space-y-1 ml-4">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="text-electric-pink mr-2 mt-1">•</span>
                          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : section.type === 'highlight' ? (
                    <div className="bg-electric-pink-light/50 rounded-lg p-3 border-l-4 border-electric-pink">
                      <p className="text-gray-800 font-medium">{section.content}</p>
                    </div>
                  ) : section.type === 'info' ? (
                    <div className="bg-teal-mint-light/50 rounded-lg p-3 border-l-4 border-teal-mint">
                      <p className="text-gray-800">{section.content}</p>
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  )}
                </div>
              ))}
            </div>
            
            {/* Quick actions */}
            {message.quickActions && message.quickActions.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {message.quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => onQuickAction(action)}
                      className="inline-flex items-center px-3 py-2 bg-electric-pink-light hover:bg-electric-pink text-electric-pink-dark hover:text-white rounded-lg transition-all duration-200 text-sm font-medium border border-electric-pink/20 hover:border-electric-pink transform hover:scale-105"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Message footer */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.confidence && (
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">
                      {Math.round(message.confidence * 100)}% confident
                    </span>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleCopy}
                className="text-gray-400 hover:text-electric-pink transition-colors p-1"
                title="Copy message"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AIReceptionist({ selectedLocation }: AIReceptionistProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationStage, setConversationStage] = useState('greeting')
  const [customerMemory, setCustomerMemory] = useState<CustomerMemory | null>(null)
  const [bookingFlow, setBookingFlow] = useState<BookingFlowState>({ 
    step: 'greeting',
    selectedLocation: selectedLocation 
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { 
    isLoading, 
    addBooking, 
    services, 
    staff, 
    getStaffBySpecialty, 
    getAvailableSlots 
  } = useBooking()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeConversation()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen, isMinimized])

  // Update booking flow when location changes
  useEffect(() => {
    setBookingFlow(prev => ({ ...prev, selectedLocation }))
  }, [selectedLocation])

  // Simple Memory System
  const initializeMemory = (): CustomerMemory => {
    const sessionId = `session_${Date.now()}`
    const memory: CustomerMemory = {
      id: sessionId,
      preferredServices: [],
      preferredStylists: [],
      conversationHistory: [],
      preferredLocation: selectedLocation
    }
    setCustomerMemory(memory)
    return memory
  }

  const updateMemory = (updates: Partial<CustomerMemory>) => {
    if (customerMemory) {
      const updated = { ...customerMemory, ...updates }
      setCustomerMemory(updated)
      localStorage.setItem('geecurly_customer_memory', JSON.stringify(updated))
    }
  }

  // Enhanced AI Intent Analysis
  const analyzeIntent = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    const intents = {
      booking: ['book', 'appointment', 'schedule', 'reserve', 'available'],
      services: ['service', 'treatment', 'hair', 'nails', 'what do you offer'],
      pricing: ['price', 'cost', 'how much', 'rate', 'fee', 'charge'],
      staff: ['staff', 'stylist', 'who', 'team'],
      location: ['where', 'location', 'address', 'direction', 'kiambu', 'roysambu'],
      hours: ['hour', 'time', 'open', 'close', 'when'],
      greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
      confirmation: ['yes', 'confirm', 'proceed', 'book it', 'okay', 'ok'],
      back: ['back', 'previous', 'go back'],
      reset: ['start over', 'reset', 'new conversation', 'restart'],
      date: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'tomorrow', 'today', 'next week'],
      time: ['morning', 'afternoon', 'evening', 'am', 'pm', ':']
    }

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return intent
      }
    }
    
    return 'general'
  }

  const findService = (message: string) => {
    const lowerMessage = message.toLowerCase()
    return services.find(service => 
      lowerMessage.includes(service.name.toLowerCase()) ||
      lowerMessage.includes(service.category.toLowerCase())
    )
  }

  const findStaff = (message: string) => {
    const lowerMessage = message.toLowerCase()
    return staff.find(member => 
      lowerMessage.includes(member.name.toLowerCase()) ||
      lowerMessage.includes(member.role.toLowerCase())
    )
  }

  // Enhanced date parsing
  const parseDate = (message: string) => {
    const lowerMessage = message.toLowerCase()
    const today = new Date()
    
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const foundDay = dayNames.find(day => lowerMessage.includes(day))
    
    if (foundDay) {
      const targetDayIndex = dayNames.indexOf(foundDay)
      const currentDayIndex = today.getDay()
      const daysUntilTarget = (targetDayIndex - currentDayIndex + 7) % 7 || 7
      
      const targetDate = new Date(today)
      targetDate.setDate(today.getDate() + daysUntilTarget)
      return targetDate.toISOString().split('T')[0]
    }
    
    if (lowerMessage.includes('tomorrow')) {
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    }
    
    if (lowerMessage.includes('today')) {
      return today.toISOString().split('T')[0]
    }
    
    return null
  }

  // Enhanced time parsing
  const parseTime = (message: string) => {
    const timeMatch = message.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)/i) || 
                     message.match(/(\d{1,2})\s*(am|pm)/i)
    
    if (timeMatch) {
      return timeMatch[0]
    }
    
    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes('morning')) return '10:00 AM'
    if (lowerMessage.includes('afternoon')) return '2:00 PM'
    if (lowerMessage.includes('evening')) return '6:00 PM'
    
    return null
  }

  // Create formatted response
  const createFormattedResponse = (
    text: string, 
    type: AIResponse['type'], 
    quickActions: string[] = [], 
    confidence = 0.9
  ): AIResponse => {
    return {
      text,
      type,
      quickActions,
      confidence,
      formatted: true,
      sections: formatMessage(text)
    }
  }

  // Enhanced Booking Flow Handler
  const handleBookingFlow = async (message: string, intent: string): Promise<AIResponse> => {
    const lowerMessage = message.toLowerCase()
    const currentLocation = bookingFlow.selectedLocation || selectedLocation

    switch (bookingFlow.step) {
      case 'greeting':
        setBookingFlow(prev => ({ ...prev, step: 'location_selection' }))
        setConversationStage('booking')
        return createFormattedResponse(
          `Perfect! I'd love to help you book at GeeCurly Salon! 🌟

**Choose Your Location:**

**🏢 Kiambu Road Bypass**
Next to Pro Swim
📱 Phone: ${SALON_INFO.locations.kiambu.phone}

**🏢 Roysambu, Lumumba Drive**
Flash Building 2nd Floor
📱 Phone: ${SALON_INFO.locations.roysambu.phone}

Which location works best for you? 📍`,
          'booking',
          ['Kiambu Road', 'Roysambu', 'Current location: ' + (currentLocation === 'kiambu' ? 'Kiambu' : 'Roysambu')],
          1.0
        )

      case 'location_selection':
        let chosenLocation = currentLocation
        if (lowerMessage.includes('kiambu')) {
          chosenLocation = 'kiambu'
        } else if (lowerMessage.includes('roysambu')) {
          chosenLocation = 'roysambu'
        }
        
        setBookingFlow(prev => ({ ...prev, selectedLocation: chosenLocation, step: 'service_selection' }))
        updateMemory({ preferredLocation: chosenLocation })
        
        return createFormattedResponse(
          `Excellent! You've chosen our **${SALON_INFO.locations[chosenLocation].name}** location! ✨

**Our Popular Services:**

• **Hair Styling** - KES 1,500 - 3,500
• **Hair Braiding** - KES 2,000 - 6,000  
• **Hair Treatment** - KES 1,000 - 3,000
• **Nail Services** - KES 500 - 2,000

Which service would you like to book? 🌟`,
          'booking',
          ['Hair Styling', 'Hair Braiding', 'Hair Treatment', 'Nail Services'],
          1.0
        )

      case 'service_selection':
        const detectedService = findService(message)
        if (detectedService) {
          const availableStaff = getStaffBySpecialty(detectedService.category)
          setBookingFlow(prev => ({ ...prev, selectedService: detectedService, step: 'stylist_selection' }))
          
          const staffList = availableStaff.map(stylist => `• **${stylist.name}** - ${stylist.role}`).join('\n')
          
          return createFormattedResponse(
            `Perfect choice! **${detectedService.name}** 💫

**Service Details:**
• Duration: ${detectedService.duration}
• Price: KES ${detectedService.price.min} - ${detectedService.price.max}
• Location: ${SALON_INFO.locations[bookingFlow.selectedLocation!].name}

**Available Stylists:**
${staffList}

Who would you prefer? 👩‍💼`,
            'booking',
            availableStaff.map(s => s.name).concat(['Any available stylist']),
            0.9
          )
        } else {
          return createFormattedResponse(
            `I'd love to help you find the perfect service! Which service interests you?

**Available at GeeCurly Salon:**
• Hair Styling
• Hair Braiding  
• Hair Treatment
• Nail Services

Just click one above or tell me what you're looking for! 💇‍♀️`,
            'booking',
            ['Hair Styling', 'Hair Braiding', 'Hair Treatment', 'Nail Services'],
            0.7
          )
        }

      case 'stylist_selection':
        const detectedStylist = findStaff(message) || 
          (lowerMessage.includes('any') ? getStaffBySpecialty(bookingFlow.selectedService!.category)[0] : null)

        if (detectedStylist) {
          setBookingFlow(prev => ({ ...prev, selectedStylist: detectedStylist, step: 'date_selection' }))
          
          const today = new Date()
          const availableDates = []
          
          for (let i = 1; i <= 7; i++) {
            const date = new Date(today)
            date.setDate(today.getDate() + i)
            availableDates.push({
              date: date.toISOString().split('T')[0],
              displayDate: date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              }),
              dayName: date.toLocaleDateString('en-US', { weekday: 'long' })
            })
          }

          const dateOptions = availableDates.map((d, i) => `${i + 1}. **${d.displayDate}**`).join('\n')
          
          return createFormattedResponse(
            `Perfect! **${detectedStylist.name}** is available at our ${SALON_INFO.locations[bookingFlow.selectedLocation!].name} location! 🌟

**📅 Choose Your Preferred Day:**

${dateOptions}

**How to select:** Tell me your preferred day like:
• "Monday"  
• "Tomorrow"
• "Friday"
• "Day 3"

Which day works best for you? 📅`,
            'booking',
            availableDates.slice(0, 4).map(d => d.dayName),
            0.9
          )
        } else {
          const availableStaff = getStaffBySpecialty(bookingFlow.selectedService!.category)
          const staffOptions = availableStaff.map(stylist => `👩‍💼 **${stylist.name}** - ${stylist.role}`).join('\n')
          
          return createFormattedResponse(
            `Please choose your preferred stylist:

${staffOptions}

Who would you like to book with? ✨`,
            'booking',
            availableStaff.map(s => s.name),
            0.8
          )
        }

      case 'date_selection':
        const selectedDate = parseDate(message)
        
        if (selectedDate) {
          setBookingFlow(prev => ({ ...prev, selectedDate, step: 'time_selection' }))
          
          const dateObj = new Date(selectedDate)
          const displayDate = dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })

          try {
            const slots = await getAvailableSlots(
              selectedDate, 
              bookingFlow.selectedStylist!.id, 
              bookingFlow.selectedService!.durationMinutes || 60
            )

            if (slots.length === 0) {
              return createFormattedResponse(
                `Unfortunately, **${displayDate}** is fully booked. Please choose another day:

**Available alternatives:**
• Tomorrow
• Next Monday  
• Next Tuesday
• Any other day this week

Which day would work better? 📅`,
                'booking',
                ['Tomorrow', 'Next Monday', 'Next Tuesday', 'Show all days'],
                0.8
              )
            }

            const timeSlots = slots.slice(0, 8)
            const timeOptions = timeSlots.map((slot, i) => `${i + 1}. **${slot}**`).join('\n')
            
            return createFormattedResponse(
              `Great choice! **${displayDate}** is available! ⭐

**🕐 Available Time Slots:**

${timeOptions}

**How to select:** Tell me your preferred time like:
• "10am"
• "2:30pm"  
• "Morning"
• "Afternoon"
• "Time 3"

What time works best for you? ⏰`,
              'booking',
              timeSlots.slice(0, 4),
              0.9
            )
          } catch (error) {
            const locationInfo = SALON_INFO.locations[bookingFlow.selectedLocation!]
            return createFormattedResponse(
              `Let me check availability for **${displayDate}** and get back to you! In the meantime, you can contact us directly:

📱 **Call:** ${locationInfo.phone}

What time would you prefer? ⏰`,
              'booking',
              ['Morning (9-12pm)', 'Afternoon (12-5pm)', 'Evening (5-8pm)', 'Call salon'],
              0.7
            )
          }
        } else {
          const dayNumMatch = message.match(/day\s*(\d+)/i)
          if (dayNumMatch) {
            const dayNum = parseInt(dayNumMatch[1])
            if (dayNum >= 1 && dayNum <= 7) {
              const today = new Date()
              const targetDate = new Date(today)
              targetDate.setDate(today.getDate() + dayNum)
              
              setBookingFlow(prev => ({ ...prev, selectedDate: targetDate.toISOString().split('T')[0], step: 'time_selection' }))
              
              const displayDate = targetDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })
              
              return createFormattedResponse(
                `Perfect! You've selected **${displayDate}**! 📅

Now let's choose your time. What time works best for you?

**Popular times:**
• Morning (10am-12pm)
• Afternoon (2pm-5pm)  
• Evening (5pm-7pm)

Just let me know your preference! ⏰`,
                'booking',
                ['10:00 AM', '2:00 PM', '5:00 PM', 'Morning', 'Afternoon'],
                0.9
              )
            }
          }
          
          return createFormattedResponse(
            `Please choose a day for your appointment. You can say:

**📅 Day Options:**
• "Monday" or "Next Monday"
• "Tomorrow"  
• "Friday"
• "Day 2" (for the 2nd available day)

Which day would you prefer? 📅`,
            'booking',
            ['Tomorrow', 'Monday', 'Tuesday', 'Wednesday', 'Friday'],
            0.8
          )
        }

      case 'time_selection':
        const selectedTime = parseTime(message)
        
        if (selectedTime) {
          setBookingFlow(prev => ({ ...prev, selectedTime, step: 'customer_info' }))
          
          const dateObj = new Date(bookingFlow.selectedDate!)
          const displayDate = dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })

          return createFormattedResponse(
            `Excellent! I've reserved **${displayDate}** at **${selectedTime}** for you! 🎉

**📝 Just need your contact details:**

• Your full name
• Phone number  
• Email address (optional)

**Example:** "My name is Sarah Wanjiku, phone 0712345678, email sarah@gmail.com"

Please share your details to complete your GeeCurly Salon booking! 😊`,
            'booking',
            [],
            0.9
          )
        } else {
          const timeNumMatch = message.match(/time\s*(\d+)/i)
          if (timeNumMatch) {
            return createFormattedResponse(
              `Great choice! Let me confirm that time slot for you.

What specific time would you prefer?

**⏰ Available times:**
• 10:00 AM
• 2:00 PM  
• 4:00 PM
• 6:00 PM

Just tell me your preferred time! 😊`,
              'booking',
              ['10:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'],
              0.8
            )
          }
          
          return createFormattedResponse(
            `What time works best for you? You can say:

**⏰ Time Options:**
• "10am" or "10:00 AM"
• "2:30pm"  
• "Morning" (9am-12pm)
• "Afternoon" (12pm-5pm)
• "Evening" (5pm-8pm)

Just let me know your preference! ⏰`,
            'booking',
            ['10:00 AM', '2:00 PM', '5:00 PM', 'Morning', 'Afternoon'],
            0.8
          )
        }

      case 'customer_info':
        // Enhanced customer info parsing
        const customerInfo = parseCustomerInfo(message)
        
        if (customerInfo && customerInfo.name && customerInfo.phone) {
          setBookingFlow(prev => ({ ...prev, customerInfo, step: 'confirmation' }))
          updateMemory({ name: customerInfo.name, phone: customerInfo.phone, email: customerInfo.email })
          
          const dateObj = new Date(bookingFlow.selectedDate!)
          const displayDate = dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          })
          
          return createFormattedResponse(
            `Perfect! **${customerInfo.name}**, I've collected your details! 🌟

**📋 Your Booking Summary:**

• **Service:** ${bookingFlow.selectedService!.name}
• **Stylist:** ${bookingFlow.selectedStylist!.name}
• **Date:** ${displayDate}
• **Time:** ${bookingFlow.selectedTime}
• **Location:** ${SALON_INFO.locations[bookingFlow.selectedLocation!].name}
• **Customer:** ${customerInfo.name}
• **Phone:** ${customerInfo.phone}
${customerInfo.email ? `• **Email:** ${customerInfo.email}` : ''}
• **Estimated Price:** KES ${bookingFlow.selectedService!.price.min} - ${bookingFlow.selectedService!.price.max}

**Ready to confirm your GeeCurly Salon appointment?** 💫`,
            'confirmation',
            ['✅ Confirm Booking', '📝 Add Notes', '🔄 Modify Details', '📞 Call Instead'],
            1.0
          )
        } else {
          // Ask for missing information
          const missingInfo = []
          if (!customerInfo?.name) missingInfo.push('full name')
          if (!customerInfo?.phone) missingInfo.push('phone number')
          
          return createFormattedResponse(
            `I need a bit more information to complete your booking! 📝

**Still need:**
${missingInfo.map(info => `• Your ${info}`).join('\n')}

**Please provide in this format:**
"My name is [Your Name], phone [Your Number]"

**Example:** "My name is Grace Mwangi, phone 0722123456"

${customerInfo?.email ? '' : '\nEmail is optional but helpful for confirmations! 📧'}`,
            'booking',
            [],
            0.8
          )
        }

      case 'confirmation':
        if (intent === 'confirmation' || lowerMessage.includes('confirm') || lowerMessage.includes('book it') || lowerMessage.includes('yes')) {
          // Process the actual booking
          try {
            const bookingData = {
              id: `GC${Date.now()}`, // GeeCurly booking ID
              serviceId: bookingFlow.selectedService!.id,
              staffId: bookingFlow.selectedStylist!.id,
              date: bookingFlow.selectedDate!,
              time: bookingFlow.selectedTime!,
              customerName: bookingFlow.customerInfo!.name,
              customerPhone: bookingFlow.customerInfo!.phone,
              customerEmail: bookingFlow.customerInfo?.email,
              location: bookingFlow.selectedLocation!,
              notes: bookingFlow.notes || '',
              status: 'confirmed',
              createdAt: new Date().toISOString(),
              price: bookingFlow.selectedService!.price.min
            }

            // Add booking to system
            await addBooking(bookingData)
            
            setBookingFlow(prev => ({ ...prev, step: 'completed' }))
            
            const dateObj = new Date(bookingFlow.selectedDate!)
            const displayDate = dateObj.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })
            
            const locationInfo = SALON_INFO.locations[bookingFlow.selectedLocation!]
            
            // Success confirmation with booking details
            return createFormattedResponse(
              `🎉 **BOOKING CONFIRMED!** 🎉

**Your GeeCurly Salon Appointment:**

**📋 Booking Reference:** #${bookingData.id}
**👤 Customer:** ${bookingFlow.customerInfo!.name}
**📞 Phone:** ${bookingFlow.customerInfo!.phone}
**💇‍♀️ Service:** ${bookingFlow.selectedService!.name}
**👩‍💼 Stylist:** ${bookingFlow.selectedStylist!.name}
**📅 Date:** ${displayDate}
**⏰ Time:** ${bookingFlow.selectedTime}
**📍 Location:** ${locationInfo.name}
**💰 Estimated Cost:** KES ${bookingFlow.selectedService!.price.min} - ${bookingFlow.selectedService!.price.max}

**📍 Salon Address:**
${locationInfo.address}
${locationInfo.area}

**📱 Contact Information:**
Phone: ${locationInfo.phone}
WhatsApp: +${locationInfo.whatsapp}

**⚠️ Important Reminders:**
• Please arrive 10 minutes early
• Bring a valid ID
• Cancel 24hrs in advance if needed
• Payment accepted: Cash, M-Pesa, Card

**🌟 Thank you for choosing GeeCurly Salon!**
"Your Beauty, Our Passion — Now Smarter With AI"

Need help? Just ask! 💫`,
              'confirmation',
              ['📞 Call Salon', '📍 Get Directions', '📅 Book Another', '💬 WhatsApp Us'],
              1.0
            )
          } catch (error) {
            console.error('Booking creation failed:', error)
            
            const locationInfo = SALON_INFO.locations[bookingFlow.selectedLocation!]
            return createFormattedResponse(
              `I apologize, but there was an issue processing your booking. Please contact us directly to complete your appointment:

**📞 Call Us Immediately:**
${locationInfo.phone}

**📱 WhatsApp:**
+${locationInfo.whatsapp}

**Your booking details are ready:**
• Service: ${bookingFlow.selectedService!.name}
• Stylist: ${bookingFlow.selectedStylist!.name}
• Date: ${new Date(bookingFlow.selectedDate!).toLocaleDateString()}
• Time: ${bookingFlow.selectedTime}
• Customer: ${bookingFlow.customerInfo!.name}

We apologize for the inconvenience! 🙏`,
              'error',
              ['📞 Call Now', '📱 WhatsApp', '🔄 Try Again'],
              0.9
            )
          }
        } else if (lowerMessage.includes('note') || lowerMessage.includes('add note')) {
          return createFormattedResponse(
            `What additional notes would you like to add to your appointment?

**Common requests:**
• Hair texture/type preferences
• Allergies or sensitivities  
• Special occasion details
• Parking instructions
• Preferred products

Please share any special requests! 📝`,
            'booking',
            [],
            0.9
          )
        } else if (lowerMessage.includes('modify') || lowerMessage.includes('change')) {
          return createFormattedResponse(
            `What would you like to modify?

**You can change:**
• Date & time
• Stylist preference
• Service selection
• Location
• Contact details

Just tell me what you'd like to change! 🔄`,
            'booking',
            ['Change Date', 'Change Time', 'Change Stylist', 'Change Service'],
            0.9
          )
        } else {
          return createFormattedResponse(
            `Would you like to **confirm your booking** or make any changes?

**Your current booking:**
• ${bookingFlow.selectedService!.name} with ${bookingFlow.selectedStylist!.name}
• ${new Date(bookingFlow.selectedDate!).toLocaleDateString()} at ${bookingFlow.selectedTime}
• ${SALON_INFO.locations[bookingFlow.selectedLocation!].name}

**Options:**
• Say "Yes" or "Confirm" to book
• "Add notes" for special requests  
• "Modify" to change details`,
            'confirmation',
            ['✅ Confirm Booking', '📝 Add Notes', '🔄 Modify Details'],
            0.9
          )
        }

      default:
        return createFormattedResponse(
          `I'm here to help you book an appointment at GeeCurly Salon! Let's start fresh.

What service would you like to book? 📅`,
          'booking',
          ['Hair Styling', 'Hair Braiding', 'Hair Treatment', 'Nail Services'],
          0.8
        )
    }
  }

  // AI Response Generation with enhanced formatting
  const generateResponse = async (message: string): Promise<AIResponse> => {
    const intent = analyzeIntent(message)
    const service = findService(message)
    const staff = findStaff(message)

    // Update memory
    if (service && customerMemory) {
      updateMemory({
        preferredServices: [...new Set([...customerMemory.preferredServices, service.name])]
      })
    }
    if (staff && customerMemory) {
      updateMemory({
        preferredStylists: [...new Set([...customerMemory.preferredStylists, staff.name])]
      })
    }

    // Handle booking flow if active
    if (bookingFlow.step !== 'greeting' || intent === 'booking') {
      return await handleBookingFlow(message, intent)
    }

    // Handle other intents with enhanced formatting
    switch (intent) {
      case 'greeting':
        return createFormattedResponse(
          `Hello! 👋 Welcome to **${SALON_INFO.name}**!

*${SALON_INFO.socialProof}* 🌟

I'm your AI beauty assistant, here to help you:
• Book appointments 📅
• Learn about our services 💇‍♀️  
• Meet our expert team 👩‍💼
• Get pricing information 💰
• Find our locations 📍

How can I make you look and feel amazing today?`,
          'welcome',
          ['Book appointment', 'View services', 'Check prices', 'Location info', 'Meet the team', 'Special offers'],
          1.0
        )

      case 'services':
        return createFormattedResponse(
          `**💇‍♀️ GeeCurly Salon Expert Services:**

**💫 Hair Styling**
• Haircut & Styling - KES 1,500 - 3,500
• Professional Blow Dry - KES 1,200 - 2,000

**🎨 Hair Braiding**  
• Box Braids - KES 3,000 - 6,000
• Cornrows - KES 2,000 - 4,000

**✨ Hair Treatment**
• Deep Conditioning - KES 1,500 - 2,500
• Protein Treatment - KES 2,000 - 3,000

**💅 Nail Services**
• Gel Manicure - KES 1,200 - 1,800
• Spa Pedicure - KES 1,500 - 2,000

Which service interests you most? ✨`,
          'info',
          ['Book Hair Styling', 'Book Hair Braiding', 'Book Hair Treatment', 'Book Nail Services', 'View all services', 'Get pricing'],
          0.9
        )

      default:
        return createFormattedResponse(
          `I'm here to help you with **${SALON_INFO.name}**! ✨

*${SALON_INFO.socialProof}*

**I can assist with:**
• 📅 Booking appointments
• 💇‍♀️ Service information  
• 👩‍💼 Meeting our stylists
• 💰 Pricing details
• 📍 Location & directions

What would you like to know? 🌟`,
          'info',
          ['Book appointment', 'View services', 'Meet team', 'Check prices', 'Get location', 'Ask questions'],
          0.7
        )
    }
  }

  const initializeConversation = async () => {
    setIsTyping(true)
    initializeMemory()
    
    setTimeout(async () => {
      try {
        const response = await generateResponse('hello')
        const welcomeMessage: Message = {
          id: '1',
          text: response.text,
          sender: 'bot',
          timestamp: new Date(),
          type: response.type,
          quickActions: response.quickActions,
          confidence: response.confidence,
          sections: response.sections,
          formatted: response.formatted
        }
        setMessages([welcomeMessage])
      } catch (error) {
        console.error('Failed to initialize conversation:', error)
        const errorMessage: Message = {
          id: '1',
          text: `Welcome to ${SALON_INFO.name}! 🏛️\n\n*${SALON_INFO.socialProof}*\n\nI'm here to help you book appointments and answer questions.\n\nHow can I assist you today?`,
          sender: 'bot',
          timestamp: new Date(),
          type: 'welcome',
          sections: formatMessage(`Welcome to ${SALON_INFO.name}! 🏛️\n\n*${SALON_INFO.socialProof}*\n\nI'm here to help you book appointments and answer questions.\n\nHow can I assist you today?`)
        }
        setMessages([errorMessage])
      } finally {
        setIsTyping(false)
      }
    }, 800)
  }

  const sendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    const currentInput = inputText
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Add to conversation history
    if (customerMemory) {
      updateMemory({
        conversationHistory: [...customerMemory.conversationHistory, currentInput]
      })
    }

    setTimeout(async () => {
      try {
        const response = await generateResponse(currentInput)
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.text,
          sender: 'bot',
          timestamp: new Date(),
          type: response.type,
          quickActions: response.quickActions,
          confidence: response.confidence,
          bookingData: response.bookingData,
          sections: response.sections,
          formatted: response.formatted
        }
        
        setMessages(prev => [...prev, botMessage])
        
      } catch (error) {
        console.error('AI processing error:', error)
        const currentLocationInfo = SALON_INFO.locations[selectedLocation]
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `I apologize for the technical issue! Please contact our team:\n\n📱 **Call:** ${currentLocationInfo.phone}\n💬 **WhatsApp:** +${currentLocationInfo.whatsapp}\n\nThey'll provide immediate assistance! 🤝`,
          sender: 'bot',
          timestamp: new Date(),
          type: 'error',
          sections: formatMessage(`I apologize for the technical issue! Please contact our team:\n\n📱 **Call:** ${currentLocationInfo.phone}\n💬 **WhatsApp:** +${currentLocationInfo.whatsapp}\n\nThey'll provide immediate assistance! 🤝`)
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsTyping(false)
      }
    }, 1200)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleQuickAction = (action: string) => {
    setInputText(action)
    setTimeout(() => sendMessage(), 100)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetConversation = () => {
    setMessages([])
    setBookingFlow({ step: 'greeting', selectedLocation })
    setConversationStage('greeting')
    setCustomerMemory(null)
    localStorage.removeItem('geecurly_customer_memory')
    initializeConversation()
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-electric-pink to-deep-purple hover:from-electric-pink-dark hover:to-deep-purple-dark text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 group"
      >
        <div className="relative">
          <Bot className="w-6 h-6 transition-transform group-hover:rotate-12" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-mint rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-mint rounded-full"></div>
        </div>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}>
        
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-electric-pink to-deep-purple p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">GeeCurly Receptionist</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-teal-mint rounded-full animate-pulse"></div>
                  <span className="text-white/90">Online • Ready to help</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isMinimized ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* TikTok Social Proof */}
          {!isMinimized && (
            <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-white font-medium">{SALON_INFO.socialProof}</span>
              </div>
            </div>
          )}
        </div>

        {/* Messages Area */}
        {!isMinimized && (
          <>
            <div className="h-96 overflow-y-auto bg-soft-gray p-4 space-y-6">
              {messages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  message={message} 
                  onQuickAction={handleQuickAction}
                  onCopy={handleCopy}
                />
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-electric-pink to-deep-purple rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-bl-md border border-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-electric-pink rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-teal-mint rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-sunset-orange rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white">
              {/* Navigation Buttons */}
              {bookingFlow.step !== 'greeting' && (
                <div className="flex justify-between mb-3">
                  <button
                    onClick={resetConversation}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Start Over</span>
                  </button>
                </div>
              )}
              
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-electric-pink focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-500 transition-all duration-200"
                  disabled={isTyping}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-gradient-to-r from-electric-pink to-deep-purple hover:from-electric-pink-dark hover:to-deep-purple-dark disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-xl transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              <div className="mt-2 text-center">
                <span className="text-xs text-gray-500">
                  Powered by GeeCurly AI • Always improving for you ✨
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}