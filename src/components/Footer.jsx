import React from 'react';
import { Dumbbell, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bgTertiary pt-20 pb-10 border-t border-glassBorder">
      <div className="w-full max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand/Logo Column */}
          <div className="col-span-1 lg:col-span-1">
            <a href="#" className="flex items-center gap-3 font-heading text-3xl font-extrabold tracking-wide mb-6">
              <Dumbbell className="text-accentPrimary" size={36} />
              <span className="text-textPrimary">GLOBAL<span className="text-accentPrimary">FITNESS</span></span>
            </a>
            <p className="text-textSecondary mb-6 leading-relaxed">
              Premium fitness facility dedicated to pushing your limits and helping you achieve your ultimate body transformation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-bgSecondary border border-glassBorder flex items-center justify-center text-textSecondary hover:bg-accentPrimary hover:text-black hover:border-accentPrimary transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-bgSecondary border border-glassBorder flex items-center justify-center text-textSecondary hover:bg-accentPrimary hover:text-black hover:border-accentPrimary transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-bgSecondary border border-glassBorder flex items-center justify-center text-textSecondary hover:bg-accentPrimary hover:text-black hover:border-accentPrimary transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="col-span-1 lg:col-span-1 lg:ml-8">
            <h4 className="text-xl font-heading font-bold text-white mb-6 uppercase tracking-wider relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accentPrimary rounded-full"></span>
            </h4>
            <ul className="space-y-5 mt-4">
              <li className="flex items-start gap-4 text-textSecondary">
                <MapPin className="text-accentPrimary flex-shrink-0 mt-1" size={24} />
                <span className="leading-relaxed">Global Fitness Center,<br />123 Fitness Avenue, Koregaon Park,<br />Pune, Maharashtra 411001</span>
              </li>
              <li className="flex items-center gap-4 text-textSecondary hover:text-white transition-colors">
                <Phone className="text-accentPrimary flex-shrink-0" size={20} />
                <a href="tel:+919876543210" className="font-medium">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-4 text-textSecondary hover:text-white transition-colors">
                <Mail className="text-accentPrimary flex-shrink-0" size={20} />
                <a href="mailto:info@globalfitnesspune.com" className="font-medium">info@globalfitnesspune.com</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-1 lg:ml-12">
            <h4 className="text-xl font-heading font-bold text-white mb-6 uppercase tracking-wider relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accentPrimary rounded-full"></span>
            </h4>
            <ul className="space-y-4 mt-4">
              <li><a href="#hero" className="text-textSecondary hover:text-accentPrimary flex items-center gap-2 transition-colors before:content-['›'] before:text-accentPrimary before:font-bold">Home</a></li>
              <li><a href="#media" className="text-textSecondary hover:text-accentPrimary flex items-center gap-2 transition-colors before:content-['›'] before:text-accentPrimary before:font-bold">Gym Tour</a></li>
              <li><a href="#schedule" className="text-textSecondary hover:text-accentPrimary flex items-center gap-2 transition-colors before:content-['›'] before:text-accentPrimary before:font-bold">Classes Schedule</a></li>
              <li><a href="#pricing" className="text-textSecondary hover:text-accentPrimary flex items-center gap-2 transition-colors before:content-['›'] before:text-accentPrimary before:font-bold">Membership Plans</a></li>
              <li><a href="/dashboard" className="text-textSecondary hover:text-accentPrimary flex items-center gap-2 transition-colors before:content-['›'] before:text-accentPrimary before:font-bold">Member Dashboard</a></li>
              <li><a href="/admin" className="text-textSecondary hover:text-accentPrimary flex items-center gap-2 transition-colors before:content-['›'] before:text-accentPrimary before:font-bold">Admin Portal</a></li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="text-xl font-heading font-bold text-white mb-6 uppercase tracking-wider relative inline-block">
              Working Hours
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accentPrimary rounded-full"></span>
            </h4>
            <ul className="space-y-4 mt-4">
              <li className="flex justify-between text-textSecondary pb-3 border-b border-glassBorder/50">
                <span>Mon - Fri</span>
                <span className="text-white font-medium">05:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between text-textSecondary pb-3 border-b border-glassBorder/50">
                <span>Saturday</span>
                <span className="text-white font-medium">06:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between text-textSecondary pb-3 border-b border-glassBorder/50">
                <span>Sunday</span>
                <span className="text-accentPrimary font-bold">06:00 AM - 12:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-glassBorder flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-textMuted text-sm font-medium">
            &copy; {new Date().getFullYear()} Global Fitness Pune. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-textMuted font-medium">
            <a href="#" className="hover:text-accentPrimary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accentPrimary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
