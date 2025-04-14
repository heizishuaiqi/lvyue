import React, { useState } from 'react';
import './style.css';

const AcademicMeeting = () => {
  // 状态管理
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState(null);

  // 模拟会议数据
  const [meetings] = useState([
    {
      id: '001',
      name: '2024年人工智能与机器学习研讨会',
      startTime: '2024-05-15 09:00',
      endTime: '2024-05-17 17:00',
      location: '北京国际会议中心',
      updatedAt: '2024-03-21 17:27:19'
    },
    {
      id: '002',
      name: '第二届集成电路设计与制造技术研讨会',
      startTime: '2024-06-20 09:00',
      endTime: '2024-06-22 17:00',
      location: '上海科技馆',
      updatedAt: '2024-03-20 15:30:00'
    },
    {
      id: '003',
      name: '5G通信技术发展研讨会',
      startTime: '2024-07-10 09:00',
      endTime: '2024-07-12 17:00',
      location: '深圳会展中心',
      updatedAt: '2024-03-19 09:15:00'
    }
  ]);

  // 处理搜索
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  // 获取过滤后的会议列表
  const getFilteredMeetings = () => {
    if (!searchText) {
      return meetings;
    }
    const searchLower = searchText.toLowerCase();
    return meetings.filter(meeting => 
      meeting.name.toLowerCase().includes(searchLower)
    );
  };

  // 获取当前页的会议列表
  const getCurrentPageMeetings = () => {
    const filteredMeetings = getFilteredMeetings();
    return filteredMeetings.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  };

  // 获取总页数
  const getTotalPages = () => {
    const filteredMeetings = getFilteredMeetings();
    return Math.ceil(filteredMeetings.length / pageSize);
  };

  // 处理创建会议
  const handleCreate = () => {
    setShowCreateModal(true);
  };

  // 处理编辑会议
  const handleEdit = (meeting) => {
    setCurrentMeeting(meeting);
    setShowEditModal(true);
  };

  // 处理删除会议
  const handleDelete = (meeting) => {
    setCurrentMeeting(meeting);
    setShowDeleteConfirm(true);
  };

  // 处理导入/导出
  const handleImport = () => {
    alert('导入功能开发中...');
  };

  const handleExport = () => {
    alert('导出功能开发中...');
  };

  return (
    <div className="academic-meeting-page">
      {/* 搜索和操作区 */}
      <div className="operation-bar">
        <div className="search-area">
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="请输入会议名称"
            className="search-input"
          />
          <button className="search-button">搜索</button>
        </div>
        <div className="action-area">
          <button className="action-button primary" onClick={handleCreate}>新建会议</button>
          <button className="action-button" onClick={handleImport}>导入</button>
          <button className="action-button" onClick={handleExport}>导出</button>
        </div>
      </div>

      {/* 表格区域 */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>会议名称</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>会议地点</th>
              <th>更新时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageMeetings().map(meeting => (
              <tr key={meeting.id}>
                <td>{meeting.name}</td>
                <td>{meeting.startTime}</td>
                <td>{meeting.endTime}</td>
                <td>{meeting.location}</td>
                <td>{meeting.updatedAt}</td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => handleEdit(meeting)}>编辑</button>
                    <button onClick={() => handleDelete(meeting)}>删除</button>
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
          共 {getFilteredMeetings().length} 条记录
        </div>
        <div className="page-buttons">
          <button
            className="page-button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            上一页
          </button>
          <button className="page-button active">{currentPage}</button>
          <button
            className="page-button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === getTotalPages()}
          >
            下一页
          </button>
        </div>
      </div>

      {/* 创建会议弹窗 */}
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>新建学术会议</h3>
            <form>
              <div className="form-group">
                <label>会议名称</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>开始时间</label>
                <input type="datetime-local" required />
              </div>
              <div className="form-group">
                <label>结束时间</label>
                <input type="datetime-local" required />
              </div>
              <div className="form-group">
                <label>会议地点</label>
                <input type="text" required />
              </div>
              <div className="modal-buttons">
                <button type="button" className="action-button" onClick={() => setShowCreateModal(false)}>取消</button>
                <button type="submit" className="action-button primary">确定</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 编辑会议弹窗 */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>编辑学术会议</h3>
            <form>
              <div className="form-group">
                <label>会议名称</label>
                <input type="text" defaultValue={currentMeeting?.name} required />
              </div>
              <div className="form-group">
                <label>开始时间</label>
                <input type="datetime-local" defaultValue={currentMeeting?.startTime} required />
              </div>
              <div className="form-group">
                <label>结束时间</label>
                <input type="datetime-local" defaultValue={currentMeeting?.endTime} required />
              </div>
              <div className="form-group">
                <label>会议地点</label>
                <input type="text" defaultValue={currentMeeting?.location} required />
              </div>
              <div className="modal-buttons">
                <button type="button" className="action-button" onClick={() => setShowEditModal(false)}>取消</button>
                <button type="submit" className="action-button primary">确定</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 删除确认弹窗 */}
      {showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content">
            <h3>确认删除</h3>
            <p>确定要删除该会议吗？此操作不可恢复。</p>
            <div className="modal-buttons">
              <button className="action-button" onClick={() => setShowDeleteConfirm(false)}>取消</button>
              <button className="action-button danger">确定删除</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicMeeting; 