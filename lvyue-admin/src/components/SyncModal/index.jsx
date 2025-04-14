import React, { useState, useEffect } from 'react';
import './style.css';

const SyncModal = ({ visible, registration, onClose, onSync }) => {
  if (!visible) return null;

  // 添加状态管理单位名称和单位职务
  const [workUnit, setWorkUnit] = useState('');
  const [workPosition, setWorkPosition] = useState('');

  // 当registration改变时更新状态
  useEffect(() => {
    if (registration) {
      setWorkUnit(registration.workUnit || '');
      setWorkPosition(registration.workPosition || '');
    }
  }, [registration]);

  const handleSync = () => {
    // 二次确认
    if (window.confirm(`同步后，${registration.name}的个人信息会同步到原始信息库，是否确定？`)) {
      // 将修改后的数据传递给父组件
      const updatedRegistration = {
        ...registration,
        workUnit,
        workPosition,
        syncStatus: '已同步'
      };
      onSync(updatedRegistration.id, '已同步', updatedRegistration);
      onClose();
    }
  };

  return (
    <div className="sync-modal-overlay">
      <div className="sync-modal">
        <div className="modal-header">
          <h3>同步报名信息</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="info-grid">
            <div className="info-item">
              <label>姓名</label>
              <span>{registration.name}</span>
            </div>
            <div className="info-item">
              <label>手机号码</label>
              <span>{registration.phone}</span>
            </div>
            
            <div className="info-item">
              <label>单位名称</label>
              <input
                type="text"
                className="sync-input"
                value={workUnit}
                onChange={(e) => setWorkUnit(e.target.value)}
                placeholder="请输入单位名称"
              />
            </div>
            
            <div className="info-item">
              <label>单位职务</label>
              <input
                type="text"
                className="sync-input"
                value={workPosition}
                onChange={(e) => setWorkPosition(e.target.value)}
                placeholder="请输入单位职务"
              />
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            取消
          </button>
          <button className="sync-button" onClick={handleSync}>
            同步
          </button>
        </div>
      </div>
    </div>
  );
};

export default SyncModal; 