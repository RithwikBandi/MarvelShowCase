import MarvelLogo from '@/components/MarvelLogo';

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[70vh] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
      }}>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
      
      {/* Enhanced background with Marvel-themed effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center items-center h-full min-h-[70vh]">
        <div className="text-center">
          <MarvelLogo />
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mt-4">
            Journey into the cosmic depths of the mighty Marvel Cinematic Universe!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;