import React, { useState, useEffect } from 'react';
import './style.css';

// 图标SVG组件
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
    <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1.5L10.5 3M10 2L6.5 5.5L6 8L8.5 7.5L12 4L10 2z" stroke="#4086FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AuditModal = ({ 
  visible, 
  onClose, 
  onConfirm, 
  initialStatus, 
  userInfo 
}) => {
  const [auditStatus, setAuditStatus] = useState(initialStatus || 1);

  useEffect(() => {
    if (visible) {
      setAuditStatus(initialStatus || 1);
    }
  }, [visible, initialStatus]);

  if (!visible) return null;

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm({
      status: auditStatus
    });
  };

  return (
    <div className="audit-modal-overlay">
      <div className="audit-modal">
        <div className="modal-header">
          <h3>审核报名信息</h3>
          <button className="close-button" onClick={handleCancel}>×</button>
        </div>
        <div className="modal-content">
          {/* 用户信息区域 */}
          <div className="info-section">
            <div className="info-row">
              <div className="info-label">姓名:</div>
              <div className="info-value">{userInfo?.name || '-'}</div>
            </div>
            <div className="info-row">
              <div className="info-label">单位名称:</div>
              <div className="info-value">{userInfo?.unit || '-'}</div>
            </div>
            <div className="info-row">
              <div className="info-label">单位职务:</div>
              <div className="info-value">{userInfo?.position || '-'}</div>
            </div>
            <div className="info-row">
              <div className="info-label">手机号码:</div>
              <div className="info-value">{userInfo?.phone || '-'}</div>
            </div>
          </div>
          
          <div className="form-field">
            <label>审核状态：</label>
            <div className="radio-group">
              <label className={`radio-label ${auditStatus === 1 ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="auditStatus"
                  value="1"
                  checked={auditStatus === 1}
                  onChange={() => setAuditStatus(1)}
                />
                <span>审核通过</span>
              </label>
              <label className={`radio-label ${auditStatus === 2 ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="auditStatus"
                  value="2"
                  checked={auditStatus === 2}
                  onChange={() => setAuditStatus(2)}
                />
                <span>审核未通过</span>
              </label>
            </div>
          </div>
          
          <div className="audit-hint">
            审核通过的报名信息会参与履职统计的计算，审核未通过的报名信息不参与履职统计的计算。
          </div>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={handleCancel}>取消</button>
          <button className="confirm-button" onClick={handleConfirm}>确认</button>
        </div>
      </div>
    </div>
  );
};

export default AuditModal; 