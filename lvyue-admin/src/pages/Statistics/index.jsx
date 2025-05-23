import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, BarChartOutlined } from '@ant-design/icons';
import './Statistics.css';

const StatisticsLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState('personal');

  // 当路由变化时更新选中的菜单项
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/statistics/meeting')) {
      setSelectedKey('meeting');
    } else if (path.includes('/statistics/personal')) {
      setSelectedKey('personal');
    } else if (path === '/statistics') {
      navigate('/statistics/meeting');
      setSelectedKey('meeting');
    }
  }, [location.pathname, navigate]);

  // 处理菜单点击
  const handleMenuClick = ({ key }) => {
    navigate(`/statistics/${key}`);
  };

  // 菜单项
  const menuItems = [
    {
      key: 'personal',
      icon: <UserOutlined />,
      label: '个人履职统计'
    },
    {
      key: 'meeting',
      icon: <BarChartOutlined />,
      label: '会议履职统计'
    }
  ];

  return (
    <div className="statistics-layout">
      <div className="statistics-menu">
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={menuItems}
          style={{ fontSize: '16px', fontWeight: 500 }}
        />
      </div>
      <div className="statistics-content">
        <Outlet />
      </div>
    </div>
  );
};

export default StatisticsLayout; 