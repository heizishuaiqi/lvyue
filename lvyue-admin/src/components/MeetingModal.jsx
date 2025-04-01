import React, { useState, useEffect } from 'react';
import './MeetingModal.css';

const MeetingModal = ({ visible, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    type: '',
    form: '',
    name: '',
    startTime: '',
    endTime: '',
    location: '',
    isRegistrationOpen: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{initialData ? '编辑会议' : '创建会议'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">会议类型</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">请选择会议类型</option>
              <option value="理事会议">理事会议</option>
              <option value="常务理事会议">常务理事会议</option>
              <option value="学术会议">学术会议</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="form">会议形式</label>
            <select
              id="form"
              name="form"
              value={formData.form}
              onChange={handleChange}
              required
            >
              <option value="">请选择会议形式</option>
              <option value="线下会议">线下会议</option>
              <option value="线上会议">线上会议</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">会议名称</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startTime">开始时间</label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endTime">结束时间</label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">会议地点</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="isRegistrationOpen"
                checked={formData.isRegistrationOpen}
                onChange={handleChange}
              />
              开启报名
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              取消
            </button>
            <button type="submit" className="submit-btn">
              {initialData ? '保存' : '创建'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeetingModal; 