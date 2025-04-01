import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './style.css';

const QRCodeModal = ({ visible, meeting, onClose }) => {
  if (!visible) return null;

  // 生成报名页面的URL
  const registrationUrl = `${window.location.origin.replace('admin', 'wap')}/registration/${meeting.id}`;

  // 下载二维码
  const handleDownload = () => {
    const svg = document.getElementById('meeting-qrcode');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      // 创建下载链接
      const downloadLink = document.createElement('a');
      downloadLink.download = `会议二维码_${meeting.name}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="qrcode-modal-overlay">
      <div className="qrcode-modal">
        <div className="qrcode-modal-header">
          <h3>会议报名二维码</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="qrcode-modal-content">
          <div className="qrcode-container">
            <QRCodeSVG
              id="meeting-qrcode"
              value={registrationUrl}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          <div className="meeting-info">
            <p><strong>会议名称：</strong>{meeting.name}</p>
            <p><strong>会议时间：</strong>{meeting.startTime} 至 {meeting.endTime}</p>
            <p><strong>会议地点：</strong>{meeting.location}</p>
          </div>
          <div className="qrcode-actions">
            <button className="download-button" onClick={handleDownload}>
              下载二维码
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal; 