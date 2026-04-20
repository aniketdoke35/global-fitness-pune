import React, { useState, useEffect } from 'react';
import { Dumbbell, Activity, CreditCard, Settings, LogOut, Calendar, Clock, MapPin, CheckCircle, FileText, Check } from 'lucide-react';

const MemberDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [gymPlans, setGymPlans] = useState([]);
  
  const [user, setUser] = useState({
    name: 'Rahul Sharma',
    memberId: 'ID-2026-8942',
    joinDate: '2026-04-18',
    expireDate: '2027-04-18',
    plan: 'Yearly Couple Plan',
    status: 'Active',
    checkIns: 4,
    photo: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=ccff00&color=000&size=128'
  });

  useEffect(() => {
    const storedVars = localStorage.getItem('gymPlans');
    if (storedVars && storedVars !== 'null') {
      try { setGymPlans(JSON.parse(storedVars)); } catch(e) {}
    } else {
      setGymPlans([
        { id: 1, type: 'Boys', monthly: 1500, yearly: 15000, features: ['Full Gym Access', 'Locker Room', 'Cardio + Weights', '1 PT Session'] },
        { id: 2, type: 'Girls', monthly: 1400, yearly: 14000, features: ['Full Gym Access', 'Locker Room', 'Zumba / Aerobics', 'Female Trainer'], popular: true },
        { id: 3, type: 'Couple', monthly: 2500, yearly: 25000, features: ['Access for 2 Persons', 'All Classes Included', 'Diet Plan', 'Guest Passes'] }
      ]);
    }
  }, []);

  const getDaysLeft = () => {
    const expire = new Date(user.expireDate).getTime();
    const now = new Date().getTime();
    const diff = expire - now;
    return diff > 0 ? Math.ceil(diff / (1000 * 3600 * 24)) : 0;
  };

  const handleSelectPlan = (planTitle, duration) => {
    const newExpireDate = new Date();
    if (duration === 'Yearly') {
      newExpireDate.setFullYear(newExpireDate.getFullYear() + 1);
    } else {
      newExpireDate.setMonth(newExpireDate.getMonth() + 1);
    }
    
    setUser({
      ...user,
      plan: `${duration} ${planTitle} Plan`,
      expireDate: newExpireDate.toISOString().split('T')[0],
      joinDate: new Date().toISOString().split('T')[0]
    });
    
    alert(`Successfully upgraded to ${duration} ${planTitle} plan!`);
    setActiveTab('dashboard');
  };

  const schedule = [
    { day: 'Today', time: '06:00 PM', class: 'Strength Training', trainer: 'Rahul Desai' },
    { day: 'Tomorrow', time: '07:00 AM', class: 'Yoga Flow', trainer: 'Anjali Sharma' },
    { day: 'Wed', time: '06:30 PM', class: 'HIIT Cardio', trainer: 'Vikram Singh' }
  ];

  const invoices = [
    { id: 'INV-2026-001', date: '2026-04-18', amount: 25000, status: 'Paid', plan: 'Yearly Couple' },
    { id: 'INV-2025-042', date: '2025-04-18', amount: 22000, status: 'Paid', plan: 'Yearly Basic' }
  ];

  return (
    <div className="flex h-screen w-full bg-bgPrimary text-textPrimary font-body overflow-hidden outline-none">
      {/* Sidebar */}
      <aside className="w-64 bg-bgSecondary border-r border-glassBorder flex flex-col print:hidden">
        <div className="h-20 flex items-center px-6 border-b border-glassBorder">
          <a href="/" className="flex items-center gap-3 font-heading text-xl font-extrabold tracking-wide">
            <Dumbbell className="text-accentPrimary" size={24} />
            <span>MEMBER<span className="text-accentPrimary">PORTAL</span></span>
          </a>
        </div>
        
        <div className="p-6 border-b border-glassBorder flex flex-col items-center">
          <img src={user.photo} alt={user.name} className="w-20 h-20 rounded-full border-2 border-accentPrimary mb-3 shadow-[0_0_15px_rgba(204,255,0,0.2)]" />
          <h3 className="font-heading font-bold text-white text-lg">{user.name}</h3>
          <p className="text-textMuted text-xs font-mono">{user.memberId}</p>
          <span className="mt-2 inline-flex px-3 py-1 bg-accentPrimary/10 border border-accentPrimary/20 text-accentPrimary rounded-full text-xs font-bold uppercase tracking-wider">
            {user.status}
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {['Dashboard', 'My Plan', 'Classes', 'Invoices', 'Settings'].map((item) => {
            const tabKey = item.toLowerCase().replace(' ', '');
            return (
            <button 
              key={item}
              onClick={() => setActiveTab(tabKey)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all font-medium ${
                activeTab === tabKey
                ? 'bg-accentPrimary text-black' 
                : 'text-textSecondary hover:bg-glassBorder hover:text-white'
              }`}
            >
              {item === 'Dashboard' && <Activity size={20} />}
              {item === 'My Plan' && <CreditCard size={20} />}
              {item === 'Classes' && <Calendar size={20} />}
              {item === 'Invoices' && <FileText size={20} />}
              {item === 'Settings' && <Settings size={20} />}
              {item}
            </button>
          )})}
        </nav>
        <div className="p-4 border-t border-glassBorder">
          <button onClick={() => window.location.href = '/'} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-textSecondary hover:bg-glassBorder hover:text-red-400 transition-all font-medium">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-bgSecondary border-b border-glassBorder flex items-center justify-between px-8">
          <h2 className="font-heading font-bold text-2xl capitalize hidden md:block">
            {activeTab === 'myplan' ? 'My Subscription Plan' : activeTab}
          </h2>
          <div className="flex items-center gap-4">
            <p className="text-sm text-textSecondary hidden sm:block">Welcome back, <span className="text-white font-bold">{user.name}</span></p>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 relative">
          
          {activeTab === 'dashboard' && (
            <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-bgSecondary border border-glassBorder p-6 rounded-xl flex items-center gap-4 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-accentPrimary/10 border border-accentPrimary/30 flex items-center justify-center text-accentPrimary">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="text-textMuted text-sm font-semibold uppercase tracking-wider mb-1">Visits This Week</p>
                    <h3 className="text-2xl font-heading font-bold text-white">{user.checkIns}</h3>
                  </div>
                </div>
                <div className="bg-bgSecondary border border-glassBorder p-6 rounded-xl flex items-center gap-4 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-accentPrimary/10 border border-accentPrimary/30 flex items-center justify-center text-accentPrimary">
                    <Activity size={24} />
                  </div>
                  <div>
                    <p className="text-textMuted text-sm font-semibold uppercase tracking-wider mb-1">Active Plan</p>
                    <h3 className="text-xl font-heading font-bold text-white truncate" title={user.plan}>{user.plan}</h3>
                  </div>
                </div>
                <div className="bg-bgSecondary border border-glassBorder p-6 rounded-xl flex items-center gap-4 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-textMuted text-sm font-semibold uppercase tracking-wider mb-1">Days Left</p>
                    <h3 className="text-2xl font-heading font-bold text-white">{getDaysLeft()} Days</h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upcoming Classes */}
                <div className="bg-bgSecondary border border-glassBorder rounded-xl overflow-hidden shadow-2xl">
                  <div className="px-6 py-5 border-b border-glassBorder bg-[#0f0f0f]">
                    <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                      <Calendar className="text-accentPrimary" size={20} /> Upcoming Classes
                    </h3>
                  </div>
                  <div className="divide-y divide-glassBorder">
                    {schedule.map((cls, idx) => (
                      <div key={idx} className="p-6 flex items-center justify-between hover:bg-bgPrimary/50 transition-colors group">
                        <div className="flex items-start gap-4">
                          <div className="bg-bgPrimary border border-glassBorder rounded-lg p-2 text-center min-w-[70px] group-hover:border-accentPrimary transition-colors">
                            <p className="text-accentPrimary text-xs font-bold uppercase">{cls.day}</p>
                            <p className="text-white font-bold">{cls.time.split(' ')[0]}</p>
                            <p className="text-textMuted text-[10px]">{cls.time.split(' ')[1]}</p>
                          </div>
                          <div>
                            <h4 className="text-lg font-heading font-bold text-white group-hover:text-amber-50">{cls.class}</h4>
                            <p className="text-textSecondary text-sm flex items-center gap-1 mt-1">
                              <MapPin size={14}/> Main Studio • {cls.trainer}
                            </p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-bgPrimary border border-glassBorder hover:border-accentPrimary hover:bg-accentPrimary/10 rounded text-sm font-semibold text-white transition-all">
                          Book
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Membership Summary */}
                <div className="bg-bgSecondary border border-glassBorder rounded-xl overflow-hidden shadow-2xl relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accentPrimary/5 rounded-bl-full -z-10"></div>
                  <div className="px-6 py-5 border-b border-glassBorder bg-[#0f0f0f]">
                    <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                      <CreditCard className="text-accentPrimary" size={20} /> Membership Details
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl border border-glassBorder p-6 mb-6">
                      <h4 className="text-accentPrimary text-sm font-bold uppercase tracking-widest mb-1">Current Plan</h4>
                      <h2 className="text-3xl font-heading font-extrabold text-white mb-6">{user.plan}</h2>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-textMuted text-xs uppercase tracking-wider mb-1">Joined On</p>
                          <p className="font-mono text-white text-lg">{user.joinDate}</p>
                        </div>
                        <div>
                          <p className="text-textMuted text-xs uppercase tracking-wider mb-1">Expires On</p>
                          <p className="font-mono text-white text-lg">{user.expireDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setActiveTab('myplan')}
                      className="w-full py-3 bg-accentPrimary/10 border border-accentPrimary/50 text-accentPrimary hover:bg-accentPrimary hover:text-black font-bold uppercase tracking-wider rounded-lg transition-colors shadow-[0_0_15px_rgba(204,255,0,0.1)] hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]"
                    >
                      Manage Subscription
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="bg-bgSecondary border border-glassBorder rounded-xl overflow-hidden shadow-2xl max-w-5xl mx-auto animate-fade-in-up">
              <div className="px-6 py-5 border-b border-glassBorder bg-[#0f0f0f]">
                <h3 className="font-heading font-bold text-xl text-white">Payment History</h3>
                <p className="text-textMuted text-sm">Review your past transactions.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#141414] border-b border-glassBorder text-textMuted text-xs font-bold uppercase tracking-widest">
                      <th className="px-6 py-4">Invoice ID</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Plan Billed</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-glassBorder">
                    {invoices.map(bill => (
                      <tr key={bill.id} className="hover:bg-bgPrimary/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-accentPrimary">{bill.id}</td>
                        <td className="px-6 py-4 text-textSecondary">{bill.date}</td>
                        <td className="px-6 py-4 text-white font-medium">{bill.plan}</td>
                        <td className="px-6 py-4 font-bold text-white tracking-wide font-mono">₹{bill.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                            bill.status === 'Paid' ? 'bg-[#ccff00]/10 text-[#ccff00] border-[#ccff00]/20' : 
                            'bg-orange-500/10 text-orange-400 border-orange-500/20'
                          }`}>
                            {bill.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'myplan' && (
            <div className="max-w-6xl mx-auto animate-fade-in-up">
              <div className="mb-8">
                <h3 className="text-2xl font-heading font-bold text-white">Upgrade or Change Plan</h3>
                <p className="text-textSecondary mt-1">Select a new plan to continue your fitness journey with us.</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {gymPlans.map((plan) => (
                  <div key={plan.id} className={`relative bg-bgSecondary border rounded-2xl p-8 flex flex-col justify-between transition-transform hover:-translate-y-2 ${plan.popular ? 'border-accentPrimary shadow-[0_0_20px_rgba(204,255,0,0.15)] bg-gradient-to-b from-[#141414] to-accentPrimary/5' : 'border-glassBorder'}`}>
                    {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accentPrimary text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">Most Popular</div>}
                    
                    <div>
                      <h3 className="text-2xl text-center mb-4 font-heading font-bold text-white">{plan.type}</h3>
                      <div className="text-center mb-6">
                        <span className="text-xl align-top text-accentPrimary font-bold">₹</span>
                        <span className="text-5xl font-extrabold font-heading leading-none text-white">{plan.monthly}</span>
                        <span className="text-textMuted text-sm block mt-2">/ month</span>
                      </div>
                      <div className="border-t border-glassBorder my-6"></div>
                      <ul className="mb-8 space-y-3">
                        {plan.features?.map((feat, i) => (
                          <li key={i} className="flex items-start gap-3 text-textSecondary text-sm">
                            <Check className="text-accentPrimary flex-shrink-0 mt-0.5" size={16} />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <button 
                        onClick={() => handleSelectPlan(plan.type, 'Monthly')}
                        disabled={user.plan === `Monthly ${plan.type} Plan`}
                        className={`py-3 rounded-lg font-bold transition-colors ${
                          user.plan === `Monthly ${plan.type} Plan` 
                          ? 'bg-glassBorder text-textMuted cursor-not-allowed' 
                          : 'border border-accentPrimary text-accentPrimary hover:bg-accentPrimary hover:text-black shadow-[0_0_10px_rgba(204,255,0,0.1)]'
                        }`}
                      >
                        {user.plan === `Monthly ${plan.type} Plan` ? 'Current' : 'Monthly'}
                      </button>
                      <button 
                        onClick={() => handleSelectPlan(plan.type, 'Yearly')}
                        disabled={user.plan === `Yearly ${plan.type} Plan`}
                        className={`py-3 rounded-lg font-bold transition-colors ${
                          user.plan === `Yearly ${plan.type} Plan` 
                          ? 'bg-glassBorder text-textMuted cursor-not-allowed' 
                          : 'bg-accentPrimary text-black hover:bg-[#b3e600] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                        }`}
                      >
                        {user.plan === `Yearly ${plan.type} Plan` ? 'Current' : `₹${plan.yearly}/yr`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(!['dashboard', 'invoices', 'myplan'].includes(activeTab)) && (
            <div className="flex flex-col items-center justify-center h-full text-textMuted max-h-[80vh] animate-fade-in-up">
              <Settings size={48} className="mb-4 opacity-50" />
              <h2 className="text-2xl font-heading font-bold text-white mb-2 capitalize">{activeTab.replace('my', 'My ')} Section</h2>
              <p>This module is currently being updated by our team. Check back later!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MemberDashboard;
