import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './declare.module.css';

const DeclarePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: ''
  });

  // 处理返回
  const handleBack = () => {
    navigate(-1);
  };

  // 处理表单输入
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 处理表单提交逻辑
    console.log('提交的数据：', formData);
    // 提交成功后返回列表页
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      {/* 顶部栏 */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
        </button>
        <h1 className={styles.title}>申报学术会议</h1>
        <div className={styles.placeholder}></div>
      </div>

      {/* 表单区域 */}
      <div className={styles.content}>
        <div className={styles.form}>
          <p className={styles.tip}>
            申报的会议为中国电子学会主办，未在列表中的会议
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <label>会议名称</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="请输入会议名称"
              />
            </div>

            <div className={styles.formItem}>
              <label>会议时间</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formItem}>
              <label>会议地点</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="请输入会议地点"
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              提交
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeclarePage; 