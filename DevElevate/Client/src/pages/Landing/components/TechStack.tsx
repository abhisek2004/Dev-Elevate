import React from 'react';

const TechStack: React.FC = () => {
  const technologies = [
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
  ];

  return (
    <section id="learning" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Technologies We Cover
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Master the most in-demand technologies with our comprehensive curriculum
          </p>
        </div>

        {/* Tech Logos */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group flex flex-col items-center space-y-4 p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-110"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src={tech.logo} 
                  alt={tech.name}
                  className="w-full h-full object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                />
              </div>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Learning Paths */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Frontend Development', skills: ['React', 'Vue', 'Angular', 'TypeScript'], color: 'purple' },
            { title: 'Backend Development', skills: ['Node.js', 'Express', 'Python', 'Java'], color: 'blue' },
            { title: 'Database & Cloud', skills: ['MongoDB', 'PostgreSQL', 'AWS', 'Docker'], color: 'cyan' },
            { title: 'AI/ML & Data Science', skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'], color: 'green' },
          ].map((path, index) => (
            <div
              key={index}
              className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-4">{path.title}</h3>
              <div className="space-y-2">
                {path.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center space-x-2">
                    <div className={`w-2 h-2 bg-${path.color}-400 rounded-full`}></div>
                    <span className="text-gray-400 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;