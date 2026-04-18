import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

export default function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-[220px] border-r border-border p-6 flex flex-col gap-8 shrink-0 bg-background hidden md:flex">
      <Link to="/" className="text-[20px] font-extrabold tracking-tight flex items-center gap-2 text-primary-foreground">
        <div className="w-6 h-6 bg-primary rounded" />
        <span className="text-white">IRONCORE</span>
      </Link>
      
      <nav className="flex flex-col gap-3">
        {!user && (
          <>
            <Link to="/" className={`text-sm font-medium p-2 px-3 rounded-lg ${isActive('/') ? 'bg-card text-primary' : 'text-muted-foreground hover:text-white'}`}>
              Home
            </Link>
            <Link to="/login" className={`text-sm font-medium p-2 px-3 rounded-lg ${isActive('/login') ? 'bg-card text-primary' : 'text-muted-foreground hover:text-white'}`}>
              Login
            </Link>
          </>
        )}
        
        {user && (
          <>
            <Link to="/dashboard" className={`text-sm font-medium p-2 px-3 rounded-lg ${isActive('/dashboard') ? 'bg-card text-primary' : 'text-muted-foreground hover:text-white'}`}>
              Dashboard
            </Link>
            
            <button 
              onClick={handleLogout} 
              className="text-sm font-medium p-2 px-3 rounded-lg text-left text-muted-foreground hover:text-white"
            >
              Sign out
            </button>
          </>
        )}
      </nav>

      {user && (
        <div className="mt-auto p-4 bg-[#1A1A1E] rounded-xl flex flex-col gap-1">
          <div className="text-[12px] text-muted-foreground">{user.role.toUpperCase()} PORTAL</div>
          <div className="text-[14px] font-semibold text-white">{user.name}</div>
        </div>
      )}
    </aside>
  );
}
