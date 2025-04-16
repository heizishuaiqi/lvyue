import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Table, Button, message, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './Statistics.css';

const PersonalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [personInfo, setPersonInfo] = useState(null);
  const [meetingRecords, setMeetingRecords] = useState([]);

  // 获取个人信息和参会记录
  useEffect(() => {
    const fetchPersonDetail = async () => {
      setLoading(true);
      try {
        // TODO: 替换为实际API调用
        // 模拟API响应数据
        const mockData = {
          '1': {
            personInfo: {
              id: '1',
              name: '张三',
              phone: '13800138000',
              role: '理事',
              workUnit: '中国电子科技集团',
              workPosition: '高级工程师',
              directorMeetings: 2,
              executiveMeetings: 1,
              academicMeetings: 1
            },
            meetingRecords: [
              {
                id: '1',
                name: '2024年第一季度理事工作会议',
                type: 'director',
                time: '2024-03-15 14:00-16:00',
                location: '总部大楼3层会议室A',
                attendType: 'self'
              },
              {
                id: '2',
                name: '2024年第二季度理事工作会议',
                type: 'director',
                time: '2024-05-15 14:00-16:00',
                location: '总部大楼5层会议室B',
                attendType: 'self'
              },
              {
                id: '3',
                name: '2024年常务理事第一次会议',
                type: 'executive',
                time: '2024-04-10 10:00-12:00',
                location: '线上会议',
                attendType: 'delegate',
                delegateName: '小张'
              },
              {
                id: '4',
                name: '2024年信息技术发展研讨会',
                type: 'academic',
                time: '2024-03-25 09:00-17:00',
                location: '科技园国际会议中心',
                attendType: 'self'
              }
            ]
          },
          '2': {
            personInfo: {
              id: '2',
              name: '李四',
              phone: '13900139000',
              role: '常务理事',
              workUnit: '华为技术有限公司',
              workPosition: '技术总监',
              directorMeetings: 3,
              executiveMeetings: 2,
              academicMeetings: 2
            },
            meetingRecords: [
              {
                id: '1',
                name: '2024年第一季度理事工作会议',
                type: 'director',
                time: '2024-03-15 14:00-16:00',
                location: '总部大楼3层会议室A',
                attendType: 'self'
              },
              {
                id: '2',
                name: '2024年第二季度理事工作会议',
                type: 'director',
                time: '2024-05-15 14:00-16:00',
                location: '总部大楼5层会议室B',
                attendType: 'self'
              },
              {
                id: '3',
                name: '2024年第三季度理事工作会议',
                type: 'director',
                time: '2024-08-15 14:00-16:00',
                location: '总部大楼3层会议室A',
                attendType: 'self'
              },
              {
                id: '4',
                name: '2024年常务理事第一次会议',
                type: 'executive',
                time: '2024-04-10 10:00-12:00',
                location: '线上会议',
                attendType: 'self'
              },
              {
                id: '5',
                name: '2024年常务理事第二次会议',
                type: 'executive',
                time: '2024-07-10 10:00-12:00',
                location: '总部大楼5层会议室B',
                attendType: 'self'
              },
              {
                id: '6',
                name: '2024年信息技术发展研讨会',
                type: 'academic',
                time: '2024-03-25 09:00-17:00',
                location: '科技园国际会议中心',
                attendType: 'self'
              },
              {
                id: '7',
                name: '2024年人工智能学术研讨会',
                type: 'academic',
                time: '2024-06-15 09:00-17:00',
                location: '北京国际会议中心',
                attendType: 'self'
              }
            ]
          },
          '3': {
            personInfo: {
              id: '3',
              name: '王五',
              phone: '13700137000',
              role: '监事',
              workUnit: '清华大学',
              workPosition: '教授',
              directorMeetings: 1,
              executiveMeetings: 1,
              academicMeetings: 3
            },
            meetingRecords: [
              {
                id: '1',
                name: '2024年第一季度理事工作会议',
                type: 'director',
                time: '2024-03-15 14:00-16:00',
                location: '总部大楼3层会议室A',
                attendType: 'delegate',
                delegateName: '小李'
              },
              {
                id: '2',
                name: '2024年常务理事第一次会议',
                type: 'executive',
                time: '2024-04-10 10:00-12:00',
                location: '线上会议',
                attendType: 'self'
              },
              {
                id: '3',
                name: '2024年信息技术发展研讨会',
                type: 'academic',
                time: '2024-03-25 09:00-17:00',
                location: '科技园国际会议中心',
                attendType: 'self'
              },
              {
                id: '4',
                name: '2024年人工智能学术研讨会',
                type: 'academic',
                time: '2024-06-15 09:00-17:00',
                location: '北京国际会议中心',
                attendType: 'self'
              },
              {
                id: '5',
                name: '2024年集成电路学术研讨会',
                type: 'academic',
                time: '2024-09-20 09:00-17:00',
                location: '深圳会展中心',
                attendType: 'self'
              }
            ]
          }
        };

        const response = {
          code: 200,
          data: mockData[id] || {
            personInfo: {
              id: id,
              name: '未知用户',
              phone: '--',
              role: '--',
              workUnit: '--',
              workPosition: '--',
              directorMeetings: 0,
              executiveMeetings: 0,
              academicMeetings: 0
            },
            meetingRecords: []
          }
        };

        setPersonInfo(response.data.personInfo);
        // 对会议记录按时间倒序排序
        const sortedRecords = [...response.data.meetingRecords].sort((a, b) => {
          // 从时间字符串中提取日期部分进行比较
          const timeA = new Date(a.time.split(' ')[0]);
          const timeB = new Date(b.time.split(' ')[0]);
          return timeB - timeA;
        });
        setMeetingRecords(sortedRecords);
      } catch (error) {
        console.error('获取个人详情失败:', error);
        message.error('获取个人详情失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPersonDetail();
    }
  }, [id]);

  // 会议类型映射
  const meetingTypeMap = {
    director: '理事会议',
    executive: '常务理事会议',
    academic: '学术会议'
  };

  // 会议记录表格列定义
  const meetingColumns = [
    {
      title: '会议名称',
      dataIndex: 'name',
      key: 'name',
      width: 280
    },
    {
      title: '会议类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type) => (
        <Tag color={
          type === 'director' ? 'blue' : 
          type === 'executive' ? 'purple' : 
          'green'
        }>
          {meetingTypeMap[type] || type}
        </Tag>
      )
    },
    {
      title: '会议时间',
      dataIndex: 'time',
      key: 'time',
      width: 180
    },
    {
      title: '会议地点',
      dataIndex: 'location',
      key: 'location',
      width: 200
    },
    {
      title: '出席方式',
      dataIndex: 'attendType',
      key: 'attendType',
      width: 120,
      render: (type, record) => {
        if (record.type === 'academic') {
          return '--';
        }
        return type === 'self' ? 
          <Tag color="blue">本人出席</Tag> : 
          <Tag color="orange">委托代表({record.delegateName})</Tag>;
      }
    }
  ];

  // 返回列表页
  const handleBack = () => {
    navigate('/statistics/personal');
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

      {/* 个人信息卡片 */}
      <Card 
        className="detail-card" 
        loading={loading}
        title="个人信息"
      >
        {personInfo && (
          <div className="person-detail-info">
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">姓名：</span>
                <span className="detail-value">{personInfo.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">手机号码：</span>
                <span className="detail-value">{personInfo.phone}</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">学会职务：</span>
                <span className="detail-value">{personInfo.role}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">工作单位：</span>
                <span className="detail-value">{personInfo.workUnit}</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">工作职务：</span>
                <span className="detail-value">{personInfo.workPosition}</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">理事会议：</span>
                <span className="detail-value">{personInfo.directorMeetings}次</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">常务理事会议：</span>
                <span className="detail-value">{personInfo.executiveMeetings}次</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">学术会议：</span>
                <span className="detail-value">{personInfo.academicMeetings}次</span>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* 参会记录卡片 */}
      <Card 
        className="detail-card" 
        title="参会记录" 
        style={{ marginTop: 24 }}
      >
        <Table 
          columns={meetingColumns}
          dataSource={meetingRecords}
          rowKey="id"
          loading={loading}
          pagination={false}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default PersonalDetail; 