import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="form-container success-container">
      <h2>报名成功</h2>
      <p>您的会议报名信息已提交成功！</p>
      <p>我们会尽快审核您的报名信息。</p>
      <p>如有任何问题，请联系管理员。</p>
      <button 
        className="btn"
        onClick={() => window.close()}
      >
        关闭页面
      </button>
    </div>
  );
};

export default RegistrationSuccess; 