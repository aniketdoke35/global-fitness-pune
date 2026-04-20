import React, { useState, useEffect } from 'react';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const defaultFallbackTrainers = [
      { id: 1, name: 'Vikram Singh', role: 'Head Coach', contact: '+91 9876543210', photo: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 2, name: 'Anjali Sharma', role: 'Yoga & Aerobics', contact: '+91 8765432109', photo: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 3, name: 'Rahul Desai', role: 'Strength & Conditioning', contact: '+91 7654321098', photo: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ];

    const fetchTrainers = () => {
      const storedTrainers = localStorage.getItem('gymTrainers');
      if (storedTrainers && storedTrainers !== 'null' && storedTrainers !== 'undefined') {
        try { 
          const parsedT = JSON.parse(storedTrainers); 
          if (Array.isArray(parsedT)) {
            setTrainers(parsedT);
          } else {
            setTrainers(defaultFallbackTrainers);
          }
        } catch(e) {
          setTrainers(defaultFallbackTrainers);
        }
      } else {
        setTrainers(defaultFallbackTrainers);
      }
    };

    fetchTrainers();
    window.addEventListener('storage', fetchTrainers);
    return () => window.removeEventListener('storage', fetchTrainers);
  }, []);

  return (
    <section className="py-20 bg-bgPrimary" id="trainers">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 h-[2px] bg-accentPrimary"></span>
            <span className="text-accentPrimary font-bold tracking-widest uppercase text-sm">Our Experts</span>
            <span className="w-12 h-[2px] bg-accentPrimary"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-6 uppercase">
            Meet Your <span className="text-accentPrimary">Trainers</span>
          </h2>
          <p className="text-textSecondary text-lg">
            Train with the best. Our certified professionals are here to push your limits, guide your journey, and ensure you achieve your fitness goals safely and efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {trainers.map((trainer, index) => (
            <div key={trainer.id || index} className="group relative rounded-2xl overflow-hidden border border-glassBorder hover:border-accentPrimary transition-all duration-300">
              {/* Image Container */}
              <div className="w-full h-[400px] overflow-hidden relative border-b-4 border-transparent group-hover:border-accentPrimary transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src={trainer.photo} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-3xl font-heading font-extrabold text-white mb-1 group-hover:text-accentPrimary transition-colors">{trainer.name}</h3>
                <p className="text-accentPrimary font-bold uppercase tracking-widest text-sm mb-4">{trainer.role}</p>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out delay-100">
                  <span className="text-white font-medium text-sm bg-accentPrimary/20 px-4 py-2 rounded-full border border-accentPrimary/50 backdrop-blur-sm shadow-[0_0_15px_rgba(204,255,0,0.2)]">
                    {trainer.contact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
