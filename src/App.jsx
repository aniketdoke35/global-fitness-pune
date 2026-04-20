import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import MediaSection from './components/MediaSection';
import Schedule from './components/Schedule';
import Pricing from './components/Pricing';
import Trainers from './components/Trainers';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import MemberDashboard from './pages/MemberDashboard';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authType, setAuthType] = useState('join');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  React.useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (currentPath.startsWith('/admin')) {
    return <AdminDashboard />;
  }

  if (currentPath.startsWith('/dashboard') || currentPath.startsWith('/member')) {
    return <MemberDashboard />;
  }

  const openAuth = (type = 'join') => {
    setAuthType(type);
    setIsAuthOpen(true);
  };

  return (
    <div className="w-full bg-bgPrimary min-h-screen text-textPrimary font-body">
      <Navbar openAuth={openAuth} />
      <HeroSlider openAuth={openAuth} />
      <MediaSection />
      <Schedule />
      <Trainers />
      <Pricing openAuth={openAuth} />
      <Footer />
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialType={authType} 
      />
    </div>
  );
}

export default App;
