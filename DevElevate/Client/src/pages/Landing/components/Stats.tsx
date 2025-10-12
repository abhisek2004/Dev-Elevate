import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Award, Code2 } from 'lucide-react';

const Stats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: Users,
      value: 50,
      label: 'Active Learners',
      suffix: '+',
      gradient: 'from-purple-500 to-blue-500'
    },
    {
      icon: Award,
      value: 50,
      label: 'Success Stories',
      suffix: '+',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code2,
      value: 1000,
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
    <section className="relative py-24" ref={sectionRef}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10"></div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative text-center group"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500`}></div>

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>

              {/* Number */}
              <div className="mb-2 text-4xl font-bold md:text-5xl">
                <span className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {counts[index].toLocaleString()}{stat.suffix}
                </span>
              </div>

              {/* Label */}
              <div className="font-medium text-gray-400">
                {stat.label}
              </div>

              {/* Animated Bar */}
              <div className="w-full h-1 mt-4 overflow-hidden bg-gray-800 rounded-full">
                <div
                  className={`h-full bg-gradient-to-r ${stat.gradient} transition-all duration-1000 ease-out ${isVisible ? 'w-full' : 'w-0'
                    }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-16 text-center">
          <p className="max-w-2xl mx-auto text-xl text-gray-400">
            ⚡ Join the DevElevate movement 💻 where developers transform into industry leaders.  💪
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;