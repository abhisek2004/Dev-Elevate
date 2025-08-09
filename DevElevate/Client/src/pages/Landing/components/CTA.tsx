import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl blur-3xl"></div>
        
        <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Start Your Journey Today</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Ready to Transform
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Your Tech Career?
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 50,000+ developers who are already learning, growing, and landing their dream jobs with DevElevate's AI-powered platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="group bg-gradient-to-r from-purple-500 to-blue-500 text-white px-12 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              <span>Start Learning Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="bg-white/5 backdrop-blur-sm border border-white/10 text-white px-12 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
              Book a Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Free 7-day trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;