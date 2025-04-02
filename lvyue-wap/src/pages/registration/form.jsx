import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: '',
    workUnit: '',
    workPosition: '',
    attendType: '本人出席',
    delegateName: '',
    delegatePhone: '',
    delegateUnit: '',
    delegatePosition: ''
  });

  const [errors, setErrors] = useState({});

  // 手机号码验证
  const validatePhone = (phone) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  // 字段验证
  const validateField = (name, value) => {
    switch (name) {
      case 'phone':
      case 'delegatePhone':
        return validatePhone(value) ? '' : '请输入正确的手机号码';
      case 'name':
      case 'delegateName':
        return value.length >= 2 ? '' : '姓名至少需要2个字符';
      case 'workUnit':
      case 'delegateUnit':
        return value.length >= 2 ? '' : '单位名称至少需要2个字符';
      case 'workPosition':
      case 'delegatePosition':
        return value.length >= 2 ? '' : '职务名称至少需要2个字符';
      case 'role':
        return value ? '' : '请选择学会职务';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 实时验证
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 表单验证
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (formData.attendType === '本人出席' && key.startsWith('delegate')) {
        return; // 跳过委托人信息的验证
      }
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      // TODO: 调用API提交表单
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟API调用
      navigate('success');
    } catch (error) {
      console.error('提交失败：', error);
      alert('提交失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>填写报名信息</h2>
      
      <div className="form-group">
        <label>姓名</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="请输入您的姓名"
          className={errors.name ? 'error' : ''}
          required
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label>手机号码</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="请输入您的手机号码"
          className={errors.phone ? 'error' : ''}
          required
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
      </div>

      <div className="form-group">
        <label>学会职务</label>
        <select 
          name="role" 
          value={formData.role} 
          onChange={handleChange}
          className={errors.role ? 'error' : ''}
          required
        >
          <option value="">请选择您的学会职务</option>
          <option value="理事">理事</option>
          <option value="常务理事">常务理事</option>
          <option value="监事">监事</option>
          <option value="分支机构负责人">分支机构负责人</option>
          <option value="地方学会负责人">地方学会负责人</option>
        </select>
        {errors.role && <div className="error-message">{errors.role}</div>}
      </div>

      <div className="form-group">
        <label>工作单位</label>
        <input
          type="text"
          name="workUnit"
          value={formData.workUnit}
          onChange={handleChange}
          placeholder="请输入您的工作单位"
          className={errors.workUnit ? 'error' : ''}
          required
        />
        {errors.workUnit && <div className="error-message">{errors.workUnit}</div>}
      </div>

      <div className="form-group">
        <label>工作职务</label>
        <input
          type="text"
          name="workPosition"
          value={formData.workPosition}
          onChange={handleChange}
          placeholder="请输入您的工作职务"
          className={errors.workPosition ? 'error' : ''}
          required
        />
        {errors.workPosition && <div className="error-message">{errors.workPosition}</div>}
      </div>

      <div className="form-group">
        <label>出席方式</label>
        <select 
          name="attendType" 
          value={formData.attendType} 
          onChange={handleChange}
        >
          <option value="本人出席">本人出席</option>
          <option value="委托代表出席">委托代表出席</option>
        </select>
      </div>

      {formData.attendType === '委托代表出席' && (
        <>
          <div className="form-group">
            <label>被委托人姓名</label>
            <input
              type="text"
              name="delegateName"
              value={formData.delegateName}
              onChange={handleChange}
              placeholder="请输入被委托人姓名"
              className={errors.delegateName ? 'error' : ''}
              required
            />
            {errors.delegateName && <div className="error-message">{errors.delegateName}</div>}
          </div>

          <div className="form-group">
            <label>被委托人手机号码</label>
            <input
              type="tel"
              name="delegatePhone"
              value={formData.delegatePhone}
              onChange={handleChange}
              placeholder="请输入被委托人手机号码"
              className={errors.delegatePhone ? 'error' : ''}
              required
            />
            {errors.delegatePhone && <div className="error-message">{errors.delegatePhone}</div>}
          </div>

          <div className="form-group">
            <label>被委托人单位</label>
            <input
              type="text"
              name="delegateUnit"
              value={formData.delegateUnit}
              onChange={handleChange}
              placeholder="请输入被委托人工作单位"
              className={errors.delegateUnit ? 'error' : ''}
              required
            />
            {errors.delegateUnit && <div className="error-message">{errors.delegateUnit}</div>}
          </div>

          <div className="form-group">
            <label>被委托人职务</label>
            <input
              type="text"
              name="delegatePosition"
              value={formData.delegatePosition}
              onChange={handleChange}
              placeholder="请输入被委托人工作职务"
              className={errors.delegatePosition ? 'error' : ''}
              required
            />
            {errors.delegatePosition && <div className="error-message">{errors.delegatePosition}</div>}
          </div>
        </>
      )}

      <button 
        type="submit" 
        className="btn"
        disabled={submitting || Object.keys(errors).length > 0}
      >
        {submitting ? '提交中...' : '提交报名'}
      </button>
    </form>
  );
};

export default RegistrationForm; 