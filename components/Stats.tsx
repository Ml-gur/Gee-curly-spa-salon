import React, { useEffect, useState } from 'react'
import { Users, Calendar, Star, Award, Heart, TrendingUp } from 'lucide-react'

export function Stats() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const stats = [
    {
      id: 1,
      number: '1M+',
      label: 'TikTok Followers',
      description: 'Social media community',
      icon: <Users className="w-8 h-8" style={{ color: 'white' }} />,
      bgColor: '#ff1b8d'
    },
    {
      id: 2,
      number: '8+',
      label: 'Years Experience',
      description: 'Professional expertise',
      icon: <Calendar className="w-8 h-8" style={{ color: 'white' }} />,
      bgColor: '#00d4aa'
    },
    {
      id: 3,
      number: '98%',
      label: 'Satisfaction Rate',
      description: 'Happy clients',
      icon: <Star className="w-8 h-8" style={{ color: 'white' }} />,
      bgColor: '#ff6b35'
    },
    {
      id: 4,
      number: '25+',
      label: 'Beauty Services',
      description: 'Complete solutions',
      icon: <Award className="w-8 h-8" style={{ color: 'white' }} />,
      bgColor: '#6c5ce7'
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Aisha Kamau',
      text: 'GeeCurly Salon transformed my hair beautifully! The braiding service was exceptional and Catherine made me feel like royalty.',
      rating: 5,
      location: 'Kiambu Road'
    },
    {
      id: 2,
      name: 'Grace Wanjiku',
      text: 'Best salon in Nairobi! Catherine and her team are so professional. My nails have never looked better. Highly recommend GeeCurly!',
      rating: 5,
      location: 'Roysambu'
    },
    {
      id: 3,
      name: 'Mary Njeri',
      text: 'Amazing hair treatment service! My hair feels so healthy and strong now. The GeeCurly team really knows what they are doing.',
      rating: 5,
      location: 'Karen'
    },
    {
      id: 4,
      name: 'Fatima Hassan',
      text: 'Love coming to GeeCurly Salon! Always leave feeling beautiful and confident. The atmosphere is welcoming and results are perfect.',
      rating: 5,
      location: 'Westlands'
    },
    {
      id: 5,
      name: 'Jane Muthoni',
      text: 'Professional service from start to finish. The wig installation was flawless and looks so natural. Thank you GeeCurly Salon!',
      rating: 5,
      location: 'Kilimani'
    }
  ]

  // Auto-advance testimonials carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section id="stats" style={{ 
      padding: '4rem 0', 
      background: 'linear-gradient(180deg, rgba(255, 232, 244, 0.3) 0%, rgba(224, 250, 246, 0.3) 100%)'
    }}>
      <div className="container-mobile">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 27, 141, 0.2)',
            borderRadius: '9999px',
            padding: '0.5rem 1.5rem',
            marginBottom: '1.5rem'
          }}>
            <TrendingUp style={{ width: '1rem', height: '1rem', color: '#ff1b8d', marginRight: '0.5rem' }} />
            <span style={{ 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#1f2937',
              fontFamily: 'Inter, sans-serif'
            }}>
              Our Achievement
            </span>
          </div>
          
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: '1.5rem',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.2'
          }}>
            Trusted by Thousands of{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ff1b8d 0%, #6c5ce7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Beautiful Women
            </span>
          </h2>
          
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#374151', 
            maxWidth: '32rem', 
            margin: '0 auto',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.6'
          }}>
            Join our community of satisfied clients who trust GeeCurly Salon 
            for their beauty needs and transformation journey across Nairobi.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '4rem' 
        }}>
          {stats.map((stat, index) => (
            <div 
              key={stat.id}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(243, 244, 246, 1)',
                transition: 'all 0.5s ease',
                transform: 'translateY(0px)',
                animationDelay: `${index * 0.1}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)'
                e.currentTarget.style.boxShadow = '0 32px 64px -12px rgba(0, 0, 0, 0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div style={{
                backgroundColor: stat.bgColor,
                width: '4rem',
                height: '4rem',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)'
              }}>
                {stat.icon}
              </div>
              
              <div style={{ 
                fontSize: 'clamp(2.5rem, 4vw, 3rem)', 
                fontWeight: 'bold', 
                color: '#1f2937', 
                marginBottom: '0.5rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                {stat.number}
              </div>
              
              <h3 style={{ 
                fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', 
                fontWeight: '600', 
                color: '#1f2937', 
                marginBottom: '0.5rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                {stat.label}
              </h3>
              
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#4b5563',
                fontFamily: 'Inter, sans-serif'
              }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1.5rem',
          padding: 'clamp(2rem, 4vw, 3rem)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(243, 244, 246, 1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ 
              fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', 
              fontWeight: 'bold', 
              color: '#1f2937', 
              marginBottom: '1rem',
              fontFamily: 'Inter, sans-serif'
            }}>
              What Our Clients Say
            </h3>
            <p style={{ 
              color: '#4b5563',
              fontFamily: 'Inter, sans-serif'
            }}>
              Real reviews from real clients who experienced the GeeCurly Salon difference
            </p>
          </div>

          {/* Animated Testimonial Display */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div 
              style={{ 
                display: 'flex', 
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(-${currentTestimonial * 100}%)`
              }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} style={{ width: '100%', flexShrink: 0, padding: '0 1rem' }}>
                  <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
                    {/* Stars */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          style={{ 
                            width: '1.5rem', 
                            height: '1.5rem', 
                            color: '#fbbf24', 
                            fill: '#fbbf24', 
                            margin: '0 0.25rem' 
                          }} 
                        />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <blockquote style={{ 
                      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', 
                      color: '#374151', 
                      marginBottom: '2rem', 
                      lineHeight: '1.6',
                      fontFamily: 'Inter, sans-serif',
                      fontStyle: 'italic'
                    }}>
                      "{testimonial.text}"
                    </blockquote>
                    
                    {/* Client Info */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #ff1b8d 0%, #00d4aa 100%)',
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)'
                      }}>
                        <Heart style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ 
                          fontWeight: '600', 
                          color: '#1f2937',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          {testimonial.name}
                        </div>
                        <div style={{ 
                          fontSize: '0.875rem', 
                          color: '#4b5563',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                style={{
                  width: index === currentTestimonial ? '2rem' : '0.75rem',
                  height: '0.75rem',
                  borderRadius: '9999px',
                  backgroundColor: index === currentTestimonial ? '#ff1b8d' : '#d1d5db',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (index !== currentTestimonial) {
                    e.currentTarget.style.backgroundColor = '#9ca3af'
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentTestimonial) {
                    e.currentTarget.style.backgroundColor = '#d1d5db'
                  }
                }}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button 
              onClick={() => window.open('https://wa.me/254715589102?text=Hello GeeCurly Salon! I would like to book an appointment based on the great reviews I have seen.', '_blank')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #ff1b8d 0%, #6c5ce7 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                fontWeight: '600',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 40px -5px rgba(0, 0, 0, 0.35)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #d91570 0%, #5a4bd4 100%)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)'
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.25)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #ff1b8d 0%, #6c5ce7 100%)'
              }}
            >
              <span>Join Our Happy Clients</span>
              <Heart style={{ width: '1rem', height: '1rem' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}