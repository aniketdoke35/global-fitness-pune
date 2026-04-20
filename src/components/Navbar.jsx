import React from 'react';
import { Dumbbell, Menu } from 'lucide-react';

const Navbar = ({ openAuth }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-bgPrimary/85 backdrop-blur-md border-b border-glassBorder py-4 transition-all">
      <div className="w-full max-w-[1400px] mx-auto px-8 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 font-heading text-2xl font-extrabold tracking-wide">
          <Dumbbell className="text-accentPrimary" size={32} />
          <span className="text-textPrimary">GLOBAL<span className="text-accentPrimary">FITNESS</span></span>
        </a>
        <ul className="hidden lg:flex gap-10 items-center">
          {['Home', 'Media', 'Schedule', 'Pricing'].map(item => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="text-[0.95rem] font-medium uppercase tracking-wide text-textSecondary hover:text-white transition relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accentPrimary transition-all group-hover:w-full"></span>
              </a>
            </li>
          ))}
          <li>
            <button 
              onClick={(e) => { e.preventDefault(); openAuth('login'); }} 
              className="text-[0.95rem] font-medium uppercase tracking-wide text-accentPrimary hover:text-[#b3e600] transition"
            >
              Login
            </button>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => openAuth('join')} 
            className="hidden lg:inline-flex btn-primary px-6 py-3"
          >
            Join Now
          </button>
          <button className="block lg:hidden text-textPrimary">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
