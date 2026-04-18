import { useAuth } from '../lib/AuthContext';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import { Navigate } from 'react-router-dom';

export default function DashboardRouter() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role === 'admin' || user.role === 'employee') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}
