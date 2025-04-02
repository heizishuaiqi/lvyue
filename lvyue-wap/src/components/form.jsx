import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

// 身份类型定义
const IDENTITY_TYPES = [
  { value: 'director', label: '理事' },
  { value: 'executive_director', label: '常务理事' },
  { value: 'supervisor', label: '监事' },
  { value: 'branch_leader', label: '分支机构负责人' },
  { value: 'local_leader', label: '地方学会负责人' }
];

// 可以委托的身份类型
const DELEGATABLE_TYPES = ['director', 'executive_director', 'supervisor'];

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { meetingInfo } = useOutletContext();
  
  // 表单状态
  const [formData, setFormData] = useState({
    // 基本信息
    identity: '',
    name: '',
    phone: '',
    workUnit: '',
    workPosition: '',
    // 出席方式
    attendanceType: 'self', // 'self' 或 'delegate'
    // 委托代表信息
    delegateName: '',
    delegatePhone: '',
    delegateWorkUnit: '',
    delegateWorkPosition: ''
  });

  const [errors, setErrors] = useState({});

  // 是否可以委托
  const canDelegate = DELEGATABLE_TYPES.includes(formData.identity);

  const validateForm = () => {
    const newErrors = {};
    
    // 验证身份选择
    if (!formData.identity) {
      newErrors.identity = '请选择您的身份';
    }

    // 验证基本信息
    if (!formData.name.trim()) {
      newErrors.name = '请输入姓名';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '请输入手机号';
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入正确的手机号';
    }
    if (!formData.workUnit.trim()) {
      newErrors.workUnit = '请输入单位名称';
    }
    if (!formData.workPosition.trim()) {
      newErrors.workPosition = '请输入单位职务';
    }

    // 如果是委托出席，验证委托人信息
    if (canDelegate && formData.attendanceType === 'delegate') {
      if (!formData.delegateName.trim()) {
        newErrors.delegateName = '请输入被委托人姓名';
      }
      if (!formData.delegatePhone.trim()) {
        newErrors.delegatePhone = '请输入被委托人手机号';
      } else if (!/^1[3-9]\d{9}$/.test(formData.delegatePhone)) {
        newErrors.delegatePhone = '请输入正确的手机号';
      }
      if (!formData.delegateWorkUnit.trim()) {
        newErrors.delegateWorkUnit = '请输入被委托人单位名称';
      }
      if (!formData.delegateWorkPosition.trim()) {
        newErrors.delegateWorkPosition = '请输入被委托人单位职务';
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        // TODO: 调用API提交表单数据
        console.log('提交的数据：', formData);
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        // 跳转到成功页面，并传递会议信息和表单数据
        navigate('/success', {
          state: {
            meetingInfo,
            formData
          }
        });
      } catch (error) {
        console.error('提交失败：', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // 当身份改变时，重置出席方式为本人出席
      if (name === 'identity') {
        newData.attendanceType = 'self';
        // 清空委托人信息
        newData.delegateName = '';
        newData.delegatePhone = '';
        newData.delegateWorkUnit = '';
        newData.delegateWorkPosition = '';
      }
      
      return newData;
    });

    // 清除对应字段的错误提示
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="form-container">
      <h2>报名信息</h2>
      <form onSubmit={handleSubmit}>
        {/* 身份选择 */}
        <div className="form-group">
          <label>您的身份</label>
          <select
            name="identity"
            value={formData.identity}
            onChange={handleChange}
            className={errors.identity ? 'error' : ''}
          >
            <option value="">请选择您的身份</option>
            {IDENTITY_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.identity && <div className="error-message">{errors.identity}</div>}
        </div>

        {/* 基本信息 */}
        <div className="form-group">
          <label>姓名</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="请输入姓名"
          />
        </div>
        <div className="form-group">
          <label>手机号码</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="请输入手机号码"
          />
        </div>
        <div className="form-group">
          <label>单位名称</label>
          <input
            type="text"
            name="workUnit"
            value={formData.workUnit}
            onChange={handleChange}
            placeholder="请输入单位名称"
          />
        </div>
        <div className="form-group">
          <label>单位职务</label>
          <input
            type="text"
            name="workPosition"
            value={formData.workPosition}
            onChange={handleChange}
            placeholder="请输入单位职务"
          />
        </div>

        {/* 出席方式选择 */}
        {formData.identity && (
          <div className="form-group">
            <label>出席方式</label>
            <div className="radio-group">
              <label className={`radio-label ${formData.attendanceType === 'self' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="attendanceType"
                  value="self"
                  checked={formData.attendanceType === 'self'}
                  onChange={handleChange}
                />
                <span>本人</span>
              </label>
              {canDelegate && (
                <label className={`radio-label ${formData.attendanceType === 'delegate' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="attendanceType"
                    value="delegate"
                    checked={formData.attendanceType === 'delegate'}
                    onChange={handleChange}
                  />
                  <span>委托代表</span>
                </label>
              )}
            </div>
          </div>
        )}

        {/* 被委托人信息 */}
        {formData.attendanceType === 'delegate' && (
          <div className="delegate-info">
            <div className="form-group">
              <label>被委托人姓名</label>
              <input
                type="text"
                name="delegateName"
                value={formData.delegateName}
                onChange={handleChange}
                placeholder="请输入被委托人姓名"
              />
            </div>
            <div className="form-group">
              <label>被委托人手机号码</label>
              <input
                type="tel"
                name="delegatePhone"
                value={formData.delegatePhone}
                onChange={handleChange}
                placeholder="请输入被委托人手机号码"
              />
            </div>
            <div className="form-group">
              <label>被委托人单位名称</label>
              <input
                type="text"
                name="delegateWorkUnit"
                value={formData.delegateWorkUnit}
                onChange={handleChange}
                placeholder="请输入被委托人单位名称"
              />
            </div>
            <div className="form-group">
              <label>被委托人单位职务</label>
              <input
                type="text"
                name="delegateWorkPosition"
                value={formData.delegateWorkPosition}
                onChange={handleChange}
                placeholder="请输入被委托人单位职务"
              />
            </div>
          </div>
        )}

        <button type="submit" className="btn">
          提交报名
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm; 