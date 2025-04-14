import React from 'react';
import './style.css';

const RegistrationDetailModal = ({ visible, registration, onClose }) => {
  if (!visible || !registration) return null;

  return (
    <div className="detail-modal-overlay">
      <div className="detail-modal">
        <div className="modal-header">
          <h3>报名详情</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="section">
            <div className="section-title">会议信息</div>
            <div className="info-grid">
              <div className="info-item">
                <label>会议名称</label>
                <span>{registration.meetingName || '-'}</span>
              </div>
              <div className="info-item">
                <label>会议类型</label>
                <span>{registration.meetingType || '-'}</span>
              </div>
              <div className="info-item">
                <label>会议时间</label>
                <span>{registration.meetingDate || '-'}</span>
              </div>
              <div className="info-item">
                <label>会议地点</label>
                <span>{registration.meetingLocation || '-'}</span>
              </div>
            </div>
          </div>
          
          <div className="section">
            <div className="section-title">报名人信息</div>
            <div className="info-grid">
              <div className="info-item">
                <label>身份</label>
                <span>{registration.selectedRole || '-'}</span>
              </div>
              <div className="info-item">
                <label>姓名</label>
                <span>{registration.name || '-'}</span>
              </div>
              <div className="info-item">
                <label>手机号码</label>
                <span>{registration.phone || '-'}</span>
              </div>
              <div className="info-item">
                <label>单位名称</label>
                <span>{registration.workUnit || '-'}</span>
              </div>
              <div className="info-item">
                <label>单位职务</label>
                <span>{registration.workPosition || '-'}</span>
              </div>
              <div className="info-item">
                <label>学会职务</label>
                <span>{registration.societyPosition || '-'}</span>
              </div>
              <div className="info-item">
                <label>出席方式</label>
                <span>{registration.attendType || '-'}</span>
              </div>
              <div className="info-item">
                <label>审核状态</label>
                <span className={`status-tag ${
                  registration.status === '审核通过' ? 'success' : 'reject'
                }`}>{registration.status || '-'}</span>
              </div>
              <div className="info-item">
                <label>同步状态</label>
                <span className={`status-tag ${
                  registration.syncStatus === '已同步' ? 'success' : 'pending'
                }`}>{registration.syncStatus || '未同步'}</span>
              </div>
              <div className="info-item">
                <label>报名时间</label>
                <span>{registration.registerTime || '-'}</span>
              </div>
            </div>
          </div>
          
          {registration.attendType === '委托代表出席' && (
            <div className="section">
              <div className="section-title">被委托人信息</div>
              <div className="info-grid">
                <div className="info-item">
                  <label>姓名</label>
                  <span>{registration.delegateName || '-'}</span>
                </div>
                <div className="info-item">
                  <label>手机号码</label>
                  <span>{registration.delegatePhone || '-'}</span>
                </div>
                <div className="info-item">
                  <label>单位名称</label>
                  <span>{registration.delegateUnit || '-'}</span>
                </div>
                <div className="info-item">
                  <label>单位职务</label>
                  <span>{registration.delegatePosition || '-'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="close-btn" onClick={onClose}>关闭</button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetailModal; 