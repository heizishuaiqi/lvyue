import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const StatisticsPage = () => {
  const navigate = useNavigate();
  
  // 用户信息
  const [userInfo, setUserInfo] = useState({
    name: '',
    role: '',
    workUnit: '',
    workPosition: ''
  });

  // 会议统计数据
  const [statistics, setStatistics] = useState({
    executiveMeetings: 0,  // 常务理事会议
    directorMeetings: 0,   // 理事会议
    academicMeetings: 0    // 学术会议
  });

  // 会议列表数据
  const [meetings, setMeetings] = useState([]);

  // 从本地存储获取用户信息
  useEffect(() => {
    // 获取登录时保存的账号名称和角色
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');
    
    // 如果没有登录信息，则重定向到登录页面
    if (!username) {
      navigate('/login', { replace: true });
      return;
    }
    
    // 更新用户信息
    setUserInfo({
      name: username,
      role: userRole || '会员',
      workUnit: '中国电子学会',
      workPosition: userRole || '会员'
    });
    
    // 根据用户角色设置不同的会议数据
    let mockStatistics = {};
    let mockMeetings = [];
    
    if (userRole === '常务理事') {
      // 常务理事可以看到所有类型的会议
      mockStatistics = {
        executiveMeetings: 3,  // 常务理事会议
        directorMeetings: 5,   // 理事会议
        academicMeetings: 2    // 学术会议
      };
      
      mockMeetings = [
        {
          id: 1,
          type: '常务理事会议',
          name: '2024年第一次常务理事会议',
          date: '2024-03-15',
          location: '北京市海淀区',
          attendType: '本人出席'
        },
        {
          id: 2,
          type: '理事会议',
          name: '2024年理事年会',
          date: '2024-02-28',
          location: '上海市浦东新区',
          attendType: '本人出席'
        },
        {
          id: 3,
          type: '学术会议',
          name: '人工智能与电子科技创新论坛',
          date: '2024-01-20',
          location: '深圳市南山区',
          attendType: '本人出席'
        }
      ];
    } else if (userRole === '理事') {
      // 理事只能看到理事会议和学术会议
      mockStatistics = {
        directorMeetings: 4,   // 理事会议
        academicMeetings: 3    // 学术会议
      };
      
      mockMeetings = [
        {
          id: 2,
          type: '理事会议',
          name: '2024年理事年会',
          date: '2024-02-28',
          location: '上海市浦东新区',
          attendType: '本人出席'
        },
        {
          id: 3,
          type: '学术会议',
          name: '人工智能与电子科技创新论坛',
          date: '2024-01-20',
          location: '深圳市南山区',
          attendType: '本人出席'
        },
        {
          id: 4,
          type: '理事会议',
          name: '2024年第二季度理事会议',
          date: '2024-04-10',
          location: '广州市天河区',
          attendType: '委托出席'
        }
      ];
    } else {
      // 其他角色只能看到学术会议
      mockStatistics = {
        academicMeetings: 2    // 学术会议
      };
      
      mockMeetings = [
        {
          id: 3,
          type: '学术会议',
          name: '人工智能与电子科技创新论坛',
          date: '2024-01-20',
          location: '深圳市南山区',
          attendType: '本人出席'
        }
      ];
    }
    
    setStatistics(mockStatistics);
    setMeetings(mockMeetings);
  }, [navigate]);

  // 根据用户角色渲染不同的统计项
  const renderStatisticsItems = () => {
    const items = [];
    
    if (userInfo.role === '常务理事') {
      items.push(
        <div key="executive" className="statistics-item">
          <span className="count">{statistics.executiveMeetings || 0}</span>
          <span className="label">常务理事会议</span>
        </div>
      );
    }
    
    if (userInfo.role === '常务理事' || userInfo.role === '理事') {
      items.push(
        <div key="director" className="statistics-item">
          <span className="count">{statistics.directorMeetings || 0}</span>
          <span className="label">理事会议</span>
        </div>
      );
    }
    
    // 所有角色都可以看到学术会议
    items.push(
      <div key="academic" className="statistics-item">
        <span className="count">{statistics.academicMeetings || 0}</span>
        <span className="label">学术会议</span>
      </div>
    );
    
    return items;
  };

  // 跳转到个人中心
  const handleGoToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="statistics-page">
      {/* 标题栏 */}
      <div className="statistics-header">
        <h1>履职统计</h1>
        <button className="profile-btn" onClick={handleGoToProfile}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
          </svg>
        </button>
      </div>

      {/* 会议统计卡片 */}
      <div className="statistics-card">
        <h3>履职情况统计</h3>
        <div className="statistics-grid">
          {renderStatisticsItems()}
        </div>
      </div>

      {/* 参会记录模块 */}
      <div className="meetings-section">
        <h3 className="section-title">参会记录</h3>
        
        {meetings.length > 0 ? (
          <div className="meeting-cards">
            {meetings.map(meeting => (
              <div key={meeting.id} className="meeting-card">
                <div className="meeting-tag">{meeting.type}</div>
                <h4 className="meeting-title">{meeting.name}</h4>
                <div className="meeting-details">
                  <p>
                    <span className="label">时间：</span>
                    <span>{meeting.date}</span>
                  </p>
                  <p>
                    <span className="label">地点：</span>
                    <span>{meeting.location}</span>
                  </p>
                  <p>
                    <span className="label">出席方式：</span>
                    <span>{meeting.attendType}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-meetings">
            <p>暂无参会记录</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsPage; 