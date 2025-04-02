import React, { useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import RegistrationForm from '../../components/form.jsx';

const RegistrationPage = () => {
  const { meetingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [meetingInfo, setMeetingInfo] = useState(null);

  useEffect(() => {
    // 模拟获取会议信息
    setTimeout(() => {
      setMeetingInfo({
        id: meetingId,
        title: '2024年第一季度工作会议',
        time: '2024年3月15日 14:00-16:00',
        location: '总部大楼3层会议室A',
      });
      setLoading(false);
    }, 1000);
  }, [meetingId]);

  if (loading) {
    return <div className="page-container">加载中...</div>;
  }

  return (
    <div className="page-container">
      <div className="meeting-info">
        <h1>{meetingInfo.title}</h1>
        <div className="info-list">
          <div className="info-item">
            <label>时间</label>
            <span>{meetingInfo.time}</span>
          </div>
          <div className="info-item">
            <label>地点</label>
            <span>{meetingInfo.location}</span>
          </div>
        </div>
      </div>
      <Outlet context={{ meetingInfo }} />
    </div>
  );
};

export default RegistrationPage; 