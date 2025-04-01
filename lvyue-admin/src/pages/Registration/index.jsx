import React, { useState } from 'react';
import './style.css';

const Registration = () => {
  // 状态管理
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // 模拟会议数据
  const [meetings] = useState([
    {
      id: '001',
      name: '2024年理事会议',
      date: '2024-05-15',
      type: '理事会议'
    },
    {
      id: '002',
      name: '2024年学术研讨会',
      date: '2024-06-20',
      type: '学术会议'
    },
    {
      id: '003',
      name: '2024年电子信息技术研讨会',
      date: '2024-04-10',
      type: '学术会议'
    },
    {
      id: '004',
      name: '2024年中期工作总结会议',
      date: '2024-06-20',
      type: '常务理事会议'
    }
  ]);

  // 模拟报名数据
  const [registrations] = useState([
    {
      id: '001',
      name: '张三',
      phone: '13800138000',
      role: '理事',
      workUnit: '中国电子科技集团公司',
      workPosition: '高级工程师',
      attendType: '本人出席',
      status: '待审核',
      remark: ''
    },
    {
      id: '002',
      name: '李四',
      phone: '13900139000',
      role: '常务理事',
      workUnit: '华为技术有限公司',
      workPosition: '技术总监',
      attendType: '委托代表出席',
      status: '已通过',
      remark: '已确认参加'
    },
    {
      id: '003',
      name: '王五',
      phone: '13700137000',
      role: '监事',
      workUnit: '清华大学',
      workPosition: '教授',
      attendType: '本人出席',
      status: '待审核',
      remark: ''
    },
    {
      id: '004',
      name: '赵六',
      phone: '13600136000',
      role: '分支机构负责人',
      workUnit: '中国科学院计算技术研究所',
      workPosition: '研究员',
      attendType: '本人出席',
      status: '已通过',
      remark: '需要安排住宿'
    },
    {
      id: '005',
      name: '钱七',
      phone: '13500135000',
      role: '地方学会负责人',
      workUnit: '上海交通大学',
      workPosition: '副教授',
      attendType: '委托代表出席',
      status: '待审核',
      remark: ''
    },
    {
      id: '006',
      name: '孙八',
      phone: '13400134000',
      role: '理事',
      workUnit: '阿里巴巴集团',
      workPosition: '技术专家',
      attendType: '本人出席',
      status: '已通过',
      remark: '需要特殊餐饮安排'
    },
    {
      id: '007',
      name: '周九',
      phone: '13300133000',
      role: '常务理事',
      workUnit: '腾讯科技',
      workPosition: '高级研究员',
      attendType: '本人出席',
      status: '待审核',
      remark: ''
    },
    {
      id: '008',
      name: '吴十',
      phone: '13200132000',
      role: '监事',
      workUnit: '北京邮电大学',
      workPosition: '教授',
      attendType: '委托代表出席',
      status: '已通过',
      remark: '委托代表已确认'
    },
    {
      id: '009',
      name: '郑十一',
      phone: '13100131000',
      role: '分支机构负责人',
      workUnit: '中国移动通信集团',
      workPosition: '技术总监',
      attendType: '本人出席',
      status: '待审核',
      remark: ''
    },
    {
      id: '010',
      name: '王十二',
      phone: '13000130000',
      role: '地方学会负责人',
      workUnit: '浙江大学',
      workPosition: '副教授',
      attendType: '本人出席',
      status: '已通过',
      remark: '需要提前安排交通'
    }
  ]);

  // 处理搜索
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  // 处理会议选择
  const handleMeetingChange = (e) => {
    setSelectedMeeting(e.target.value);
    setCurrentPage(1);
  };

  // 处理审核状态
  const handleStatusChange = (registrationId, newStatus) => {
    // TODO: 实现审核状态更新
    console.log('更新审核状态:', registrationId, newStatus);
  };

  return (
    <div className="registration-page">
      {/* 搜索和筛选区 */}
      <div className="operation-bar">
        <div className="filter-area">
          <select 
            className="meeting-select"
            value={selectedMeeting || ''}
            onChange={handleMeetingChange}
          >
            <option value="">选择会议</option>
            {meetings.map(meeting => (
              <option key={meeting.id} value={meeting.id}>
                {meeting.name}
              </option>
            ))}
          </select>
        </div>
        <div className="search-area">
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="请输入姓名/手机号"
            className="search-input"
          />
          <button className="search-button">搜索</button>
        </div>
        <div className="action-area">
          <button className="action-button">导出报名信息</button>
        </div>
      </div>

      {/* 表格区域 */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>姓名</th>
              <th>手机号码</th>
              <th>学会职务</th>
              <th>工作单位</th>
              <th>工作职务</th>
              <th>出席类型</th>
              <th>审核状态</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(registration => (
              <tr key={registration.id}>
                <td>{registration.name}</td>
                <td>{registration.phone}</td>
                <td>{registration.role}</td>
                <td>{registration.workUnit}</td>
                <td>{registration.workPosition}</td>
                <td>{registration.attendType}</td>
                <td>
                  <span className={`status-tag ${registration.status === '已通过' ? 'success' : 'pending'}`}>
                    {registration.status}
                  </span>
                </td>
                <td>{registration.remark}</td>
                <td>
                  <div className="action-buttons">
                    {registration.status === '待审核' ? (
                      <>
                        <button 
                          className="table-button success"
                          onClick={() => handleStatusChange(registration.id, '已通过')}
                        >
                          通过
                        </button>
                        <button 
                          className="table-button danger"
                          onClick={() => handleStatusChange(registration.id, '已拒绝')}
                        >
                          拒绝
                        </button>
                      </>
                    ) : (
                      <button className="table-button">查看详情</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页区域 */}
      <div className="pagination">
        <div className="page-info">
          共 {registrations.length} 条记录
        </div>
        <div className="page-buttons">
          <button
            className="page-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            上一页
          </button>
          <button className="page-button active">{currentPage}</button>
          <button
            className="page-button"
            disabled={currentPage * pageSize >= registrations.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration; 