import { useEffect, useState } from 'react';

const MarvelLogo = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let ticking = false;

    const updateScrollY = () => {
      setScrollY(window.scrollY);
      ticking = false;
    };

    const requestScrollUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollY);
        ticking = true;
      }
    };

    const handleScroll = () => {
      requestScrollUpdate();
    };

    const handleResize = () => {
      setIsVisible(window.innerWidth > 0); // Always visible, but can be used for breakpoints
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate transform values based on scroll position
  const scrollProgress = Math.min(scrollY / 1000, 1); // Normalize to 0-1 over 1000px

  // 3D transform calculations
  const rotateX = scrollProgress * 15 - 7.5; // -7.5 to 7.5 degrees
  const rotateY = Math.sin(scrollProgress * Math.PI * 2) * 10; // Oscillating rotation
  const rotateZ = scrollProgress * 5; // 0 to 5 degrees
  const scale = 1 + scrollProgress * 0.1; // Scale from 1 to 1.1
  const translateY = scrollProgress * -50; // Move up as we scroll

  // Opacity and blur effects
  const opacity = Math.max(1 - scrollProgress * 1.5, 0);
  const blur = scrollProgress * 3;

  const transformStyle = {
    transform: `
      perspective(1000px) 
      translateY(${translateY}px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      rotateZ(${rotateZ}deg) 
      scale3d(${scale}, ${scale}, ${scale})
    `,
    opacity: opacity,
    filter: `blur(${blur}px)`,
    transition: 'all 0.1s ease-out'
  };

  return (
    <div
      className="relative z-20"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }} data-id="9ojhk4rfp" data-path="src/components/MarvelLogo.tsx">

      <h1
        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-white mb-6 tracking-wider select-none"
        style={transformStyle} data-id="qrakn5aft" data-path="src/components/MarvelLogo.tsx">

        <span className="relative inline-block" data-id="fsgtgb6az" data-path="src/components/MarvelLogo.tsx">
          <span
            className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(220, 38, 38, 0.5)'
            }} data-id="ws82liu7i" data-path="src/components/MarvelLogo.tsx">

            MARVEL
          </span>
          <span
            className="relative bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 10px rgba(220, 38, 38, 0.3))'
            }} data-id="w5mju0eq0" data-path="src/components/MarvelLogo.tsx">

            MARVEL
          </span>
        </span>
      </h1>
      
      {/* 3D Shadow effect */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          transform: `
            perspective(1000px) 
            translateY(${translateY + 10}px) 
            translateZ(-50px)
            rotateX(${rotateX + 5}deg) 
            rotateY(${rotateY}deg) 
            rotateZ(${rotateZ}deg) 
            scale3d(${scale * 0.95}, ${scale * 0.95}, ${scale * 0.95})
          `,
          opacity: opacity * 0.3,
          filter: `blur(${blur + 5}px)`,
          transition: 'all 0.1s ease-out'
        }} data-id="o4vtloeh1" data-path="src/components/MarvelLogo.tsx">

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-red-900/50 mb-6 tracking-wider" data-id="gofwbsgx7" data-path="src/components/MarvelLogo.tsx">
          MARVEL
        </h1>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none" data-id="e7ep30q03" data-path="src/components/MarvelLogo.tsx">
        {[...Array(6)].map((_, i) =>
        <div
          key={i}
          className="absolute w-2 h-2 bg-red-500 rounded-full opacity-70"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i % 3 * 20}%`,
            transform: `
                translateY(${Math.sin(scrollProgress * Math.PI * 4 + i) * 20}px)
                translateX(${Math.cos(scrollProgress * Math.PI * 3 + i) * 15}px)
                scale(${0.5 + Math.sin(scrollProgress * Math.PI * 2 + i) * 0.5})
              `,
            opacity: opacity * 0.8,
            boxShadow: '0 0 10px rgba(220, 38, 38, 0.6)',
            animation: `float-${i} 3s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`
          }} data-id="vxz1xqqjt" data-path="src/components/MarvelLogo.tsx" />

        )}
      </div>

      <style data-id="pck6jzfo0" data-path="src/components/MarvelLogo.tsx">{`
        @keyframes float-0 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(180deg); } }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-180deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-8px) rotate(90deg); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(-90deg); } }
        @keyframes float-4 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-6px) rotate(270deg); } }
        @keyframes float-5 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-14px) rotate(-270deg); } }
      `}</style>
    </div>);

};

export default MarvelLogo;