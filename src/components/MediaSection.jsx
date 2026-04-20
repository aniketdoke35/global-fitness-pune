import React from 'react';
import { Play } from 'lucide-react';

const MediaSection = () => {
  return (
    <section id="media" className="py-32 max-md:py-20 bg-bgSecondary">
      <div className="w-full max-w-[1400px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-tight bg-gradient-to-br from-white to-textMuted text-transparent bg-clip-text">Gym Experience</h2>
          <p className="mt-4 text-lg text-textSecondary">Take a tour of our premium facility and witness the energy.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col h-full group">
            <div className="bg-cover bg-center rounded-xl flex-grow min-h-[300px] lg:min-h-[400px] relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]" style={{backgroundImage: 'url(/assets/gym1.png)'}}>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <button className="w-20 h-20 bg-accentPrimary rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                  <Play size={40} className="fill-black text-black ml-2" />
                </button>
              </div>
            </div>
            <h3 className="mt-6 text-2xl text-textPrimary font-heading font-bold">Virtual Tour</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[2,3,4,5].map(num => (
              <div key={num} className="bg-cover bg-center rounded-lg min-h-[200px] transition-transform duration-300 hover:scale-[1.03] hover:z-10 hover:shadow-2xl cursor-pointer" 
                   style={{backgroundImage: `url(/assets/gym${num}.png)`}}></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default MediaSection;
