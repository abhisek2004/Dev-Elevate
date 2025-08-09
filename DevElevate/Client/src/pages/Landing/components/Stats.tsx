import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Award, Code2 } from 'lucide-react';

const Stats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { 
      icon: Users, 
      value: 50000, 
      label: 'Active Learners',
      suffix: '+',
      gradient: 'from-purple-500 to-blue-500'
    },
    { 
      icon: Award, 
      value: 1200, 
      label: 'Success Stories',
      suffix: '+',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Code2, 
      value: 500, 
      label: 'Practice Problems',
      suffix: '+',
      gradient: 'from-cyan-500 to-green-500'
    },
    { 
      icon: TrendingUp, 
      value: 95, 
      label: 'Placement Rate',
      suffix: '%',
      gradient: 'from-green-500 to-yellow-500'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        let start = 0;
        const increment = stat.value / 100;
        const timer = setInterval(() => {
          start += increment;
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.min(Math.floor(start), stat.value);
            return newCounts;
          });
          if (start >= stat.value) {
            clearInterval(timer);
          }
        }, 20);
      });
    }
  }, [isVisible]);

  return (
    <section className="py-24 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10"></div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center relative"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>

              {/* Number */}
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <span className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {counts[index].toLocaleString()}{stat.suffix}
                </span>
              </div>

              {/* Label */}
              <div className="text-gray-400 font-medium">
                {stat.label}
              </div>

              {/* Animated Bar */}
              <div className="mt-4 w-full bg-gray-800 rounded-full h-1 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${stat.gradient} transition-all duration-1000 ease-out ${
                    isVisible ? 'w-full' : 'w-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of developers who have transformed their careers with DevElevate
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;