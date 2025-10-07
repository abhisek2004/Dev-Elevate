import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      image:
        'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      content:
        'DevElevate transformed my career. The AI study buddy helped me master DSA, and I landed my dream job at Google within 6 months!',
      rating: 5,
    },
    {
      name: 'Alex Rodriguez',
      role: 'Full Stack Developer at Microsoft',
      image:
        'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=400',
      content:
        'The personalized learning paths and mock interviews were game-changers. DevElevate made complex concepts accessible and fun.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'ML Engineer at Tesla',
      image:
        'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400',
      content:
        'The AI/ML curriculum is outstanding. Hands-on projects and real-world applications helped me transition from web dev to ML.',
      rating: 5,
    },
    {
      name: 'Michael Brown',
      role: 'Backend Developer at Amazon',
      image:
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      content:
        'DevElevate’s system design modules and mentorship sessions were key to cracking Amazon’s rigorous interview process.',
      rating: 4,
    },
    {
      name: 'Emily Davis',
      role: 'Data Scientist at Meta',
      image:
        'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      content:
        'The AI-driven analytics and practice problems boosted my confidence. I went from beginner to data scientist in under a year!',
      rating: 5,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950">
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
              Success Stories
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-400">
            Discover how <span className="font-semibold text-blue-400">DevElevate</span> empowered developers to achieve their dream careers
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
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="relative flex-shrink-0 w-full p-8 transition-all duration-500 border rounded-2xl backdrop-blur-md group sm:w-80 md:w-96 bg-black/60 border-white/10 hover:border-blue-500/40"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 102, 255, 0.2)' }}
                  role="article"
                >
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 mb-6 text-blue-400" />

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
                  <p className="mb-6 text-base leading-relaxed text-gray-300">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="object-cover w-12 h-12 border-2 rounded-full border-blue-500/30"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Subtle Glow */}
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r rounded-2xl from-blue-500/10 to-pink-500/10 group-hover:opacity-100"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="relative z-10 max-w-5xl mx-auto mt-24 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="p-10 border shadow-2xl md:p-14 bg-black/50 backdrop-blur-md border-white/10 rounded-3xl"
          >
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-4xl shadow-lg rounded-2xl bg-gradient-to-br from-blue-500 to-pink-500 animate-pulse">
              ⚡
            </div>

            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Join the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
                DevElevate
              </span>{' '}
              Revolution
            </h2>

            <p className="max-w-2xl mx-auto mb-8 text-lg leading-relaxed text-gray-300">
              Be part of a fast-growing community of developers, learners, and innovators.
              Get access to exclusive challenges, leaderboards, and open-source projects — all in one place!
            </p>

            <motion.a
              href="https://forms.gle/AaZmRedsBWvDbaJFA"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 rounded-2xl hover:shadow-pink-500/50"
            >
              🚀 Join the Movement
            </motion.a>

            <p className="mt-6 text-sm text-gray-400">
              Let’s build, learn & grow — together with{' '}
              <span className="font-semibold text-blue-400">DevElevate</span>.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute rounded-full -top-20 left-10 w-72 h-72 bg-blue-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 rounded-full right-10 w-72 h-72 bg-pink-500/10 blur-3xl animate-pulse"></div>
    </section>
  );
};

export default Testimonials;
