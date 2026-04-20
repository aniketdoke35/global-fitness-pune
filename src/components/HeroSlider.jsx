import React, { useState, useEffect } from 'react';

const slides = [
  { image: '/assets/slider1.png', title: 'Push Your Limits', subtitle: 'State-of-the-art facility in Pune' },
  { image: '/assets/slider2.png', title: 'Transform Your Body', subtitle: 'Expert trainers available 24/7' },
  { image: '/assets/slider3.png', title: 'Join The Community', subtitle: 'Group classes and personal training' }
];

const HeroSlider = ({ openAuth }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1)), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-bgPrimary">
      {slides.map((slide, index) => (
        <div key={index} 
             className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 flex items-center ${index === current ? 'opacity-100 z-10' : 'opacity-0'}`}
             style={{ backgroundImage: `url(${slide.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/20 z-[1] max-md:bg-gradient-to-t max-md:from-black/90 max-md:via-black/50 max-md:to-black/30"></div>
          
          <div className="w-full max-w-[1400px] mx-auto px-8 relative z-[2]">
            <div className={`max-w-[800px] text-left transform transition-all duration-700 ease-out delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-[30px] opacity-0'} max-md:text-center max-md:mx-auto max-md:pt-24`}>
              <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] leading-tight text-white mb-4 drop-shadow-2xl uppercase tracking-tight">{slide.title}</h1>
              <p className={`text-[clamp(1.2rem,3vw,1.8rem)] text-textSecondary mb-10 border-l-4 border-accentPrimary pl-4 transition-all duration-700 delay-500 ease-out max-md:border-l-0 max-md:pl-0 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-[30px] opacity-0'}`}>{slide.subtitle}</p>
              <div className={`flex gap-4 max-md:flex-col max-md:items-center transition-all duration-700 delay-700 ease-out ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-[30px] opacity-0'}`}>
                <button onClick={() => openAuth('join')} className="btn-primary">Start Your Journey</button>
                <button onClick={() => { document.getElementById('schedule').scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary">View Classes</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full border-2 border-white/50 transition-all ${index === current ? 'bg-accentPrimary border-accentPrimary scale-125' : 'bg-transparent'}`}></button>
        ))}
      </div>
    </section>
  );
};
export default HeroSlider;
