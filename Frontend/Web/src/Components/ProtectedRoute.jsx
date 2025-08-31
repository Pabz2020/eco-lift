import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  console.log('ProtectedRoute check:', { userInfo, adminOnly });
  
  if (!userInfo || !userInfo.token) {
    console.log('No user info or token found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userInfo.role !== 'admin') {
    console.log('Admin access required but user role is:', userInfo.role);
    return <Navigate to="/dashboard" replace />;
  }

  console.log('Access granted for role:', userInfo.role);
  return children;
};

export default ProtectedRoute;