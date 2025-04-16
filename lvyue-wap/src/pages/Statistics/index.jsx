import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

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
    // 获取登录时保存的账号名称、角色和token
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');
    const token = localStorage.getItem('token');
    
    // 如果没有登录信息或token，则重定向到登录页面
    if (!username || !token) {
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
        <div key="executive" className={styles['statistics-item']}>
          <span className={styles['count']}>{statistics.executiveMeetings || 0}</span>
          <span className={styles['label']}>常务理事会议</span>
        </div>
      );
    }
    
    if (userInfo.role === '常务理事' || userInfo.role === '理事') {
      items.push(
        <div key="director" className={styles['statistics-item']}>
          <span className={styles['count']}>{statistics.directorMeetings || 0}</span>
          <span className={styles['label']}>理事会议</span>
        </div>
      );
    }
    
    // 所有角色都可以看到学术会议
    items.push(
      <div key="academic" className={styles['statistics-item']}>
        <span className={styles['count']}>{statistics.academicMeetings || 0}</span>
        <span className={styles['label']}>学术会议</span>
      </div>
    );
    
    return items;
  };

  // 跳转到个人中心
  const handleGoToProfile = () => {
    navigate('/profile');
  };

  // 处理返回
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles['statistics-page']}>
      {/* 顶部栏 */}
      <div className={styles['statistics-header']}>
        <button className={styles['back-button']} onClick={handleBack}>
        </button>
        <h1>履职统计</h1>
        <div className={styles.placeholder}></div>
      </div>

      {/* 统计内容 */}
      <div className={styles['statistics-content']}>
        {/* 会议统计卡片 */}
        <div className={styles['statistics-card']}>
          <h3>履职情况统计</h3>
          <div className={styles['statistics-grid']}>
            {renderStatisticsItems()}
          </div>
        </div>

        {/* 参会记录模块 */}
        <div className={styles['meetings-section']}>
          <h3 className={styles['section-title']}>参会记录</h3>
          
          {meetings.length > 0 ? (
            <div className={styles['meeting-cards']}>
              {meetings.map(meeting => (
                <div key={meeting.id} className={styles['meeting-card']}>
                  <div className={styles['meeting-tag']}>{meeting.type}</div>
                  <h4 className={styles['meeting-title']}>{meeting.name}</h4>
                  <div className={styles['meeting-details']}>
                    <p>
                      <span className={styles.label}>时间：</span>
                      <span>{meeting.date}</span>
                    </p>
                    <p>
                      <span className={styles.label}>地点：</span>
                      <span>{meeting.location}</span>
                    </p>
                    <p>
                      <span className={styles.label}>出席方式：</span>
                      <span>{meeting.attendType}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles['empty-meetings']}>
              <p>暂无参会记录</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage; 