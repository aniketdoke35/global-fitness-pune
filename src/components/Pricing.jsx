import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

const defaultPlans = [
  { id: 1, type: 'Boys', monthly: 1500, yearly: 15000, features: ['Full Gym Access', 'Locker Room', 'Cardio + Weights', '1 PT Session'] },
  { id: 2, type: 'Girls', monthly: 1400, yearly: 14000, features: ['Full Gym Access', 'Locker Room', 'Zumba / Aerobics', 'Female Trainer'], popular: true },
  { id: 3, type: 'Couple', monthly: 2500, yearly: 25000, features: ['Access for 2 Persons', 'All Classes Included', 'Diet Plan', 'Guest Passes'] }
];

const Pricing = ({ openAuth }) => {
  const [isYearly, setIsYearly] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('gymPlans');
      if (stored && stored !== 'null' && stored !== 'undefined') {
        try { 
          const parsed = JSON.parse(stored); 
          if(Array.isArray(parsed)) setPlans(parsed);
          else throw new Error();
        } catch(e) {
          setPlans(defaultPlans);
          localStorage.setItem('gymPlans', JSON.stringify(defaultPlans));
        }
      } else {
        setPlans(defaultPlans);
        localStorage.setItem('gymPlans', JSON.stringify(defaultPlans));
      }
    };
    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section id="pricing" className="py-32 max-md:py-20 bg-bgPrimary">
      <div className="w-full max-w-[1400px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-tight bg-gradient-to-br from-white to-textMuted text-transparent bg-clip-text">Membership Offers</h2>
          <p className="mt-4 text-lg text-textSecondary">Choose the best plan that fits your fitness goals.</p>
          
          <div className="flex justify-center items-center gap-4 mt-8">
            <span className={`font-semibold transition-colors ${!isYearly ? 'text-white' : 'text-textSecondary'}`}>Monthly</span>
            <button className="w-16 h-8 bg-bgTertiary rounded-full relative border border-glassBorder cursor-pointer" onClick={() => setIsYearly(!isYearly)}>
              <div className={`absolute top-[3px] left-[4px] w-6 h-6 bg-accentPrimary rounded-full transition-transform ${isYearly ? 'translate-x-[26px]' : ''}`}></div>
            </button>
            <span className={`font-semibold relative transition-colors ${isYearly ? 'text-white' : 'text-textSecondary'}`}>
              Yearly
              <span className="absolute -top-4 -right-[4.5rem] bg-accentPrimary text-black text-xs px-2 py-0.5 rounded font-bold">Save 20%</span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative bg-bgSecondary border rounded-2xl p-8 lg:p-12 transition-transform duration-300 ${plan.popular ? 'border-accentPrimary bg-gradient-to-b from-[#141414] to-accentPrimary/5 scale-105 hover:-translate-y-2' : 'border-glassBorder hover:-translate-y-2'}`}>
              {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accentPrimary text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">Most Popular</div>}
              <h3 className="text-3xl text-center mb-4 font-heading font-bold">{plan.type}</h3>
              <div className="text-center mb-10">
                <span className="text-2xl align-top text-accentPrimary font-bold">₹</span>
                <span className="text-6xl font-extrabold font-heading leading-none">{isYearly ? plan.yearly : plan.monthly}</span>
                <span className="text-textSecondary">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <ul className="mb-10 space-y-4">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-4 text-textSecondary">
                    <Check className="text-accentPrimary flex-shrink-0" size={24} />
                    {feat}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => openAuth('join')}
                className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Pricing;
