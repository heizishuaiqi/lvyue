import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { meetingInfo, formData } = location.state || {
    meetingInfo: {
      title: '2024年第一季度工作会议',
      time: '2024年3月15日 14:00-16:00',
      location: '总部大楼3层会议室A'
    },
    formData: {
      name: '',
      phone: '',
      workUnit: '',
      workPosition: '',
      attendanceType: 'self'
    }
  };

  const handleReRegister = () => {
    navigate(`/registration/${meetingInfo?.id || '1'}`);
  };

  return (
    <div className="page-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h2 className="success-title">报名成功</h2>
        <p className="success-desc">您的会议报名信息已提交成功！</p>
      </div>

      <div className="info-card">
        <h3>会议信息</h3>
        <div className="info-list">
          <div className="info-item">
            <span className="label">会议名称</span>
            <span>{meetingInfo?.title}</span>
          </div>
          <div className="info-item">
            <span className="label">会议时间</span>
            <span>{meetingInfo?.time}</span>
          </div>
          <div className="info-item">
            <span className="label">会议地点</span>
            <span>{meetingInfo?.location}</span>
          </div>
        </div>
      </div>

      <div className="info-card">
        <h3>报名信息</h3>
        <div className="info-list">
          <div className="info-item">
            <span className="label">姓名</span>
            <span>{formData?.name}</span>
          </div>
          <div className="info-item">
            <span className="label">手机号码</span>
            <span>{formData?.phone}</span>
          </div>
          <div className="info-item">
            <span className="label">单位名称</span>
            <span>{formData?.workUnit}</span>
          </div>
          <div className="info-item">
            <span className="label">单位职务</span>
            <span>{formData?.workPosition}</span>
          </div>
          <div className="info-item">
            <span className="label">出席方式</span>
            <span>{formData?.attendanceType === 'self' ? '本人' : '委托代表'}</span>
          </div>
        </div>
      </div>

      {formData?.attendanceType === 'delegate' && (
        <div className="info-card">
          <h3>被委托人信息</h3>
          <div className="info-list">
            <div className="info-item">
              <span className="label">被委托人姓名</span>
              <span>{formData?.delegateName}</span>
            </div>
            <div className="info-item">
              <span className="label">被委托人手机号码</span>
              <span>{formData?.delegatePhone}</span>
            </div>
            <div className="info-item">
              <span className="label">被委托人单位名称</span>
              <span>{formData?.delegateWorkUnit}</span>
            </div>
            <div className="info-item">
              <span className="label">被委托人单位职务</span>
              <span>{formData?.delegateWorkPosition}</span>
            </div>
          </div>
        </div>
      )}

      <button className="reregister-btn" onClick={handleReRegister}>
        重新报名
      </button>
    </div>
  );
};

export default SuccessPage; 