import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // 检查登录状态
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    // 获取用户信息
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (userInfo.name) {
      setUserName(userInfo.name);
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      {/* 顶部栏 */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          {userName ? `${userName}欢迎使用履职系统` : '欢迎使用履职系统'}
        </h1>
        <div 
          className={styles.profileButton}
          onClick={() => navigate('/profile')}
        >
          <span className={styles.profileIcon}>👤</span>
        </div>
      </div>
      
      {/* 主要功能区 */}
      <div className={styles.mainContent}>
        <div className={styles.menuGrid}>
          <div 
            className={styles.menuItem} 
            onClick={() => navigate('/statistics')}
          >
            <span className={styles.menuIcon}>📊</span>
            <span>履职统计</span>
          </div>
          
          <div 
            className={styles.menuItem}
            onClick={() => navigate('/academic')}
          >
            <span className={styles.menuIcon}>🎓</span>
            <span>学术会议</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 