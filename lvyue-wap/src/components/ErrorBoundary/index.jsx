import React from 'react';
import { useRouteError, Link, useLocation } from 'react-router-dom';
import styles from './index.module.css';

const ErrorBoundary = () => {
  const error = useRouteError();
  const location = useLocation();

  // 获取错误信息
  const getErrorMessage = () => {
    if (!error) {
      return '页面不存在';
    }
    if (error.status === 404) {
      return '您访问的页面不存在';
    }
    return error.statusText || error.message || '页面出现错误';
  };

  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>页面出错了！</h1>
      <p className={styles.errorMessage}>
        {getErrorMessage()}
      </p>
      <div className={styles.errorDetails}>
        <p>当前路径: {location.pathname}</p>
      </div>
      <Link to="/" className={styles.backButton}>
        返回首页
      </Link>
    </div>
  );
};

export default ErrorBoundary; 