import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/login-form';
import './index.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = () => {
    console.log('开始跳转到统计页面...');
    navigate('/statistics', { replace: true });
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