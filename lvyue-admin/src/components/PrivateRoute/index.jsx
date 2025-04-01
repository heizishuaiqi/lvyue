import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    // 如果没有登录，重定向到登录页面，并记录当前路径
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute; 