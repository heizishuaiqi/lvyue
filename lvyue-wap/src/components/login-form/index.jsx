import React, { useState } from 'react';
import './index.css';

const LoginForm = ({ onSuccess, loading, setLoading }) => {
  // 登录方式：'phone' - 手机验证码登录，'password' - 账号密码登录
  const [loginType, setLoginType] = useState('password');
  // 表单数据
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    verifyCode: '',
    username: ''
  });
  // 表单错误信息
  const [errors, setErrors] = useState({});
  // 验证码倒计时
  const [countdown, setCountdown] = useState(0);

  // 处理登录方式切换
  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setFormData({
      phone: '',
      password: '',
      verifyCode: '',
      username: ''
    });
    setErrors({});
  };

  // 处理表单数据变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 清除对应字段的错误信息
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // 验证手机号格式
  const validatePhone = (phone) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  // 获取验证码
  const handleGetVerifyCode = async () => {
    if (!validatePhone(formData.phone)) {
      setErrors(prev => ({
        ...prev,
        phone: '请输入正确的手机号码'
      }));
      return;
    }

    try {
      setLoading(true);
      // TODO: 调用获取验证码的API
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟API调用
      
      // 开始倒计时
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        verifyCode: '获取验证码失败，请重试'
      }));
    } finally {
      setLoading(false);
    }
  };

  // 处理登录提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 表单验证
    const newErrors = {};
    
    if (loginType === 'phone') {
      if (!validatePhone(formData.phone)) {
        newErrors.phone = '请输入正确的手机号码';
      }
      if (!formData.verifyCode) {
        newErrors.verifyCode = '请输入验证码';
      }
    } else {
      if (!formData.phone) {
        newErrors.phone = '请输入账号';
      }
      if (!formData.password) {
        newErrors.password = '请输入密码';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      
      if (loginType === 'password') {
        // 常务理事用户
        if (formData.phone === '123456' && formData.password === '123456') {
          // 保存账号信息和用户角色到本地存储
          localStorage.setItem('username', formData.phone);
          localStorage.setItem('userRole', '常务理事');
          localStorage.setItem('token', 'dummy_token'); // 添加token存储
          
          // 模拟登录延迟
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // 登录成功
          onSuccess();
        } 
        // 理事用户
        else if (formData.phone === '1123' && formData.password === '1123') {
          // 保存账号信息和用户角色到本地存储
          localStorage.setItem('username', formData.phone);
          localStorage.setItem('userRole', '理事');
          localStorage.setItem('token', 'dummy_token'); // 添加token存储
          
          // 模拟登录延迟
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // 登录成功
          onSuccess();
        }
        else {
          setErrors(prev => ({
            ...prev,
            submit: '账号或密码错误，请重试'
          }));
        }
      } else {
        // 手机号验证码登录逻辑
        await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟API调用
        localStorage.setItem('username', formData.phone);
        localStorage.setItem('userRole', '常务理事');
        localStorage.setItem('token', 'dummy_token'); // 添加token存储
        onSuccess();
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: '登录失败，请重试'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-type-switch">
        <button
          className={`switch-btn ${loginType === 'phone' ? 'active' : ''}`}
          onClick={() => handleLoginTypeChange('phone')}
        >
          手机验证码登录
        </button>
        <button
          className={`switch-btn ${loginType === 'password' ? 'active' : ''}`}
          onClick={() => handleLoginTypeChange('password')}
        >
          账号密码登录
        </button>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type={loginType === 'phone' ? 'tel' : 'text'}
            name="phone"
            placeholder={loginType === 'phone' ? '请输入手机号码' : '请输入账号'}
            value={formData.phone}
            onChange={handleInputChange}
            maxLength={loginType === 'phone' ? 11 : 20}
            required
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        {loginType === 'phone' ? (
          <div className="form-group">
            <div className="verify-code-input">
              <input
                type="text"
                name="verifyCode"
                placeholder="请输入验证码"
                value={formData.verifyCode}
                onChange={handleInputChange}
                maxLength="6"
                required
                className={errors.verifyCode ? 'error' : ''}
              />
              <button
                type="button"
                className={`get-code-btn ${countdown > 0 ? 'disabled' : ''}`}
                onClick={handleGetVerifyCode}
                disabled={countdown > 0 || loading}
              >
                {countdown > 0 ? `${countdown}s后重试` : '获取验证码'}
              </button>
            </div>
            {errors.verifyCode && <div className="error-message">{errors.verifyCode}</div>}
          </div>
        ) : (
          <div className="form-group password-group">
            <input
              type="password"
              name="password"
              placeholder="请输入密码"
              value={formData.password}
              onChange={handleInputChange}
              required
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
        )}

        {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

        <button 
          type="submit" 
          className={`submit-btn ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm; 