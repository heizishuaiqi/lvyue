import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import './style.css';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('userInfo')) || {};
    } catch {
      return {};
    }
  });

  const menuItems = [
    { path: '/account', label: '账号管理', icon: '👤' },
    { path: '/meeting', label: '会议管理', icon: '📅' },
    { path: '/registration', label: '报名管理', icon: '📝' },
    { path: '/performance', label: '履职统计', icon: '📊' },
  ];

  const handleLogout = () => {
    // 显示确认对话框
    if (window.confirm('确定要退出登录吗？')) {
      // 清除登录状态
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      // 跳转到登录页
      navigate('/login');
    }
  };

  return (
    <div className="main-layout">
      {/* 左侧菜单 */}
      <div className="sidebar">
        <div className="logo">
          <img src="/logo.png" alt="中国电子学会履职系统" />
          <h1>中国电子学会履职系统</h1>
        </div>
        
        <nav className="menu">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="menu-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          
          <button className="menu-item logout" onClick={handleLogout}>
            <span className="menu-icon">🚪</span>
            安全退出
          </button>
        </nav>
      </div>

      {/* 右侧内容区 */}
      <div className="main-content">
        <div className="content-header">
          <div className="breadcrumb">
            {menuItems.find(item => item.path === location.pathname)?.label || ''}
          </div>
          <div className="header-right">
            <span className="admin-info">
              {userInfo.role} - {userInfo.phone}
            </span>
          </div>
        </div>
        <div className="content-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 