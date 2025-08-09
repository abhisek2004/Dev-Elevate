import React, { useEffect, useRef } from 'react';

const AnimatedCube: React.FC = () => {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    let animationId: number;
    let rotation = 0;

    const animate = () => {
      rotation += 0.5;
      cube.style.transform = `rotateX(${rotation * 0.7}deg) rotateY(${rotation}deg) rotateZ(${rotation * 0.3}deg)`;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  const cubeSize = 'clamp(6rem, 20vw, 10rem)'; // Responsive cube size
  // const faceTransform = 'calc(var(--cube-size) / 2)'; // Used in inline styles

  return (
    <div className="relative flex items-center justify-center h-[60vh] sm:h-[70vh]">
      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Cube Container */}
      <div className="cube-container" style={{ perspective: '1000px' }}>
        <div
          ref={cubeRef}
          className="cube relative"
          style={{
            width: cubeSize,
            height: cubeSize,
            transformStyle: 'preserve-3d',
            '--cube-size': cubeSize,
          } as React.CSSProperties}
        >
          {/* Face Component */}
          {[
            { name: 'DSA', transform: 'translateZ(calc(var(--cube-size) / 2))', colors: 'from-purple-500/30 to-blue-500/30 border-purple-400/50' },
            { name: 'AI/ML', transform: 'translateZ(calc(-1 * var(--cube-size) / 2)) rotateY(180deg)', colors: 'from-blue-500/30 to-cyan-500/30 border-blue-400/50' },
            { name: 'MERN', transform: 'rotateY(90deg) translateZ(calc(var(--cube-size) / 2))', colors: 'from-cyan-500/30 to-green-500/30 border-cyan-400/50' },
            { name: 'Java', transform: 'rotateY(-90deg) translateZ(calc(var(--cube-size) / 2))', colors: 'from-green-500/30 to-yellow-500/30 border-green-400/50' },
            { name: 'Python', transform: 'rotateX(90deg) translateZ(calc(var(--cube-size) / 2))', colors: 'from-yellow-500/30 to-orange-500/30 border-yellow-400/50' },
            { name: 'DevOps', transform: 'rotateX(-90deg) translateZ(calc(var(--cube-size) / 2))', colors: 'from-orange-500/30 to-red-500/30 border-orange-400/50' },
          ].map((face, index) => (
            <div
              key={index}
              className={`cube-face absolute w-full h-full bg-gradient-to-br ${face.colors} backdrop-blur-sm flex items-center justify-center`}
              style={{ transform: face.transform }}
            >
              <div className="text-white font-bold text-sm sm:text-base md:text-lg">
                {face.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-ping"
          style={{
            left: `${50 + Math.sin(i * 30 * Math.PI / 180) * 25}vw`,
            top: `${50 + Math.cos(i * 30 * Math.PI / 180) * 25}vh`,
            animationDelay: `${i * 200}ms`,
            animationDuration: '2s',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedCube;
