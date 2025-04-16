import { useNavigate, useLocation } from 'react-router-dom';
import styles from './success.module.css';

const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, meetingInfo } = location.state || {};

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* 成功图标 */}
        <div className={styles.successIcon}>✓</div>
        
        {/* 成功提示 */}
        <h2 className={styles.title}>报名成功</h2>
        <p className={styles.message}>您的会议报名信息已提交成功！</p>

        {/* 会议信息 */}
        {meetingInfo && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>会议信息</h3>
            <div className={styles.infoItem}>
              <span className={styles.label}>会议名称：</span>
              <span>{meetingInfo.title}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>会议时间：</span>
              <span>{meetingInfo.time}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>会议地点：</span>
              <span>{meetingInfo.location}</span>
            </div>
          </div>
        )}

        {/* 报名信息 */}
        {formData && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>报名信息</h3>
            <div className={styles.infoItem}>
              <span className={styles.label}>姓名：</span>
              <span>{formData.name}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>手机号码：</span>
              <span>{formData.phone}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>单位名称：</span>
              <span>{formData.workUnit}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>单位职务：</span>
              <span>{formData.workPosition}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>学会职务：</span>
              <span>{formData.societyPosition}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>出席方式：</span>
              <span>{formData.attendType}</span>
            </div>

            {/* 委托信息（如果有） */}
            {formData.attendType === '委托代表' && (
              <div className={styles.delegateSection}>
                <h4 className={styles.delegateTitle}>被委托人信息</h4>
                <div className={styles.infoItem}>
                  <span className={styles.label}>姓名：</span>
                  <span>{formData.delegateName}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>手机号码：</span>
                  <span>{formData.delegatePhone}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>单位名称：</span>
                  <span>{formData.delegateUnit}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>单位职务：</span>
                  <span>{formData.delegatePosition}</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button 
            className={styles.button}
            onClick={() => navigate('/')}
          >
            返回首页
          </button>
          <button 
            className={`${styles.button} ${styles.closeButton}`}
            onClick={() => window.close()}
          >
            关闭页面
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess; 