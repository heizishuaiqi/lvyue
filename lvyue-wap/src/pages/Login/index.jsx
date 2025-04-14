import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/login-form';
import './index.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 检查是否已登录
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('已检测到登录状态，准备跳转到首页...');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');
    
    console.log('登录成功，准备跳转...', {
      token,
      username,
      userRole
    });
    
    navigate('/', { replace: true });
  };

  return (
    <div className="login-page-container">
      <div className="login-page-header">
        <h1>中国电子学会履职系统</h1>
      </div>
      <div className="login-page-content">
        <LoginForm 
          onSuccess={handleLoginSuccess}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default LoginPage; 