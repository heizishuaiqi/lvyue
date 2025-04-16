import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Table, Tag, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getMeetingDetail, getMeetingAttendees } from '../../services/api';
import styles from './MeetingDetail.module.less';

const MeetingDetail = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meetingData, attendeesData] = await Promise.all([
          getMeetingDetail(meetingId),
          getMeetingAttendees(meetingId)
        ]);
        setMeeting(meetingData);
        setAttendees(attendeesData);
      } catch (error) {
        console.error('获取会议详情失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [meetingId]);

  const attendeeColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '出席状态',
      dataIndex: 'attendanceType',
      key: 'attendanceType',
      render: (type) => {
        const colors = {
          1: 'success',
          2: 'warning',
          3: 'error',
        };
        const texts = {
          1: '已出席',
          2: '请假',
          3: '未出席',
        };
        return <Tag color={colors[type]}>{texts[type]}</Tag>;
      },
    },
    {
      title: '签到时间',
      dataIndex: 'checkInTime',
      key: 'checkInTime',
    },
  ];

  const handleBack = () => {
    navigate('/statistics');
  };

  return (
    <div className={styles.detailPage}>
      <Button 
        type="link" 
        icon={<ArrowLeftOutlined />} 
        onClick={handleBack}
        className={styles.backButton}
      >
        返回列表
      </Button>

      <Card 
        title="会议详情" 
        loading={loading}
        className={styles.detailCard}
      >
        {meeting && (
          <div className={styles.meetingInfo}>
            <div className={styles.infoItem}>
              <span className={styles.label}>会议名称：</span>
              <span>{meeting.title}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>会议时间：</span>
              <span>{meeting.startTime} - {meeting.endTime}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>会议地点：</span>
              <span>{meeting.location}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>出席率：</span>
              <span>{meeting.attendanceRate}%</span>
            </div>
          </div>
        )}
      </Card>

      <Card 
        title="参会人员" 
        className={styles.attendeesCard}
      >
        <Table 
          columns={attendeeColumns} 
          dataSource={attendees}
          rowKey="id"
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default MeetingDetail; 