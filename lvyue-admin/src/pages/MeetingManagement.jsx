import React, { useState, useEffect } from 'react';
import MeetingModal from '../components/MeetingModal';
import './MeetingManagement.css';

const MeetingManagement = () => {
  // 会议列表数据
  const [meetings, setMeetings] = useState([]);
  // 分页相关
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  // 搜索和筛选
  const [searchName, setSearchName] = useState('');
  const [dateRange, setDateRange] = useState([]);
  // 弹窗控制
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState(null);

  // 获取会议列表数据
  const fetchMeetings = async () => {
    // TODO: 调用后端 API 获取会议列表
    // 这里先使用模拟数据
    const mockData = [
      {
        id: 1,
        type: '理事会议',
        form: '线下会议',
        name: '2024年度理事工作会议',
        startTime: '2024-03-15T09:00',
        endTime: '2024-03-15T17:00',
        location: '北京市海淀区',
        isRegistrationOpen: true,
        updatedAt: '2024-03-01 10:00:00'
      },
      {
        id: 2,
        type: '常务理事会议',
        form: '线上会议',
        name: '2024年第一季度常务理事会议',
        startTime: '2024-03-20T14:00',
        endTime: '2024-03-20T16:00',
        location: '线上会议',
        isRegistrationOpen: false,
        updatedAt: '2024-03-05 15:00:00'
      },
      {
        id: 3,
        type: '学术会议',
        form: '线下会议',
        name: '2024年电子信息技术研讨会',
        startTime: '2024-04-10T09:00',
        endTime: '2024-04-12T17:00',
        location: '上海市浦东新区',
        isRegistrationOpen: true,
        updatedAt: '2024-03-08 09:30:00'
      },
      {
        id: 4,
        type: '理事会议',
        form: '线上会议',
        name: '2024年第二季度理事会议',
        startTime: '2024-05-15T14:00',
        endTime: '2024-05-15T17:00',
        location: '线上会议',
        isRegistrationOpen: true,
        updatedAt: '2024-03-10 16:45:00'
      },
      {
        id: 5,
        type: '学术会议',
        form: '线下会议',
        name: '人工智能与电子工程前沿论坛',
        startTime: '2024-06-01T09:00',
        endTime: '2024-06-03T17:00',
        location: '深圳市南山区',
        isRegistrationOpen: true,
        updatedAt: '2024-03-12 11:20:00'
      },
      {
        id: 6,
        type: '常务理事会议',
        form: '线下会议',
        name: '2024年中期工作总结会议',
        startTime: '2024-06-20T09:00',
        endTime: '2024-06-20T17:00',
        location: '广州市天河区',
        isRegistrationOpen: false,
        updatedAt: '2024-03-15 14:30:00'
      },
      {
        id: 7,
        type: '学术会议',
        form: '线上会议',
        name: '5G通信技术发展研讨会',
        startTime: '2024-07-05T09:00',
        endTime: '2024-07-05T17:00',
        location: '线上会议',
        isRegistrationOpen: true,
        updatedAt: '2024-03-18 10:15:00'
      },
      {
        id: 8,
        type: '理事会议',
        form: '线下会议',
        name: '2024年第三季度理事会议',
        startTime: '2024-08-15T09:00',
        endTime: '2024-08-15T17:00',
        location: '成都市高新区',
        isRegistrationOpen: false,
        updatedAt: '2024-03-20 09:00:00'
      },
      {
        id: 9,
        type: '学术会议',
        form: '线下会议',
        name: '集成电路设计与制造研讨会',
        startTime: '2024-09-10T09:00',
        endTime: '2024-09-12T17:00',
        location: '武汉市东湖高新区',
        isRegistrationOpen: true,
        updatedAt: '2024-03-22 16:40:00'
      },
      {
        id: 10,
        type: '常务理事会议',
        form: '线上会议',
        name: '2024年第三季度常务理事会议',
        startTime: '2024-09-20T14:00',
        endTime: '2024-09-20T16:00',
        location: '线上会议',
        isRegistrationOpen: true,
        updatedAt: '2024-03-25 11:30:00'
      }
    ];
    setMeetings(mockData);
    setTotal(mockData.length);
  };

  useEffect(() => {
    fetchMeetings();
  }, [currentPage, pageSize, searchName, dateRange]);

  // 处理创建会议
  const handleCreate = () => {
    setIsCreateModalVisible(true);
  };

  // 处理编辑会议
  const handleEdit = (meeting) => {
    setCurrentMeeting(meeting);
    setIsEditModalVisible(true);
  };

  // 处理删除会议
  const handleDelete = async (id) => {
    if (window.confirm('确定要删除该会议吗？')) {
      // TODO: 调用后端 API 删除会议
      console.log('删除会议:', id);
    }
  };

  // 处理报名开关
  const handleToggleRegistration = async (id, currentStatus) => {
    // TODO: 调用后端 API 切换报名状态
    console.log('切换报名状态:', id, !currentStatus);
  };

  // 处理创建会议提交
  const handleCreateSubmit = async (formData) => {
    // TODO: 调用后端 API 创建会议
    console.log('创建会议:', formData);
    setIsCreateModalVisible(false);
    fetchMeetings();
  };

  // 处理编辑会议提交
  const handleEditSubmit = async (formData) => {
    // TODO: 调用后端 API 更新会议
    console.log('更新会议:', formData);
    setIsEditModalVisible(false);
    setCurrentMeeting(null);
    fetchMeetings();
  };

  return (
    <div className="meeting-management">
      {/* 顶部操作栏 */}
      <div className="meeting-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="搜索会议名称"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="date"
            value={dateRange[0]}
            onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
          />
          <input
            type="date"
            value={dateRange[1]}
            onChange={(e) => setDateRange([dateRange[0], e.target.value])}
          />
        </div>
        <button className="create-btn" onClick={handleCreate}>
          创建会议
        </button>
      </div>

      {/* 会议列表 */}
      <div className="meeting-table">
        <table>
          <thead>
            <tr>
              <th>会议类型</th>
              <th>会议形式</th>
              <th>会议名称</th>
              <th>会议时间</th>
              <th>会议地点</th>
              <th>更新时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.id}>
                <td>{meeting.type}</td>
                <td>{meeting.form}</td>
                <td>{meeting.name}</td>
                <td>{`${meeting.startTime} - ${meeting.endTime}`}</td>
                <td>{meeting.location}</td>
                <td>{meeting.updatedAt}</td>
                <td>
                  <button onClick={() => handleEdit(meeting)}>编辑</button>
                  <button onClick={() => handleDelete(meeting.id)}>删除</button>
                  <button
                    onClick={() =>
                      handleToggleRegistration(meeting.id, meeting.isRegistrationOpen)
                    }
                  >
                    {meeting.isRegistrationOpen ? '关闭报名' : '开启报名'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页器 */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          上一页
        </button>
        <span>
          第 {currentPage} 页 / 共 {Math.ceil(total / pageSize)} 页
        </span>
        <button
          disabled={currentPage === Math.ceil(total / pageSize)}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          下一页
        </button>
      </div>

      {/* 创建会议弹窗 */}
      <MeetingModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onSubmit={handleCreateSubmit}
      />

      {/* 编辑会议弹窗 */}
      <MeetingModal
        visible={isEditModalVisible}
        onClose={() => {
          setIsEditModalVisible(false);
          setCurrentMeeting(null);
        }}
        onSubmit={handleEditSubmit}
        initialData={currentMeeting}
      />
    </div>
  );
};

export default MeetingManagement; 