# GeeCurly Salon - AI-Powered Beauty Experience

**Your Beauty, Our Passion — Now Smarter With AI**

A comprehensive, modern web application for GeeCurly Salon featuring AI-powered customer service, smart booking system, and multi-location management. Trusted by over 1 million beauty lovers on TikTok.

## 🌟 Features

### 🤖 AI-Powered Experience
- **GeeCurly Receptionist**: Smart AI assistant for customer service and bookings
- **Natural Language Processing**: Understands customer preferences and needs
- **Intelligent Booking Flow**: Guides customers through seamless appointment scheduling
- **Real-time Availability**: Smart time slot management across locations

### 📍 Multi-Location Support
- **Kiambu Road Bypass**: Next to Pro Swim (0715 589 102)
- **Roysambu, Lumumba Drive**: Flash Building 2nd Floor (0700 235 466)
- **Location-Specific**: Staff, services, and availability management

### 💼 Business Management
- **Owner Dashboard**: Complete business oversight for Sam Karanja
- **Staff Portals**: Individual appointment and earnings management
- **Analytics & Reporting**: Performance insights and business metrics
- **Real-time Notifications**: Automated customer and staff communications

### 🎨 Modern Design
- **Responsive Design**: Optimized for all devices
- **GeeCurly Branding**: Consistent brand identity with electric pink theme
- **Accessibility**: WCAG compliant with proper contrast ratios
- **Performance**: Optimized for speed and user experience

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: Radix UI + Custom components
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel
- **State Management**: React Context API

## 📱 Services Offered

### Hair Services
- **Hair Styling**: KES 1,500 - 3,500
- **Hair Braiding**: KES 2,000 - 6,000
- **Hair Treatment**: KES 1,000 - 3,000

### Beauty Services
- **Nail Services**: KES 500 - 2,000
- **Specialized Treatments**: Custom pricing

## 🏗️ Installation & Development

### Prerequisites
- Node.js 18+ 
- npm 8+

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd geecurly-salon

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup
```bash
# Create .env.local file
VITE_SALON_NAME="GeeCurly Salon"
VITE_OWNER_NAME="Sam Karanja"
VITE_TIKTOK_HANDLE="@gee_curly_salon"
```

## 📦 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### Manual Deployment
```bash
# Build the project
npm run build

# Upload dist/ folder to your hosting provider
```

## 🎯 Key Components

### AI Receptionist
- **Natural Language Processing**: Understands customer queries
- **Smart Booking**: Complete appointment scheduling workflow
- **Customer Memory**: Remembers preferences and history
- **Multi-Channel Support**: Chat, WhatsApp integration ready

### Booking System
- **Real-time Availability**: Live slot management
- **Staff Scheduling**: Individual stylist calendars
- **Service Categorization**: Organized service offerings
- **Customer Management**: Contact and preference tracking

### Admin Dashboards
- **Owner Portal**: Complete business overview
- **Staff Portal**: Individual performance tracking
- **Analytics**: Revenue, bookings, and performance metrics
- **Notifications**: Automated communication system

## 🔧 Configuration

### Tailwind CSS Custom Theme
```css
:root {
  --electric-pink: #ff1b8d;
  --teal-mint: #00d4aa;
  --sunset-orange: #ff6b35;
  --deep-purple: #6c5ce7;
  --cream-white: #fefefe;
}
```

### Location Configuration
```typescript
const SALON_LOCATIONS = {
  kiambu: {
    name: "Kiambu Road Bypass",
    address: "Next to Pro Swim",
    phone: "0715 589 102",
    whatsapp: "254715589102"
  },
  roysambu: {
    name: "Roysambu, Lumumba Drive", 
    address: "Flash Building 2nd Floor",
    phone: "0700 235 466",
    whatsapp: "254700235466"
  }
}
```

## 🎨 Brand Guidelines

### Colors
- **Primary**: Electric Pink (#ff1b8d)
- **Secondary**: Teal Mint (#00d4aa)
- **Accent**: Sunset Orange (#ff6b35)
- **Support**: Deep Purple (#6c5ce7)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Logo Font**: Dancing Script (Google Fonts)
- **Base Size**: 14px responsive scaling

### Logo Usage
- Always maintain GeeCurly branding
- Use "Your Beauty, Our Passion — Now Smarter With AI" tagline
- Reference TikTok social proof: "Trusted by 1M+ beauty lovers"

## 📊 Performance Optimization

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimization Features
- **Image Optimization**: WebP format with fallbacks
- **Code Splitting**: Dynamic imports for optimal loading
- **Caching**: Service worker implementation ready
- **SEO**: Complete meta tags and schema markup

## 📞 Contact Information

### Business Contact
- **Owner**: Sam Karanja
- **TikTok**: @gee_curly_salon (1M+ followers)
- **Email**: info@geecurly.com

### Locations
1. **Kiambu Road Bypass**
   - Address: Next to Pro Swim
   - Phone: 0715 589 102
   - WhatsApp: +254715589102

2. **Roysambu, Lumumba Drive**
   - Address: Opposite Nairobi Butchery, Flash Building 2nd Floor
   - Phone: 0700 235 466
   - WhatsApp: +254700235466

### Business Hours
- **Monday - Saturday**: 8:00 AM - 8:00 PM
- **Sunday**: 9:00 AM - 6:00 PM

## 📄 License

This project is proprietary software owned by GeeCurly Salon. All rights reserved.

## 🤝 Contributing

This is a private business application. For feature requests or bug reports, please contact the development team.

---

**GeeCurly Salon** - Where technology meets beauty in Nairobi, Kenya. Experience the future of salon services with our AI-powered platform! 🌟💇‍♀️✨