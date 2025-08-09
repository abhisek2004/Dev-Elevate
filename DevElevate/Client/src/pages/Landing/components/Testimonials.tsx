import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'DevElevate transformed my career. The AI study buddy helped me master DSA, and I landed my dream job at Google within 6 months!',
      rating: 5
    },
    {
      name: 'Alex Rodriguez',
      role: 'Full Stack Developer at Microsoft',
      image: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The personalized learning paths and mock interviews were game-changers. The platform is incredibly comprehensive and user-friendly.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'ML Engineer at Tesla',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The AI/ML curriculum is outstanding. The hands-on projects and real-world applications helped me transition from web dev to ML.',
      rating: 5
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hear from developers who transformed their careers with DevElevate
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-500 hover:transform hover:scale-105"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-purple-400 mb-6" />

              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;