/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'script': ['Dancing Script', 'cursive'],
      },
      colors: {
        // GeeCurly Modern Color Palette
        'electric-pink': {
          light: '#ffe8f4',
          DEFAULT: '#ff1b8d',
          dark: '#d91570'
        },
        'teal-mint': {
          light: '#e0faf6',
          DEFAULT: '#00d4aa',
          dark: '#00b894'
        },
        'sunset-orange': {
          light: '#fff0ec',
          DEFAULT: '#ff6b35',
          dark: '#e85a2b'
        },
        'deep-purple': {
          light: '#f0efff',
          DEFAULT: '#6c5ce7',
          dark: '#5a4bd4'
        },
        'cream-white': '#fefefe',
        'soft-gray': '#f8f9fa',
        'warm-gray': '#e9ecef',
        
        // Legacy VIP Queens colors (for compatibility)
        'pearl-rose': {
          light: '#faf0f0',
          DEFAULT: '#f4c2c2',
          dark: '#d63384'
        },
        'champagne-silk': {
          light: '#fdf7f0',
          DEFAULT: '#f5e6d3',
          dark: '#d4a574'
        },
        'rose-gold': {
          light: '#f5e8ea',
          DEFAULT: '#e8b4b8',
          dark: '#c7969a'
        },
        'warm-white': '#fefefe',
        'soft-cream': '#faf9f7',
        'gentle-gray': '#f7f7f8',
        
        // Shadcn/UI colors with CSS variables
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      backgroundImage: {
        'geecurly-gradient': 'linear-gradient(135deg, #ffe8f4 0%, #e0faf6 50%, #f0efff 100%)',
        'electric-gradient': 'linear-gradient(135deg, #ff1b8d 0%, #6c5ce7 100%)',
        'mint-gradient': 'linear-gradient(135deg, #e0faf6 0%, #00d4aa 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #fff0ec 0%, #ff6b35 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s infinite',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideInUp': 'slideInUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 27, 141, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 27, 141, 0.6), 0 0 30px rgba(255, 27, 141, 0.4)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        fadeIn: {
          from: { 
            opacity: '0', 
            transform: 'translateY(10px)' 
          },
          to: { 
            opacity: '1', 
            transform: 'translateY(0)' 
          }
        },
        slideInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      }
    }
  },
  plugins: []
}