import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

const AcademicPage = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all'); // 默认选择"全部"
  const [years, setYears] = useState([]);

  useEffect(() => {
    // 检查登录状态
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    // 获取所有可选年份（从2024年到当前年份）
    const currentYear = new Date().getFullYear();
    const yearList = [];
    for (let year = 2024; year <= currentYear; year++) {
      yearList.push(year);
    }
    setYears(yearList);

    // 模拟获取学术会议数据
    const mockMeetings = [
      {
        id: 1,
        title: '2024年人工智能与电子信息技术研讨会',
        date: '2024-05-15',
        location: '北京市海淀区中关村科技园',
        attended: false,
        isSelfDeclared: true
      },
      {
        id: 2,
        title: '第三届集成电路技术创新大会',
        date: '2024-06-20',
        location: '上海浦东新区张江科技园',
        attended: false,
        isSelfDeclared: false
      },
      {
        id: 3,
        title: '2024电子信息领域前沿技术交流会',
        date: '2024-07-10',
        location: '深圳市南山区科技园',
        attended: true,
        isSelfDeclared: false
      },
      {
        id: 4,
        title: '2024年半导体产业发展论坛',
        date: '2024-09-05',
        location: '南京市江北新区研创园',
        attended: false,
        isSelfDeclared: false
      },
      {
        id: 5,
        title: '2024智能制造与工业互联网大会',
        date: '2024-11-15',
        location: '杭州市滨江区科技中心',
        attended: false,
        isSelfDeclared: true
      },
      {
        id: 6,
        title: '2025年新一代通信技术研讨会',
        date: '2025-03-20',
        location: '广州市黄埔区科学城',
        attended: false,
        isSelfDeclared: false
      },
      {
        id: 7,
        title: '2025量子计算技术创新论坛',
        date: '2025-05-10',
        location: '合肥市高新区科技园',
        attended: false,
        isSelfDeclared: true
      },
      {
        id: 8,
        title: '2025电子信息产业发展大会',
        date: '2025-07-25',
        location: '武汉市东湖新技术开发区',
        attended: false,
        isSelfDeclared: false
      },
      {
        id: 9,
        title: '2025集成电路设计创新峰会',
        date: '2025-09-15',
        location: '成都市高新区天府软件园',
        attended: false,
        isSelfDeclared: false
      },
      {
        id: 10,
        title: '2025智能芯片与边缘计算论坛',
        date: '2025-11-20',
        location: '西安市高新区软件新城',
        attended: false,
        isSelfDeclared: true
      }
    ];

    // 根据选中的年份筛选会议
    const filteredMeetings = selectedYear === 'all' 
      ? mockMeetings 
      : mockMeetings.filter(meeting => {
          const meetingYear = new Date(meeting.date).getFullYear();
          return meetingYear === selectedYear;
        });

    setMeetings(filteredMeetings);
  }, [navigate, selectedYear]);

  // 处理返回
  const handleBack = () => {
    navigate(-1);
  };

  // 处理出席状态变更
  const handleAttendanceChange = (meetingId, attended) => {
    setMeetings(prevMeetings => 
      prevMeetings.map(meeting => 
        meeting.id === meetingId ? { ...meeting, attended } : meeting
      )
    );
  };

  // 处理年份选择
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value));
  };

  return (
    <div className={styles.container}>
      {/* 顶部栏 */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
        </button>
        <h1 className={styles.title}>学术会议</h1>
        <button 
          className={styles.declareButton} 
          onClick={() => navigate('/academic/declare')}
        >
          自主申报
        </button>
      </div>

      {/* 年份筛选 */}
      <div className={styles.filterSection}>
        <select 
          className={styles.yearSelect}
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="all">全部</option>
          {years.map(year => (
            <option key={year} value={year}>{year}年</option>
          ))}
        </select>
      </div>

      {/* 会议列表 */}
      <div className={styles.content}>
        {meetings.map(meeting => (
          <div key={meeting.id} className={styles.meetingCard}>
            {meeting.isSelfDeclared && (
              <div className={styles.selfDeclaredBadge}>自主申报</div>
            )}
            <h2 className={styles.meetingTitle}>{meeting.title}</h2>
            
            <div className={styles.meetingInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📅</span>
                <span>{meeting.date}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📍</span>
                <span>{meeting.location}</span>
              </div>
            </div>
            
            <div className={styles.attendanceGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name={`attendance-${meeting.id}`}
                  checked={meeting.attended}
                  onChange={() => handleAttendanceChange(meeting.id, true)}
                />
                <span>出席</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name={`attendance-${meeting.id}`}
                  checked={!meeting.attended}
                  onChange={() => handleAttendanceChange(meeting.id, false)}
                />
                <span>未出席</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicPage; 