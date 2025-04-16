import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Table, Button, message, Tag, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './Statistics.css';

const MeetingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [attendees, setAttendees] = useState([]);

  // 获取会议信息和参会人员
  useEffect(() => {
    const fetchMeetingDetail = async () => {
      setLoading(true);
      try {
        // TODO: 替换为实际API调用
        // 模拟API响应数据
        const mockData = {
          '1': {
            meetingInfo: {
              id: '1',
              name: '2024年第一季度理事工作会议',
              type: 'director',
              time: '2024-03-15 14:00-16:00',
              location: '总部大楼3层会议室A',
              totalRegistrations: 25,
              selfAttendance: 20,
              delegateAttendance: 5,
              attendanceRate: '100%'
            },
            attendees: [
              {
                id: '1',
                name: '张三',
                phone: '13800138000',
                role: '理事',
                workUnit: '中国电子科技集团',
                workPosition: '高级工程师',
                attendType: 'self'
              },
              {
                id: '2',
                name: '李四',
                phone: '13900139000',
                role: '常务理事',
                workUnit: '华为技术有限公司',
                workPosition: '技术总监',
                attendType: 'self'
              },
              {
                id: '3',
                name: '王五',
                phone: '13700137000',
                role: '监事',
                workUnit: '清华大学',
                workPosition: '教授',
                attendType: 'delegate',
                delegateName: '小李'
              }
            ]
          },
          '2': {
            meetingInfo: {
              id: '2',
              name: '2024年信息技术发展研讨会',
              type: 'academic',
              time: '2024-03-25 09:00-17:00',
              location: '科技园国际会议中心',
              totalRegistrations: 48,
              selfAttendance: 45,
              delegateAttendance: 0,
              attendanceRate: '93.75%'
            },
            attendees: [
              {
                id: '1',
                name: '张三',
                phone: '13800138000',
                role: '理事',
                workUnit: '中国电子科技集团',
                workPosition: '高级工程师',
                attendType: 'self'
              },
              {
                id: '2',
                name: '李四',
                phone: '13900139000',
                role: '常务理事',
                workUnit: '华为技术有限公司',
                workPosition: '技术总监',
                attendType: 'self'
              }
            ]
          }
        };

        const response = {
          code: 200,
          data: mockData[id] || {
            meetingInfo: {
              id: id,
              name: '未知会议',
              type: '--',
              time: '--',
              location: '--',
              totalRegistrations: 0,
              selfAttendance: 0,
              delegateAttendance: 0,
              attendanceRate: '0%'
            },
            attendees: []
          }
        };

        setMeetingInfo(response.data.meetingInfo);
        setAttendees(response.data.attendees);
      } catch (error) {
        console.error('获取会议详情失败:', error);
        message.error('获取会议详情失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMeetingDetail();
    }
  }, [id]);

  // 获取会议类型标签
  const getMeetingTypeTag = (type) => {
    switch (type) {
      case 'director':
        return <Tag color="blue">理事会议</Tag>;
      case 'executive':
        return <Tag color="purple">常务理事会议</Tag>;
      case 'academic':
        return <Tag color="green">学术会议</Tag>;
      default:
        return <Tag>未知类型</Tag>;
    }
  };

  // 参会人员表格列定义
  const attendeeColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
      width: 150
    },
    {
      title: '学会职务',
      dataIndex: 'role',
      key: 'role',
      width: 150
    },
    {
      title: '工作单位',
      dataIndex: 'workUnit',
      key: 'workUnit',
      width: 200
    },
    {
      title: '单位职务',
      dataIndex: 'workPosition',
      key: 'workPosition',
      width: 150
    },
    {
      title: '出席方式',
      dataIndex: 'attendType',
      key: 'attendType',
      width: 120,
      render: (type, record) => {
        // 检查当前会议类型是否为学术会议
        if (meetingInfo && meetingInfo.type === 'academic') {
          return '--';
        }
        return type === 'self' ? 
          <Tag color="blue">本人出席</Tag> : 
          <Tag color="orange">委托代表({record.delegateName})</Tag>;
      }
    }
  ];

  // 导出参会人员名单
  const handleExportAttendees = () => {
    message.success('导出参会人员名单成功');
    // TODO: 实现导出功能
  };

  // 返回列表页
  const handleBack = () => {
    navigate('/statistics/meeting');
  };

  return (
    <div className="statistics-container">
      {/* 返回按钮 */}
      <Button 
        type="link" 
        icon={<ArrowLeftOutlined />} 
        onClick={handleBack}
        style={{ marginBottom: 16, marginLeft: -10 }}
      >
        返回列表
      </Button>

      {/* 会议信息卡片 */}
      <Card 
        className="detail-card" 
        loading={loading}
        title="会议信息"
      >
        {meetingInfo && (
          <div className="meeting-detail-info">
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">会议名称：</span>
                <span className="detail-value">{meetingInfo.name}</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">会议类型：</span>
                <span className="detail-value">{getMeetingTypeTag(meetingInfo.type)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">会议时间：</span>
                <span className="detail-value">{meetingInfo.time}</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">会议地点：</span>
                <span className="detail-value">{meetingInfo.location}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">出席率：</span>
                <span className="detail-value" style={{ 
                  color: parseFloat(meetingInfo.attendanceRate) >= 90 ? '#52c41a' : 
                         (parseFloat(meetingInfo.attendanceRate) >= 80 ? '#faad14' : '#f5222d') 
                }}>
                  {meetingInfo.attendanceRate}
                </span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">报名人数：</span>
                <span className="detail-value">{meetingInfo.totalRegistrations}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">本人出席：</span>
                <span className="detail-value">{meetingInfo.selfAttendance}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">委托出席：</span>
                <span className="detail-value">{meetingInfo.delegateAttendance}</span>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* 参会人员卡片 */}
      <Card 
        className="detail-card" 
        title="参会人员名单" 
        style={{ marginTop: 24 }}
        extra={
          <Button onClick={handleExportAttendees}>
            导出参会人员
          </Button>
        }
      >
        <div className="attendee-search" style={{ marginBottom: 16 }}>
          <Input.Search 
            placeholder="搜索姓名或手机号" 
            style={{ width: 250 }}
            enterButton
          />
        </div>
        <Table 
          columns={attendeeColumns}
          dataSource={attendees}
          rowKey="id"
          loading={loading}
          pagination={false}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default MeetingDetail; 