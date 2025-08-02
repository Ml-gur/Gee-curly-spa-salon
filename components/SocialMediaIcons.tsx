// Social Media Icons - TikTok SVG and Instagram SVG
// TikTok icons created by Freepik - Flaticon
// Instagram icon using official brand colors

export const TikTokIcon = ({ className = "w-6 h-6", fill = "currentColor" }: { className?: string, fill?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.321 5.562a5.123 5.123 0 01-.443-.258 6.228 6.228 0 01-1.137-.966 6.302 6.302 0 01-1.19-1.742 6.456 6.456 0 01-.398-1.371 6.402 6.402 0 01-.077-.611c-.003-.074-.004-.148-.004-.221V.393h-3.87v13.317c0 .252-.021.502-.063.748a3.635 3.635 0 01-.207.715 3.692 3.692 0 01-.369.65 3.746 3.746 0 01-.516.563 3.755 3.755 0 01-.648.413 3.716 3.716 0 01-.743.237 3.68 3.68 0 01-.797.027 3.729 3.729 0 01-.781-.149 3.745 3.745 0 01-.728-.299 3.718 3.718 0 01-.648-.436 3.741 3.741 0 01-.548-.555 3.695 3.695 0 01-.42-.655 3.656 3.656 0 01-.266-.732 3.629 3.629 0 01-.071-.786 3.671 3.671 0 01.149-.776 3.743 3.743 0 01.297-.727 3.719 3.719 0 01.434-.648 3.741 3.741 0 01.554-.548 3.696 3.696 0 01.653-.419 3.657 3.657 0 01.731-.266 3.63 3.63 0 01.784-.071c.135.009.269.026.401.05v-3.95a6.685 6.685 0 00-.401-.025 7.59 7.59 0 00-1.945.25 7.641 7.641 0 00-1.848.726 7.678 7.678 0 00-1.666 1.154 7.72 7.72 0 00-1.407 1.524 7.746 7.746 0 00-1.094 1.829 7.767 7.767 0 00-.732 2.082 7.78 7.78 0 00-.205 2.285 7.784 7.784 0 00.396 2.248 7.746 7.746 0 00.888 2.128 7.719 7.719 0 001.322 1.91 7.678 7.678 0 001.695 1.604 7.641 7.641 0 001.997 1.216 7.59 7.59 0 002.225.741 7.544 7.544 0 002.386.144 7.59 7.59 0 002.354-.289 7.641 7.641 0 002.25-.811 7.678 7.678 0 002.079-1.287 7.72 7.72 0 001.844-1.708 7.747 7.747 0 001.544-2.074 7.767 7.767 0 001.181-2.381 7.78 7.78 0 00.751-2.637 7.783 7.783 0 00.259-2.84V8.563a10.086 10.086 0 002.358 1.378 10.24 10.24 0 002.66.844v-3.85a6.302 6.302 0 01-1.641-.373z"/>
  </svg>
)

// Instagram Icon using SVG with official Instagram gradient
export const InstagramIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#833ab4" />
        <stop offset="50%" stopColor="#fd1d1d" />
        <stop offset="100%" stopColor="#fcb045" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#instagram-gradient)" />
    <path 
      d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" 
      fill="white"
    />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// Compact TikTok icon for small spaces
export const TikTokIconCompact = ({ className = "w-5 h-5", fill = "white" }: { className?: string, fill?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005.16 20.5a6.33 6.33 0 0010.14-5.02V8.77a8.2 8.2 0 004.77 1.17v-3.24z"/>
  </svg>
)

// Compact Instagram icon for small spaces using SVG
export const InstagramIconCompact = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="instagram-gradient-compact" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#833ab4" />
        <stop offset="50%" stopColor="#fd1d1d" />
        <stop offset="100%" stopColor="#fcb045" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#instagram-gradient-compact)" />
    <path 
      d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" 
      fill="white"
    />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// Alternative simple Instagram icon (monochrome version)
export const InstagramIconSimple = ({ className = "w-6 h-6", fill = "currentColor" }: { className?: string, fill?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
)