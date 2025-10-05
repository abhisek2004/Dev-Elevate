import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'DevElevate transformed my career. The AI study buddy helped me master DSA, and I landed my dream job at Google within 6 months!',
      rating: 5,
    },
    {
      name: 'Alex Rodriguez',
      role: 'Full Stack Developer at Microsoft',
      image: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The personalized learning paths and mock interviews were game-changers. DevElevate made complex concepts accessible and fun.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'ML Engineer at Tesla',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The AI/ML curriculum is outstanding. Hands-on projects and real-world applications helped me transition from web dev to ML.',
      rating: 5,
    },
    {
      name: 'Michael Brown',
      role: 'Backend Developer at Amazon',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'DevElevate’s system design modules and mentorship sessions were key to cracking Amazon’s rigorous interview process.',
      rating: 4,
    },
    {
      name: 'Emily Davis',
      role: 'Data Scientist at Meta',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The AI-driven analytics and practice problems boosted my confidence. I went from beginner to data scientist in under a year!',
      rating: 5,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="overflow-hidden relative py-24 bg-gradient-to-b from-gray-900 to-black" data-aos="fade-up">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Success Stories
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Discover how DevElevate empowered developers to achieve their dream careers
          </p>
        </motion.div>

        {/* Testimonials Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              ref={scrollRef}
              className="flex gap-8"
              animate={{
                x: isPaused ? 0 : ['0%', '-50%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Duplicate for seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  data-aos="fade-right"
                  data-aos-delay={`${(index % testimonials.length) * 120}`}
                  className="flex-shrink-0 p-8 w-full rounded-2xl border backdrop-blur-sm transition-all duration-500 group sm:w-80 md:w-96 bg-black/50 border-white/10 hover:border-purple-500/50"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)' }}
                  role="article"
                  aria-labelledby={`testimonial-${index}`}
                >
                  {/* Quote Icon */}
                  <Quote className="mb-6 w-8 h-8 text-purple-400" />

                  {/* Rating */}
                  <div className="flex mb-4 space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <Star key={i + testimonial.rating} className="w-5 h-5 text-gray-600" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="mb-6 text-base leading-relaxed text-gray-300" id={`testimonial-${index}`}>
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="object-cover w-12 h-12 rounded-full border-2 border-white/20"
                      onError={(e) => (e.target.style.display = 'none')}
                      loading="lazy"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r rounded-2xl opacity-0 transition-opacity duration-500 from-purple-500/10 to-blue-500/10 group-hover:opacity-100"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full filter blur-3xl bg-purple-500/10 -z-10"></div>
        <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full filter blur-3xl bg-blue-500/10 -z-10"></div>
      </div>
    </section>
  );
};

export default Testimonials;
