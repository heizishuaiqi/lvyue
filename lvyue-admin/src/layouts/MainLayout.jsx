import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'account',
      path: '/account',
      label: '账号管理',
      icon: '👤'
    },
    {
      key: 'meeting',
      path: '/meeting',
      label: '会议管理',
      icon: '📅'
    },
    {
      key: 'academic',
      path: '/academic',
      label: '学术会议',
      icon: '🎓'
    },
    {
      key: 'registration',
      path: '/registration',
      label: '报名信息',
      icon: '📝'
    },
    {
      key: 'statistics',
      path: '/statistics/personal',
      label: '履职统计',
      icon: '📊'
    }
  ];

  // 处理退出登录
  const handleLogout = () => {
    // TODO: 调用后端 API 退出登录
    // 清除本地存储的用户信息和token
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    // 跳转到登录页
    navigate('/login');
  };

  return (
    <div className="main-layout">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="logo">
          <h1>履约系统</h1>
          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
        <nav className="menu">
          {menuItems.map(item => (
            <Link
              key={item.key}
              to={item.path}
              className={`menu-item ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </Link>
          ))}
          <button
            className="menu-item logout-btn"
            onClick={() => setShowLogoutModal(true)}
          >
            <span className="icon">🚪</span>
            <span className="label">退出登录</span>
          </button>
        </nav>
      </div>
      <div className="main-content">
        <header className="header">
          <div className="user-info">
            <span className="welcome" title="欢迎使用中国电子学会履职系统">欢迎使用中国电子学会履职系统</span>
            <span className="user">管理员</span>
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>

      {/* 退出登录弹窗 */}
      {showLogoutModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>退出登录</h3>
            <p>确定要退出登录吗？</p>
            <div className="modal-buttons">
              <button 
                className="action-button"
                onClick={() => setShowLogoutModal(false)}
              >
                取消
              </button>
              <button 
                className="action-button danger"
                onClick={handleLogout}
              >
                确定退出
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .main-content {
          display: flex;
          flex-direction: column;
        }
        .header {
          border-bottom: none;
        }
        .content {
          display: flex;
          flex-direction: column;
          padding-top: 0;
        }
      `}</style>
    </div>
  );
};

export default MainLayout; 