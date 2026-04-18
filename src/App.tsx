import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './lib/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import DashboardRouter from './pages/DashboardRouter';
import Navigation from './components/Navigation';

export default function App() {
  const { user } = useAuth();

  return (
    <div className="h-screen bg-background text-foreground flex overflow-hidden">
      <Navigation />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard/*" element={user ? <DashboardRouter /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}
