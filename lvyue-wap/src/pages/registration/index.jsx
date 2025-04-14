import React, { useState } from 'react';
import styles from './index.module.css';

// 报名页面组件
const RegistrationPage = () => {
  // 状态管理
  const [step, setStep] = useState('role'); // 'role': 只显示角色选择, 'form': 显示完整表单
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    workUnit: '',
    workPosition: '',
    societyPosition: '', // 新增学会职务字段
    attendType: '本人出席',
    delegateName: '',
    delegatePhone: '',
    delegateUnit: '',
    delegatePosition: ''
  });

  // 角色选项
  const roleOptions = [
    { value: 'director', label: '理事' },
    { value: 'standing_director', label: '常务理事' },
    { value: 'supervisor', label: '监事' },
    { value: 'branch_leader', label: '分支机构负责人' },
    { value: 'local_leader', label: '地方学会负责人' }
  ];

  // 判断是否可以委托出席
  const canDelegate = ['director', 'standing_director', 'supervisor'].includes(selectedRole);

  // 处理角色选择
  const handleRoleChange = (e) => {
    const value = e.target.value;
    setSelectedRole(value);
    
    // 控制步骤显示
    if (value === '') {
      setStep('role');
    } else {
      setStep('form');
    }
    
    // 重置表单数据
    setFormData({
      name: '',
      phone: '',
      workUnit: '',
      workPosition: '',
      societyPosition: '', // 重置学会职务
      attendType: '本人出席',
      delegateName: '',
      delegatePhone: '',
      delegateUnit: '',
      delegatePosition: ''
    });
  };

  // 处理表单输入
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('提交的表单数据：', { role: selectedRole, ...formData });
    alert('表单提交成功');
  };

  return (
    <div className="page-container">
      {/* 会议信息 */}
      <div className={styles.meetingInfo}>
        <h1 className={styles.meetingTitle}>2024年第一季度工作会议</h1>
        <div className={styles.meetingDetail}>
          <div className={styles.detailItem}>
            <span className={styles.label}>时间</span>
            <span>2024年3月15日 14:00-16:00</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>地点</span>
            <span>总部大楼3层会议室A</span>
          </div>
        </div>
      </div>

      {/* 报名表单 */}
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>报名信息</h2>

        <form onSubmit={handleSubmit}>
          {/* 身份选择 - 始终显示 */}
          <div className={styles.formItem}>
            <label className={styles.required}>您的身份</label>
            <select 
              value={selectedRole}
              onChange={handleRoleChange}
              className={styles.select}
              required
            >
              <option value="">请选择您的身份</option>
              {roleOptions.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          {/* 其余表单项 - 只在选择了身份后显示 */}
          {step === 'form' && (
            <div className={styles.formContent}>
              {/* 基本信息 */}
              <div className={styles.formItem}>
                <label className={styles.required}>姓名</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  placeholder="请输入姓名"
                />
              </div>

              <div className={styles.formItem}>
                <label className={styles.required}>手机号码</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  pattern="^1[3-9]\d{9}$"
                  placeholder="请输入11位手机号码"
                />
              </div>

              <div className={styles.formItem}>
                <label className={styles.required}>单位名称</label>
                <input
                  type="text"
                  name="workUnit"
                  value={formData.workUnit}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  placeholder="请输入单位名称"
                />
              </div>

              <div className={styles.formItem}>
                <label className={styles.required}>单位职务</label>
                <input
                  type="text"
                  name="workPosition"
                  value={formData.workPosition}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  placeholder="请输入单位职务"
                />
              </div>

              {/* 新增学会职务字段 */}
              <div className={styles.formItem}>
                <label className={styles.required}>学会职务</label>
                <input
                  type="text"
                  name="societyPosition"
                  value={formData.societyPosition}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  placeholder="请输入学会职务"
                />
              </div>

              {/* 出席方式选择 - 仅特定角色可见 */}
              {canDelegate && (
                <div className={styles.formItem}>
                  <label>出席方式</label>
                  <select
                    name="attendType"
                    value={formData.attendType}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="本人出席">本人出席</option>
                    <option value="委托代表">委托代表出席</option>
                  </select>
                </div>
              )}

              {/* 委托信息 - 仅选择委托出席时可见 */}
              {canDelegate && formData.attendType === '委托代表' && (
                <div className={styles.delegateInfo}>
                  <div className={styles.delegateInfoTitle}>被委托人信息</div>
                  <div className={styles.formItem}>
                    <label className={styles.required}>姓名</label>
                    <input
                      type="text"
                      name="delegateName"
                      value={formData.delegateName}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                      placeholder="请输入被委托人姓名"
                    />
                  </div>

                  <div className={styles.formItem}>
                    <label className={styles.required}>手机号码</label>
                    <input
                      type="tel"
                      name="delegatePhone"
                      value={formData.delegatePhone}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                      pattern="^1[3-9]\d{9}$"
                      placeholder="请输入被委托人手机号码"
                    />
                  </div>

                  <div className={styles.formItem}>
                    <label className={styles.required}>单位名称</label>
                    <input
                      type="text"
                      name="delegateUnit"
                      value={formData.delegateUnit}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                      placeholder="请输入被委托人单位名称"
                    />
                  </div>

                  <div className={styles.formItem}>
                    <label className={styles.required}>单位职务</label>
                    <input
                      type="text"
                      name="delegatePosition"
                      value={formData.delegatePosition}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                      placeholder="请输入被委托人单位职务"
                    />
                  </div>
                </div>
              )}

              {/* 提交按钮 */}
              <button type="submit" className={styles.submitButton}>
                提交报名
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage; 