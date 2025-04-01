import React, { useEffect, useRef } from 'react';
import './style.css';

const Captcha = ({ onChange }) => {
  const canvasRef = useRef(null);
  const codeRef = useRef('');

  // 生成随机验证码
  const generateCode = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 生成4位随机数字
    const code = Math.random().toString().slice(2, 6);
    codeRef.current = code;

    // 设置背景色
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);

    // 添加干扰线
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
      ctx.stroke();
    }

    // 添加干扰点
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 1, 0, 2 * Math.PI);
      ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
      ctx.fill();
    }

    // 绘制验证码文字
    ctx.font = 'bold 30px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#333';
    
    // 添加文字扭曲效果
    for (let i = 0; i < code.length; i++) {
      ctx.save();
      ctx.translate(30 + i * 20, height / 2);
      ctx.rotate((Math.random() - 0.5) * 0.3);
      ctx.fillText(code[i], 0, 0);
      ctx.restore();
    }

    // 通知父组件验证码已更新
    onChange(code);
  };

  // 组件挂载时生成验证码
  useEffect(() => {
    generateCode();
  }, []);

  return (
    <div className="captcha-container">
      <canvas
        ref={canvasRef}
        width="120"
        height="40"
        className="captcha-canvas"
        onClick={generateCode}
      />
      <div className="captcha-tip">点击图片刷新验证码</div>
    </div>
  );
};

export default Captcha; 