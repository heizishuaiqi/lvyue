import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Captcha from '../../components/Captcha';
import './style.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 检查是否已登录
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/account');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    captcha: '',
  });

  const [error, setError] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // 清除错误提示
  };

  const handleCaptchaChange = (code) => {
    setCaptchaCode(code);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 表单验证
    if (!formData.phone || !formData.password || !formData.captcha) {
      setError('请填写完整的登录信息');
      return;
    }

    // 验证码验证
    if (formData.captcha !== captchaCode) {
      setError('验证码错误');
      return;
    }

    // TODO: 实现登录逻辑
    try {
      // 这里模拟登录成功
      // const response = await login(formData);
      console.log('登录信息：', formData);
      
      // 存储登录状态
      localStorage.setItem('token', 'dummy_token');
      localStorage.setItem('userInfo', JSON.stringify({
        role: '管理员',
        phone: formData.phone
      }));

      // 登录成功后跳转到上一个路径或默认到账号管理页面
      const from = location.state?.from?.pathname || '/account';
      navigate(from, { replace: true });
    } catch (err) {
      setError('登录失败，请检查账号密码');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-banner">
          <div className="login-banner-content">
            <img src="/data-analytics.svg" alt="数据分析" className="banner-image" />
            <h1 className="banner-title">中国电子学会履职系统</h1>
            <p className="banner-desc">
              欢迎使用中国电子学会履职系统管理平台。本系统用于管理理事会议、常务理事会议及学术会议的报名和履职情况统计。
            </p>
          </div>
        </div>
        
        <div className="login-content">
          <h2 className="login-title">管理员登录</h2>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="请输入手机号"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="请输入密码"
                className="form-input"
              />
            </div>

            <div className="form-group captcha-group">
              <input
                type="text"
                name="captcha"
                value={formData.captcha}
                onChange={handleInputChange}
                placeholder="请输入验证码"
                className="form-input"
                maxLength="4"
              />
              <Captcha onChange={handleCaptchaChange} />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button">
              登录
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
