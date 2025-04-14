import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    workUnit: '中国电子学会',
    workPosition: '',
    societyPosition: '',
    account: ''
  });

  useEffect(() => {
    // 获取登录时保存的token和用户信息
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');
    
    // 如果没有登录信息，则重定向到登录页面
    if (!token) {
      console.log('未检测到登录状态，准备跳转到登录页面...');
      navigate('/login', { replace: true });
      return;
    }
    
    // 更新用户信息
    setUserInfo({
      name: username || '',
      phone: username?.length === 11 ? username : '', // 如果用户名是手机号则显示
      workUnit: '中国电子学会',
      workPosition: '部门经理',
      societyPosition: userRole || '会员',
      account: username || ''
    });
  }, [navigate]);

  // 处理返回
  const handleBack = () => {
    navigate(-1);
  };

  // 处理退出登录
  const handleLogout = () => {
    // 清除本地存储的所有登录信息
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userInfo');
    
    // 跳转到登录页面
    navigate('/login', { replace: true });
  };

  return (
    <div className="profile-page">
      {/* 标题栏 */}
      <div className="profile-header">
        <button className="back-btn" onClick={handleBack}></button>
        <h1>个人中心</h1>
        <div className="placeholder"></div>
      </div>

      {/* 用户信息 */}
      <div className="profile-card">
        <div className="profile-card-header">
          <span className="header-line"></span>
          <h3>个人信息</h3>
        </div>
        <div className="info-list">
          <div className="info-item">
            <div className="info-label">姓名</div>
            <div className="info-value">{userInfo.name}</div>
          </div>
          <div className="info-item">
            <div className="info-label">手机号</div>
            <div className="info-value">{userInfo.phone}</div>
          </div>
          <div className="info-item">
            <div className="info-label">工作单位</div>
            <div className="info-value">{userInfo.workUnit}</div>
          </div>
          <div className="info-item">
            <div className="info-label">单位职务</div>
            <div className="info-value">{userInfo.workPosition}</div>
          </div>
          <div className="info-item">
            <div className="info-label">学会职务</div>
            <div className="info-value">{userInfo.societyPosition}</div>
          </div>
          <div className="info-item">
            <div className="info-label">账号</div>
            <div className="info-value">{userInfo.account}</div>
          </div>
        </div>
      </div>

      {/* 退出登录按钮 */}
      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          退出登录
        </button>
      </div>
    </div>
  );
};

export default ProfilePage; 