import React, { useState, useEffect } from 'react';
import { Dumbbell, Users, Activity, CreditCard, Settings, LogOut, Search, Bell, Filter, FileText, X, Printer, Plus, Edit2, Trash2, Check } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Billing State
  const [selectedBill, setSelectedBill] = useState(null);
  const [showNewBillForm, setShowNewBillForm] = useState(false);

  // Plans State
  const [gymPlans, setGymPlans] = useState([]);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  // Trainers State
  const [gymTrainers, setGymTrainers] = useState([]);
  const [showTrainerModal, setShowTrainerModal] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);

  // Members State
  const [gymMembers, setGymMembers] = useState([
    { id: 1, name: 'Rahul Sharma', mobile: '+91 98765 43210', plan: 'Yearly Couple', joinDate: '2026-04-18', expireDate: '2027-04-18', status: 'Active' },
    { id: 2, name: 'Priya Patel', mobile: '+91 87654 32109', plan: 'Monthly Girls', joinDate: '2026-04-19', expireDate: '2026-05-19', status: 'Active' },
    { id: 3, name: 'Amit Singh', mobile: '+91 76543 21098', plan: 'Yearly Boys', joinDate: '2025-04-15', expireDate: '2026-04-15', status: 'Expired' },
    { id: 4, name: 'Neha Gupta', mobile: '+91 65432 10987', plan: 'Monthly Girls', joinDate: '2026-03-01', expireDate: '2026-04-01', status: 'Expired' },
    { id: 5, name: 'Vikram Joshi', mobile: '+91 54321 09876', plan: 'Yearly Boys', joinDate: '2026-04-20', expireDate: '2027-04-20', status: 'Active' },
    { id: 6, name: 'Sonal Desai', mobile: '+91 43210 98765', plan: 'Monthly Girls', joinDate: '2026-04-15', expireDate: '2026-05-15', status: 'Active' },
    { id: 7, name: 'Rohan Mehta', mobile: '+91 32109 87654', plan: 'Monthly Boys', joinDate: '2026-02-10', expireDate: '2026-03-10', status: 'Expired' },
    { id: 8, name: 'Kavita Singh', mobile: '+91 21098 76543', plan: 'Yearly Couple', joinDate: '2025-05-20', expireDate: '2026-05-20', status: 'Expiring Soon' }
  ]);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    const defaultFallbackPlans = [
      { id: 1, type: 'Boys', monthly: 1500, yearly: 15000, features: ['Full Gym Access', 'Locker Room', 'Cardio + Weights', '1 PT Session'] },
      { id: 2, type: 'Girls', monthly: 1400, yearly: 14000, features: ['Full Gym Access', 'Locker Room', 'Zumba / Aerobics', 'Female Trainer'], popular: true },
      { id: 3, type: 'Couple', monthly: 2500, yearly: 25000, features: ['Access for 2 Persons', 'All Classes Included', 'Diet Plan', 'Guest Passes'] }
    ];

    const stored = localStorage.getItem('gymPlans');
    if (stored && stored !== 'null' && stored !== 'undefined') {
      try { 
        const parsed = JSON.parse(stored); 
        if (Array.isArray(parsed)) {
          setGymPlans(parsed);
        } else {
          throw new Error('Not an array');
        }
      } catch(e) {
        setGymPlans(defaultFallbackPlans);
      }
    } else {
      setGymPlans(defaultFallbackPlans);
      localStorage.setItem('gymPlans', JSON.stringify(defaultFallbackPlans));
    }

    const defaultFallbackTrainers = [
      { id: 1, name: 'Vikram Singh', role: 'Head Coach', contact: '+91 9876543210', photo: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 2, name: 'Anjali Sharma', role: 'Yoga & Aerobics', contact: '+91 8765432109', photo: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 3, name: 'Rahul Desai', role: 'Strength & Conditioning', contact: '+91 7654321098', photo: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ];

    const storedTrainers = localStorage.getItem('gymTrainers');
    if (storedTrainers && storedTrainers !== 'null' && storedTrainers !== 'undefined') {
      try { 
        const parsedT = JSON.parse(storedTrainers); 
        if (Array.isArray(parsedT)) {
          setGymTrainers(parsedT);
        } else {
          throw new Error('Not an array');
        }
      } catch(e) {
        setGymTrainers(defaultFallbackTrainers);
      }
    } else {
      setGymTrainers(defaultFallbackTrainers);
      localStorage.setItem('gymTrainers', JSON.stringify(defaultFallbackTrainers));
    }
  }, []);

  const handleSavePlan = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const planObj = {
      id: editingPlan ? editingPlan.id : Date.now(),
      type: fd.get('type'),
      monthly: Number(fd.get('monthly')),
      yearly: Number(fd.get('yearly')),
      popular: fd.get('popular') === 'on',
      features: fd.get('features').split(',').map(s => s.trim()).filter(Boolean)
    };

    const updated = editingPlan ? gymPlans.map(p => p.id === editingPlan.id ? planObj : p) : [...gymPlans, planObj];
    setGymPlans(updated);
    localStorage.setItem('gymPlans', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    setShowPlanModal(false);
    setEditingPlan(null);
  };

  const deletePlan = (id) => {
    if(window.confirm('Are you sure you want to delete this plan?')) {
      const updated = gymPlans.filter(p => p.id !== id);
      setGymPlans(updated);
      localStorage.setItem('gymPlans', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleSaveTrainer = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const trainerObj = {
      id: editingTrainer ? editingTrainer.id : Date.now(),
      name: fd.get('name'),
      role: fd.get('role'),
      contact: fd.get('contact'),
      photo: fd.get('photo')
    };

    const updated = editingTrainer ? gymTrainers.map(t => t.id === editingTrainer.id ? trainerObj : t) : [...gymTrainers, trainerObj];
    setGymTrainers(updated);
    localStorage.setItem('gymTrainers', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    setShowTrainerModal(false);
    setEditingTrainer(null);
  };

  const deleteTrainer = (id) => {
    if(window.confirm('Are you sure you want to delete this trainer?')) {
      const updated = gymTrainers.filter(t => t.id !== id);
      setGymTrainers(updated);
      localStorage.setItem('gymTrainers', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const updated = gymMembers.map(m => {
      if (m.id === editingMember.id) {
        return {
          ...m,
          joinDate: fd.get('joinDate'),
          expireDate: fd.get('expireDate'),
          status: new Date(fd.get('expireDate')) > new Date() ? 'Active' : 'Expired'
        };
      }
      return m;
    });
    setGymMembers(updated);
    setShowMemberModal(false);
    setEditingMember(null);
  };

  const stats = [
    { title: 'Total Members', value: '1,248', growth: '+12%', icon: <Users size={24} className="text-accentPrimary" /> },
    { title: 'Active Plans', value: gymPlans?.length || 0, growth: '+1', icon: <Activity size={24} className="text-accentPrimary" /> },
    { title: 'Revenue (MTD)', value: '₹4,52,000', growth: '+18%', icon: <CreditCard size={24} className="text-accentPrimary" /> }
  ];

  const [billingData, setBillingData] = useState([
    { id: 'INV-2026-001', member: 'Rahul Sharma', amount: 25000, date: '2026-04-18', status: 'Paid', plan: 'Yearly Couple', email: 'rahul@example.com' },
    { id: 'INV-2026-002', member: 'Amit Singh', amount: 15000, date: '2026-04-19', status: 'Pending', plan: 'Yearly Boys', email: 'amit@example.com' },
    { id: 'INV-2026-003', member: 'Priya Patel', amount: 1400, date: '2026-04-19', status: 'Paid', plan: 'Monthly Girls', email: 'priya@example.com' },
    { id: 'INV-2026-004', member: 'Neha Gupta', amount: 1400, date: '2026-04-20', status: 'Failed', plan: 'Monthly Girls', email: 'neha@example.com' },
    { id: 'INV-2026-005', member: 'Vikram Joshi', amount: 15000, date: '2026-04-20', status: 'Paid', plan: 'Yearly Boys', email: 'vikram@example.com' },
  ]);

  const filteredMembers = gymMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterType === 'Expired') return member.status === 'Expired' || member.status === 'Expiring Soon';
    if (filterType === 'Recent') {
      const joinTime = new Date(member.joinDate).getTime();
      const now = new Date('2026-04-20').getTime();
      const diffDays = (now - joinTime) / (1000 * 3600 * 24);
      return diffDays <= 7 && diffDays >= 0;
    }
    if (filterType === 'Active') return member.status === 'Active' || member.status === 'Expiring Soon';
    return true; 
  });

  const handleGenerateBill = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const memberName = fd.get('member');
    const planType = fd.get('planType');
    const planDuration = fd.get('planDuration');
    const finalPlan = planType === 'Custom' ? 'Custom Plan' : `${planDuration} ${planType}`;
    const amount = Number(fd.get('amount'));
    const memberObj = gymMembers.find(m => m.name === memberName) || { name: memberName, id: null };

    const newBill = {
      id: `INV-2026-00${billingData.length + 1}`,
      member: memberObj.name,
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      status: fd.get('status'),
      plan: finalPlan,
      email: memberObj.id ? `${memberObj.name.split(' ')[0].toLowerCase()}@example.com` : 'user@example.com'
    };
    
    setBillingData([newBill, ...billingData]);
    setShowNewBillForm(false);
  };

  return (
    <div className="flex h-screen w-full bg-bgPrimary text-textPrimary font-body overflow-hidden outline-none">
      {/* Sidebar */}
      <aside className="w-64 bg-bgSecondary border-r border-glassBorder flex flex-col print:hidden">
        <div className="h-20 flex items-center px-6 border-b border-glassBorder">
          <a href="/" className="flex items-center gap-3 font-heading text-xl font-extrabold tracking-wide">
            <Dumbbell className="text-accentPrimary" size={24} />
            <span>GLOBAL<span className="text-accentPrimary">ADMIN</span></span>
          </a>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {['Dashboard', 'Members', 'Billing', 'Plans', 'Trainers', 'Settings'].map((item) => (
            <button 
              key={item}
              onClick={() => setActiveTab(item.toLowerCase())}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all font-medium ${
                activeTab === item.toLowerCase() 
                ? 'bg-accentPrimary text-black' 
                : 'text-textSecondary hover:bg-glassBorder hover:text-white'
              }`}
            >
              {item === 'Dashboard' && <Activity size={20} />}
              {item === 'Members' && <Users size={20} />}
              {item === 'Billing' && <FileText size={20} />}
              {item === 'Plans' && <CreditCard size={20} />}
              {item === 'Trainers' && <Dumbbell size={20} />}
              {item === 'Settings' && <Settings size={20} />}
              {item}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-glassBorder">
          <button onClick={() => window.location.href = '/'} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-textSecondary hover:bg-glassBorder hover:text-red-400 transition-all font-medium">
            <LogOut size={20} />
            Logout to Site
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden print:hidden">
        <header className="h-20 bg-bgSecondary border-b border-glassBorder flex items-center justify-between px-8">
          <h2 className="font-heading font-bold text-2xl capitalize hidden md:block">{activeTab}</h2>
          <div className="flex items-center gap-6 w-full justify-end md:w-auto">
            {activeTab === 'members' && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-bgPrimary border border-glassBorder rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accentPrimary w-64 lg:w-80 transition-all" 
                />
              </div>
            )}
            <button className="relative text-textSecondary hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accentPrimary rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-bgPrimary border border-accentPrimary flex items-center justify-center text-accentPrimary font-bold font-heading shadow-[0_0_10px_rgba(204,255,0,0.2)]">
              AD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 relative">
          
          {(activeTab === 'dashboard' || activeTab === 'members') && (
            <>
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="bg-bgSecondary border border-glassBorder p-6 rounded-xl relative overflow-hidden transition-transform hover:-translate-y-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-textMuted text-sm font-semibold uppercase tracking-wider mb-1">{stat.title}</p>
                          <h3 className="text-3xl font-heading font-bold text-white">{stat.value}</h3>
                        </div>
                        <div className="w-12 h-12 bg-bgPrimary rounded-lg flex items-center justify-center border border-glassBorder">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1 text-accentPrimary text-sm font-semibold px-2 py-1 bg-accentPrimary/10 rounded-md">
                        {stat.growth} this month
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Members Data Table */}
              <div className="bg-bgSecondary border border-glassBorder rounded-xl overflow-hidden shadow-2xl">
                {activeTab === 'members' && (
                  <div className="px-6 py-5 border-b border-glassBorder flex flex-col sm:flex-row justify-between items-center gap-4 bg-bgSecondary/80">
                    <h3 className="font-heading font-bold text-xl text-white">Member Directory</h3>
                    <div className="flex items-center gap-3">
                      <Filter size={18} className="text-textMuted" />
                      <select 
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="bg-bgPrimary border border-glassBorder rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-accentPrimary appearance-none cursor-pointer pr-10 relative"
                      >
                        <option value="All">All Members</option>
                        <option value="Active">Active Only</option>
                        <option value="Recent">Recent Registrations</option>
                        <option value="Expired">Expired / Ending Soon</option>
                      </select>
                    </div>
                  </div>
                )}
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="bg-[#0f0f0f] border-b border-glassBorder text-textMuted text-xs font-bold uppercase tracking-widest">
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Mobile No.</th>
                        <th className="px-6 py-4">Selected Plan</th>
                        <th className="px-6 py-4">Joining Date</th>
                        <th className="px-6 py-4">Expire Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-glassBorder">
                      {filteredMembers.length > 0 ? (
                        filteredMembers.map(member => (
                          <tr key={member.id} className="hover:bg-bgPrimary/50 transition-colors group">
                            <td className="px-6 py-4 font-medium text-white group-hover:text-accentPrimary transition-colors">{member.name}</td>
                            <td className="px-6 py-4 text-textSecondary">{member.mobile}</td>
                            <td className="px-6 py-4 text-textSecondary">
                              <span className="px-3 py-1 bg-white/5 rounded text-sm whitespace-nowrap">{member.plan}</span>
                            </td>
                            <td className="px-6 py-4 text-textMuted whitespace-nowrap">{member.joinDate}</td>
                            <td className="px-6 py-4 text-textMuted whitespace-nowrap">{member.expireDate}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
                                member.status === 'Active' ? 'bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20' : 
                                member.status === 'Expiring Soon' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 
                                'bg-red-500/10 text-red-500 border border-red-500/20'
                              }`}>
                                {member.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => { setEditingMember(member); setShowMemberModal(true); }}
                                className="inline-flex items-center gap-2 text-textSecondary hover:text-white border border-glassBorder hover:border-accentPrimary hover:bg-accentPrimary/10 px-4 py-1.5 rounded transition-colors text-sm font-medium"
                              >
                                <Edit2 size={16} /> Edit
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-12 text-center text-textMuted">
                            No members found matching your filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Edit Member Modal */}
          {showMemberModal && (
            <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-bgSecondary w-full max-w-xl rounded-2xl border border-glassBorder overflow-hidden shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-center p-6 border-b border-glassBorder">
                  <h2 className="text-xl font-heading font-bold text-white">
                    Edit Membership Dates
                  </h2>
                  <button onClick={() => { setShowMemberModal(false); setEditingMember(null); }} className="text-textMuted hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleSaveMember} className="p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-textSecondary mb-2">Member Name</label>
                    <input 
                      readOnly
                      defaultValue={editingMember?.name || ''}
                      className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary transition-colors font-bold opacity-75 cursor-not-allowed"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Joining Date</label>
                      <input 
                        type="date"
                        name="joinDate" 
                        defaultValue={editingMember?.joinDate || ''}
                        required 
                        className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Expire Date</label>
                      <input 
                        type="date"
                        name="expireDate" 
                        defaultValue={editingMember?.expireDate || ''}
                        required 
                        className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <p className="text-sm text-orange-400">
                      <strong>Note:</strong> Editing the expire date may instantly change the active/expired status of {editingMember?.name}.
                    </p>
                  </div>
                  
                  <button type="submit" className="w-full bg-accentPrimary text-black font-bold uppercase tracking-wider py-4 rounded-lg hover:bg-[#b3e600] transition-colors shadow-lg">
                    Save Dates & Status
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Billing Tab content restoring it completely */}
          {activeTab === 'billing' && (
            <div className="bg-bgSecondary border border-glassBorder rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-0">
              <div className="px-6 py-5 border-b border-glassBorder flex justify-between items-center bg-bgSecondary/80">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">Billing & Invoices</h3>
                  <p className="text-textMuted text-sm">Manage payments, send receipts, and overview revenue.</p>
                </div>
                <button 
                  onClick={() => setShowNewBillForm(true)}
                  className="bg-accentPrimary text-black px-5 py-2.5 rounded-lg font-bold hover:bg-[#b3e600] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                >
                  <Plus size={20} /> Generate Bill
                </button>
              </div>
              
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f0f0f] border-b border-glassBorder text-textMuted text-xs font-bold uppercase tracking-widest">
                      <th className="px-6 py-4">Invoice ID</th>
                      <th className="px-6 py-4">Member Name</th>
                      <th className="px-6 py-4">Plan Billed</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Payment Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-glassBorder">
                    {billingData.map(bill => (
                      <tr key={bill.id} className="hover:bg-bgPrimary/50 transition-colors group">
                        <td className="px-6 py-4 font-mono text-accentPrimary">{bill.id}</td>
                        <td className="px-6 py-4 font-medium text-white group-hover:text-amber-50">{bill.member}</td>
                        <td className="px-6 py-4 text-textSecondary">{bill.plan}</td>
                        <td className="px-6 py-4 font-bold text-white tracking-wide">₹{bill.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-textMuted">{bill.date}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            bill.status === 'Paid' ? 'bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20' : 
                            bill.status === 'Failed' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                            'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                          }`}>
                            {bill.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => setSelectedBill(bill)}
                            className="inline-flex items-center gap-2 text-textSecondary hover:text-white border border-glassBorder hover:border-accentPrimary hover:bg-accentPrimary/10 px-4 py-1.5 rounded transition-colors text-sm font-medium"
                          >
                            <FileText size={16} /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white">Membership Plans</h3>
                  <p className="text-textSecondary mt-1">Manage plans presented on the user landing page.</p>
                </div>
                <button 
                  onClick={() => { setEditingPlan(null); setShowPlanModal(true); }}
                  className="bg-accentPrimary text-black px-5 py-2.5 rounded-lg font-bold hover:bg-[#b3e600] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                >
                  <Plus size={20} /> Create Custom Plan
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {gymPlans?.map((plan) => (
                  <div key={plan.id} className={`relative bg-bgSecondary border rounded-2xl p-8 flex flex-col justify-between ${plan.popular ? 'border-accentPrimary bg-gradient-to-b from-[#141414] to-accentPrimary/5' : 'border-glassBorder'}`}>
                    {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accentPrimary text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">Most Popular</div>}
                    
                    <div>
                      <h3 className="text-2xl text-center mb-4 font-heading font-bold text-white">{plan.type}</h3>
                      <div className="text-center mb-6">
                        <span className="text-xl align-top text-accentPrimary font-bold">₹</span>
                        <span className="text-5xl font-extrabold font-heading leading-none text-white">{plan.monthly}</span>
                        <span className="text-textMuted text-sm block mt-2">or ₹{plan.yearly}/year</span>
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
                        onClick={() => { setEditingPlan(plan); setShowPlanModal(true); }}
                        className="flex items-center justify-center gap-2 border border-glassBorder py-2.5 rounded-lg text-white hover:bg-glassBorder hover:border-textSecondary transition-colors text-sm font-semibold"
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                      <button 
                        onClick={() => deletePlan(plan.id)}
                        className="flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-lg transition-colors text-sm font-semibold"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Custom Plan Modal */}
          {showPlanModal && (
            <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-bgSecondary w-full max-w-xl rounded-2xl border border-glassBorder overflow-hidden shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-center p-6 border-b border-glassBorder">
                  <h2 className="text-xl font-heading font-bold text-white">
                    {editingPlan ? 'Edit Custom Plan' : 'Create Custom Plan'}
                  </h2>
                  <button onClick={() => { setShowPlanModal(false); setEditingPlan(null); }} className="text-textMuted hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleSavePlan} className="p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-textSecondary mb-2">Plan Name / Title</label>
                    <input 
                      name="type" 
                      defaultValue={editingPlan?.type || ''}
                      required 
                      placeholder="e.g. VIP Member, Students, Weekend Pass" 
                      className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary transition-colors font-bold"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Monthly Price (₹)</label>
                      <input 
                        type="number" 
                        name="monthly" 
                        defaultValue={editingPlan?.monthly || ''}
                        required 
                        min="0"
                        className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Yearly Price (₹)</label>
                      <input 
                        type="number" 
                        name="yearly" 
                        defaultValue={editingPlan?.yearly || ''}
                        required 
                        min="0"
                        className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-textSecondary mb-2">Included Features (Comma separated)</label>
                    <textarea 
                      name="features" 
                      defaultValue={editingPlan ? editingPlan.features.join(', ') : 'Full Gym Access, Locker Room'}
                      required 
                      rows="3"
                      placeholder="e.g. Full Gym Access, Locker Room, Free Supplements" 
                      className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-bgPrimary border border-glassBorder rounded-lg">
                    <input 
                      type="checkbox" 
                      id="popular" 
                      name="popular" 
                      defaultChecked={editingPlan?.popular || false}
                      className="w-5 h-5 accent-accentPrimary bg-bgSecondary border-glassBorder rounded cursor-pointer"
                    />
                    <label htmlFor="popular" className="text-white cursor-pointer font-medium select-none">Mark as "Most Popular" Plan</label>
                  </div>
                  
                  <button type="submit" className="w-full bg-accentPrimary text-black font-bold uppercase tracking-wider py-4 rounded-lg hover:bg-[#b3e600] transition-colors shadow-lg">
                    {editingPlan ? 'Save Changes' : 'Publish Plan to Website'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* New Bill Form Modal */}
          {showNewBillForm && (
            <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 print:hidden">
              <div className="bg-bgSecondary w-full max-w-lg rounded-2xl border border-glassBorder overflow-hidden shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-center p-6 border-b border-glassBorder">
                  <h2 className="text-xl font-heading font-bold">Generate New Bill</h2>
                  <button onClick={() => setShowNewBillForm(false)} className="text-textMuted hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleGenerateBill} className="p-8 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-textSecondary mb-2">Member Search (Name)</label>
                    <input 
                      list="membersList" 
                      name="member" 
                      required 
                      autoComplete="off"
                      placeholder="Type to search members..." 
                      className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary transition-colors"
                    />
                    <datalist id="membersList">
                      {gymMembers.map(m => <option key={m.id} value={m.name} />)}
                    </datalist>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Plan Type</label>
                      <select name="planType" required className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary">
                        <option value="Boys">Boys Plan</option>
                        <option value="Girls">Girls Plan</option>
                        <option value="Couple">Couple Plan</option>
                        <option value="Custom">Custom / Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Duration</label>
                      <select name="planDuration" required className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary">
                        <option value="1 Month">1 Month</option>
                        <option value="2 Months">2 Months</option>
                        <option value="3 Months">3 Months</option>
                        <option value="4 Months">4 Months</option>
                        <option value="5 Months">5 Months</option>
                        <option value="6 Months">6 Months</option>
                        <option value="7 Months">7 Months</option>
                        <option value="8 Months">8 Months</option>
                        <option value="9 Months">9 Months</option>
                        <option value="10 Months">10 Months</option>
                        <option value="11 Months">11 Months</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Manual Amount (₹)</label>
                      <input 
                        type="number" 
                        name="amount" 
                        required 
                        min="0"
                        placeholder="e.g. 1500" 
                        className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Payment Status</label>
                      <select name="status" required className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary">
                        <option value="Paid">Paid (Cash/Online)</option>
                        <option value="Pending">Pending / Unpaid</option>
                        <option value="Failed">Failed / Declined</option>
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" className="w-full bg-accentPrimary text-black font-bold uppercase tracking-wider py-4 rounded-lg mt-4 hover:bg-[#b3e600] transition-colors shadow-lg">
                    Generate & Save Bill
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Trainers Tab content */}
          {activeTab === 'trainers' && (
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white">Trainers Management</h3>
                  <p className="text-textSecondary mt-1">Manage gym trainers presented on the user landing page.</p>
                </div>
                <button 
                  onClick={() => { setEditingTrainer(null); setShowTrainerModal(true); }}
                  className="bg-accentPrimary text-black px-5 py-2.5 rounded-lg font-bold hover:bg-[#b3e600] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                >
                  <Plus size={20} /> Add Trainer
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {gymTrainers?.map((trainer) => (
                  <div key={trainer.id} className="bg-bgSecondary border border-glassBorder rounded-2xl p-6 flex flex-col items-center text-center hover:border-accentPrimary transition-colors relative overflow-hidden group">
                    <div className="w-24 h-24 rounded-full p-1 border-2 border-glassBorder group-hover:border-accentPrimary transition-colors mb-4 relative z-10">
                      <img src={trainer.photo} alt={trainer.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-1 relative z-10">{trainer.name}</h3>
                    <p className="text-accentPrimary text-sm font-bold uppercase tracking-wider mb-2 relative z-10">{trainer.role}</p>
                    <p className="text-textSecondary text-sm mb-6 relative z-10">{trainer.contact}</p>

                    <div className="grid grid-cols-2 gap-3 w-full mt-auto relative z-10">
                      <button 
                        onClick={() => { setEditingTrainer(trainer); setShowTrainerModal(true); }}
                        className="flex items-center justify-center gap-2 border border-glassBorder py-2 rounded-lg text-white hover:bg-glassBorder hover:border-textSecondary transition-colors text-sm font-semibold"
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                      <button 
                        onClick={() => deleteTrainer(trainer.id)}
                        className="flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-lg transition-colors text-sm font-semibold"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Trainer Modal */}
          {showTrainerModal && (
            <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 print:hidden">
              <div className="bg-bgSecondary w-full max-w-xl rounded-2xl border border-glassBorder overflow-hidden shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-center p-6 border-b border-glassBorder">
                  <h2 className="text-xl font-heading font-bold text-white">
                    {editingTrainer ? 'Edit Trainer' : 'Add New Trainer'}
                  </h2>
                  <button onClick={() => { setShowTrainerModal(false); setEditingTrainer(null); }} className="text-textMuted hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleSaveTrainer} className="p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-textSecondary mb-2">Trainer Name</label>
                    <input 
                      name="name" 
                      defaultValue={editingTrainer?.name || ''}
                      required 
                      placeholder="e.g. Rahul Desai" 
                      className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary transition-colors font-bold"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Role / Specialty</label>
                      <input 
                        name="role" 
                        defaultValue={editingTrainer?.role || ''}
                        required 
                        placeholder="e.g. Head Coach" 
                        className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Contact Number</label>
                      <input 
                        name="contact" 
                        defaultValue={editingTrainer?.contact || ''}
                        required 
                        placeholder="e.g. +91 9876543210" 
                        className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-textSecondary mb-2">Photo URL</label>
                    <input 
                      name="photo" 
                      type="url"
                      defaultValue={editingTrainer?.photo || ''}
                      required 
                      placeholder="e.g. https://images.unsplash.com/..." 
                      className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accentPrimary"
                    />
                  </div>
                  
                  <button type="submit" className="w-full bg-accentPrimary text-black font-bold uppercase tracking-wider py-4 rounded-lg hover:bg-[#b3e600] transition-colors shadow-lg">
                    {editingTrainer ? 'Save Changes' : 'Add Trainer'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Other place holders */}
          {(!['dashboard', 'members', 'billing', 'plans', 'trainers'].includes(activeTab)) && (
            <div className="flex flex-col items-center justify-center h-full text-textMuted max-h-[80vh]">
              <Settings size={48} className="mb-4 opacity-50" />
              <h2 className="text-2xl font-heading font-bold text-white mb-2 capitalize">{activeTab} Management</h2>
              <p>This module is currently under construction.</p>
            </div>
          )}
        </div>
      </main>

      {/* Invoice Modals */}
      {selectedBill && (
        <div className="fixed inset-0 z-[9999] bg-black/90 md:p-8 overflow-y-auto">
          {/* Printable Container */}
          <div className="mx-auto w-full max-w-lg bg-bgSecondary md:rounded-2xl border-x md:border border-glassBorder shadow-2xl relative" id="printable-invoice">
            
            {/* Modal Controls (Hidden during print) */}
            <div className="flex justify-between items-center p-6 border-b border-glassBorder bg-[#0a0a0a] sticky top-0 z-10 print:hidden md:rounded-t-2xl">
              <h2 className="text-xl font-heading font-bold text-white">Invoice Preview</h2>
              <div className="flex gap-4">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2 bg-accentPrimary text-black px-5 py-2 rounded-lg font-bold hover:bg-[#b3e600] transition-colors shadow-[0_0_15px_rgba(204,255,0,0.4)]"
                >
                  <Printer size={18} /> Print / Save PDF
                </button>
                <button 
                  onClick={() => setSelectedBill(null)} 
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-bgPrimary border border-glassBorder text-textSecondary hover:text-white hover:border-textMuted transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Actual Document Sheet */}
            <div className="p-6 md:p-8 bg-black text-white">
              
              <div className="flex flex-col sm:flex-row justify-between items-start mb-8 border-b border-glassBorder pb-6">
                <div className="mb-6 sm:mb-0">
                  <div className="flex items-center gap-2 font-heading text-2xl font-extrabold tracking-wide mb-2">
                    <Dumbbell className="text-accentPrimary" size={24} />
                    <span className="text-white">GLOBAL<span className="text-accentPrimary">FITNESS</span></span>
                  </div>
                  <p className="text-textMuted text-sm leading-relaxed">
                    123 Fitness Ave, Koregaon Park<br/>
                    Pune, MH 411001<br/>
                    +91 98765 43210
                  </p>
                </div>
                <div className="sm:text-right">
                  <h2 className="text-2xl font-heading font-extrabold text-white mb-2 uppercase tracking-widest">Invoice</h2>
                  <p className="text-textMuted font-mono text-sm mb-1">#{selectedBill.id}</p>
                  <p className="text-textMuted text-xs font-medium">Issue Date: <span className="text-white">{selectedBill.date}</span></p>
                  <div className="mt-3">
                    <span className={`inline-flex px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${
                        selectedBill.status === 'Paid' ? 'border-[#ccff00] text-[#ccff00]' : 
                        selectedBill.status === 'Failed' ? 'border-red-500 text-red-500' : 
                        'border-orange-500 text-orange-400'
                      }`}>
                      Status: {selectedBill.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-textMuted uppercase tracking-wider text-[10px] font-bold mb-2 border-l-2 border-accentPrimary pl-2">Billed To</h3>
                <div className="bg-bgPrimary p-4 rounded-lg border border-glassBorder">
                  <p className="text-lg font-bold text-white mb-1">{selectedBill.member}</p>
                  <p className="text-textSecondary text-xs mb-1">Email: {selectedBill.email}</p>
                  <p className="text-textSecondary text-xs mt-2 pt-2 border-t border-glassBorder">Membership: <span className="text-white font-medium">{selectedBill.plan}</span></p>
                </div>
              </div>

              <table className="w-full text-left mb-10">
                <thead>
                  <tr className="border-b-2 border-glassBorder">
                    <th className="py-3 font-bold uppercase tracking-widest text-[10px] text-textMuted">Description</th>
                    <th className="py-3 font-bold uppercase tracking-widest text-[10px] text-textMuted text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-glassBorder">
                    <td className="py-4 font-medium text-sm text-white">
                      Gym Membership
                      <span className="block text-xs text-textSecondary font-normal mt-1">Plan: {selectedBill.plan}</span>
                    </td>
                    <td className="py-4 text-right font-mono text-base text-white">₹{selectedBill.amount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="pt-4 pb-1 text-right font-bold text-textSecondary uppercase tracking-wider text-[10px]">Subtotal:</td>
                    <td className="pt-4 pb-1 text-right font-mono font-bold text-sm text-white">₹{selectedBill.amount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-right font-bold text-textSecondary uppercase tracking-wider text-[10px]">GST (0%):</td>
                    <td className="py-1 text-right font-mono font-bold text-sm text-white">₹0</td>
                  </tr>
                  <tr className="border-t border-glassBorder text-accentPrimary">
                    <td className="pt-4 text-right font-bold uppercase tracking-wider text-sm">Total Due:</td>
                    <td className="pt-4 text-right font-mono font-extrabold text-xl">₹{selectedBill.amount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              <div className="text-center text-textMuted text-[10px] mt-12 pt-6 border-t border-glassBorder">
                <p className="mb-1 font-medium">Thank you for pushing your limits with Global Fitness Pune.</p>
                <p>Computer-generated document. No signature required.</p>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
