import React from 'react';

const TechStack: React.FC = () => {
  const technologies = [
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  ];

  return (
    <section id="learning" className="relative py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Technologies We Cover
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Master the most in-demand technologies with our comprehensive curriculum
          </p>
        </div>

        {/* Tech Logos Centered */}
        <div className="flex flex-wrap gap-8 justify-center">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 space-y-4 rounded-xl border backdrop-blur-sm transition-all duration-300 group bg-black/30 border-white/10 hover:border-purple-500/30 hover:transform hover:scale-110"
            >
              <div className="flex justify-center items-center w-16 h-16">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="object-contain w-full h-full filter brightness-75 transition-all duration-300 group-hover:brightness-100"
                />
              </div>
              <span className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-white">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Learning Paths */}
        <div className="grid gap-6 mt-20 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Frontend Development', skills: ['React', 'Vue', 'Angular', 'TypeScript'], color: 'purple' },
            { title: 'Backend Development', skills: ['Node.js', 'Express', 'Python', 'Java'], color: 'blue' },
            { title: 'Database & Cloud', skills: ['MongoDB', 'PostgreSQL', 'AWS', 'Docker'], color: 'cyan' },
            { title: 'AI/ML & Data Science', skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'], color: 'green' },
          ].map((path, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 bg-black/50 border-white/10 hover:border-purple-500/30"
            >
              <h3 className="mb-4 text-xl font-bold text-white">{path.title}</h3>
              <div className="space-y-2">
                {path.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center space-x-2">
                    <div className={`w-2 h-2 bg-${path.color}-400 rounded-full`}></div>
                    <span className="text-sm text-gray-400">{skill}</span>
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
