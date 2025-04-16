import React, { useState } from 'react';
import RegistrationDetailModal from '../../components/RegistrationDetailModal';
import AuditModal from '../../components/AuditModal';
import SyncModal from '../../components/SyncModal';
import './style.css';

const Registration = () => {
  // 状态管理
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [activeTab, setActiveTab] = useState('registration'); // 新增：当前激活的tab

  // 详情弹窗状态
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  // 审核弹窗状态
  const [isAuditModalVisible, setIsAuditModalVisible] = useState(false);
  const [selectedAuditRegistration, setSelectedAuditRegistration] = useState(null);
  
  // 同步弹窗状态
  const [isSyncModalVisible, setIsSyncModalVisible] = useState(false);
  const [selectedSyncRegistration, setSelectedSyncRegistration] = useState(null);

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
  const [registrations, setRegistrations] = useState([
    {
      id: '001',
      name: '张三',
      phone: '13800138000',
      selectedRole: '理事',
      societyPosition: '副会长',
      workUnit: '中国电子科技集团公司',
      workPosition: '高级工程师',
      attendType: '本人出席',
      status: '审核通过',
      syncStatus: '未同步',
      registerTime: '2024-03-01 10:24:36',
      meetingId: '001',
      meetingName: '2024年理事会议',
      meetingType: '理事会议',
      meetingDate: '2024-05-15',
      meetingLocation: '总部大楼3层会议室A'
    },
    {
      id: '002',
      name: '李四',
      phone: '13900139000',
      selectedRole: '常务理事',
      societyPosition: '会长',
      workUnit: '华为技术有限公司',
      workPosition: '技术总监',
      attendType: '委托代表出席',
      status: '审核通过',
      syncStatus: '未同步',
      registerTime: '2024-03-02 14:35:22',
      delegateName: '刘小明',
      delegatePhone: '13911112222',
      delegateUnit: '华为技术有限公司',
      delegatePosition: '高级研究员',
      meetingId: '004',
      meetingName: '2024年中期工作总结会议',
      meetingType: '常务理事会议',
      meetingDate: '2024-06-20',
      meetingLocation: '北京国际会议中心'
    },
    {
      id: '003',
      name: '王五',
      phone: '13700137000',
      selectedRole: '监事',
      societyPosition: '监事长',
      workUnit: '清华大学',
      workPosition: '教授',
      attendType: '本人出席',
      status: '审核通过',
      syncStatus: '未同步',
      registerTime: '2024-03-05 09:17:43',
      meetingId: '001',
      meetingName: '2024年理事会议',
      meetingType: '监事会议',
      meetingDate: '2024-05-15',
      meetingLocation: '总部大楼3层会议室A'
    },
    {
      id: '004',
      name: '赵六',
      phone: '13600136000',
      selectedRole: '分支机构负责人',
      societyPosition: '理事',
      workUnit: '中国科学院计算技术研究所',
      workPosition: '研究员',
      attendType: '本人出席',
      status: '审核通过',
      syncStatus: '已同步',
      registerTime: '2024-03-10 15:45:12',
      meetingId: '002',
      meetingName: '2024年学术研讨会',
      meetingType: '学术会议',
      meetingDate: '2024-06-20',
      meetingLocation: '上海科技馆'
    },
    {
      id: '005',
      name: '钱七',
      phone: '13500135000',
      selectedRole: '地方学会负责人',
      societyPosition: '秘书长',
      workUnit: '上海交通大学',
      workPosition: '副教授',
      attendType: '委托代表出席',
      status: '审核通过',
      syncStatus: '未同步',
      registerTime: '2024-03-12 11:23:57',
      delegateName: '张小花',
      delegatePhone: '13822223333',
      delegateUnit: '上海交通大学',
      delegatePosition: '讲师',
      meetingId: '002',
      meetingName: '2024年学术研讨会',
      meetingType: '学术会议',
      meetingDate: '2024-06-20',
      meetingLocation: '上海科技馆'
    },
    {
      id: '006',
      name: '孙八',
      phone: '13400134000',
      selectedRole: '理事',
      societyPosition: '常务理事',
      workUnit: '阿里巴巴集团',
      workPosition: '技术专家',
      attendType: '本人出席',
      status: '审核未通过',
      syncStatus: '未同步',
      registerTime: '2024-03-15 16:38:21',
      meetingId: '001',
      meetingName: '2024年理事会议',
      meetingType: '理事会议',
      meetingDate: '2024-05-15',
      meetingLocation: '总部大楼3层会议室A'
    },
    {
      id: '007',
      name: '周九',
      phone: '13300133000',
      selectedRole: '常务理事',
      societyPosition: '副秘书长',
      workUnit: '腾讯科技',
      workPosition: '高级研究员',
      attendType: '本人出席',
      status: '审核通过',
      syncStatus: '未同步',
      registerTime: '2024-03-18 10:12:44',
      meetingId: '004',
      meetingName: '2024年中期工作总结会议',
      meetingType: '常务理事会议',
      meetingDate: '2024-06-20',
      meetingLocation: '北京国际会议中心'
    },
    {
      id: '008',
      name: '吴十',
      phone: '13200132000',
      selectedRole: '监事',
      societyPosition: '监事',
      workUnit: '北京邮电大学',
      workPosition: '教授',
      attendType: '委托代表出席',
      status: '审核通过',
      syncStatus: '已同步',
      registerTime: '2024-03-20 14:56:32',
      delegateName: '李小龙',
      delegatePhone: '13733334444',
      delegateUnit: '北京邮电大学',
      delegatePosition: '副教授',
      meetingId: '001',
      meetingName: '2024年理事会议',
      meetingType: '监事会议',
      meetingDate: '2024-05-15',
      meetingLocation: '总部大楼3层会议室A'
    },
    {
      id: '009',
      name: '郑十一',
      phone: '13100131000',
      selectedRole: '分支机构负责人',
      societyPosition: '副主任',
      workUnit: '中国移动通信集团',
      workPosition: '技术总监',
      attendType: '本人出席',
      status: '审核通过',
      syncStatus: '未同步',
      registerTime: '2024-03-22 09:45:18',
      meetingId: '003',
      meetingName: '2024年电子信息技术研讨会',
      meetingType: '学术会议',
      meetingDate: '2024-04-10',
      meetingLocation: '深圳会展中心'
    },
    {
      id: '010',
      name: '王十二',
      phone: '13000130000',
      selectedRole: '地方学会负责人',
      societyPosition: '理事',
      workUnit: '浙江大学',
      workPosition: '副教授',
      attendType: '本人出席',
      status: '审核未通过',
      syncStatus: '未同步',
      registerTime: '2024-03-25 16:27:39',
      meetingId: '003',
      meetingName: '2024年电子信息技术研讨会',
      meetingType: '学术会议',
      meetingDate: '2024-04-10',
      meetingLocation: '深圳会展中心'
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

  // 处理审核
  const handleAudit = (status, registration) => {
    // 确保status只能是1(审核通过)或2(审核未通过)
    const statusText = status === 2 ? '审核未通过' : '审核通过';
    
    // TODO: 调用后端 API 更新审核状态
    console.log('更新审核状态:', registration.id, statusText);
    
    // 更新本地状态
    const updatedRegistrations = registrations.map(reg => 
      reg.id === registration.id ? { 
        ...reg, 
        status: statusText
      } : reg
    );
    setRegistrations(updatedRegistrations);
    
    // 关闭弹窗
    setIsAuditModalVisible(false);
    setSelectedAuditRegistration(null);
  };
  
  // 处理同步
  const handleSync = (registrationId, syncStatus, updatedRegistration) => {
    // TODO: 调用后端 API 更新同步状态
    console.log('更新同步状态:', registrationId, syncStatus);
    console.log('更新后的工作单位和职务:', updatedRegistration.workUnit, updatedRegistration.workPosition);
    
    // 更新本地状态
    const updatedRegistrations = registrations.map(reg => 
      reg.id === registrationId ? { 
        ...reg, 
        syncStatus,
        // 更新工作单位和工作职务
        workUnit: updatedRegistration.workUnit,
        workPosition: updatedRegistration.workPosition
      } : reg
    );
    setRegistrations(updatedRegistrations);
  };

  // 处理打开审核弹窗
  const handleOpenAudit = (registration) => {
    setSelectedAuditRegistration(registration);
    setIsAuditModalVisible(true);
  };
  
  // 处理打开同步弹窗
  const handleOpenSync = (registration) => {
    setSelectedSyncRegistration(registration);
    setIsSyncModalVisible(true);
  };

  // 处理查看详情
  const handleViewDetail = (registration) => {
    setSelectedRegistration(registration);
    setIsDetailModalVisible(true);
  };

  // 根据当前tab返回表格列
  const getTableColumns = () => {
    const commonColumns = [
      "姓名",
      "手机号码",
      "身份",
      "学会职务",
      "单位名称",
      "单位职务",
      "会议名称",
      "会议时间",
      "出席方式",
    ];

    if (activeTab === 'registration') {
      return [...commonColumns, "审核状态", "同步状态", "操作"];
    } else {
      return [...commonColumns, "操作"];
    }
  };

  // 根据当前tab返回操作按钮
  const renderActionButtons = (registration) => {
    if (activeTab === 'registration') {
      return (
        <>
          <button 
            className="table-button primary"
            onClick={() => handleOpenAudit(registration)}
          >
            审核
          </button>
          <button 
            className="table-button info"
            onClick={() => handleViewDetail(registration)}
          >
            详情
          </button>
          <button 
            className="table-button success"
            onClick={() => handleOpenSync(registration)}
          >
            同步
          </button>
        </>
      );
    } else {
      return (
        <button 
          className="table-button info"
          onClick={() => handleViewDetail(registration)}
        >
          详情
        </button>
      );
    }
  };

  return (
    <div className="registration-page">
      {/* Tab切换区域 */}
      <div className="tab-container">
        <div 
          className={`tab-item ${activeTab === 'registration' ? 'active' : ''}`}
          onClick={() => setActiveTab('registration')}
        >
          报名信息
        </div>
        <div 
          className={`tab-item ${activeTab === 'attendance' ? 'active' : ''}`}
          onClick={() => setActiveTab('attendance')}
        >
          参会信息（履职依据）
        </div>
      </div>

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
          <button className="action-button">
            {activeTab === 'registration' ? '导出报名信息' : '导入参会信息'}
          </button>
        </div>
      </div>

      {/* 表格区域 */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {getTableColumns().map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registrations.map(registration => (
              <tr key={registration.id}>
                <td>{registration.name}</td>
                <td>{registration.phone}</td>
                <td>{registration.selectedRole}</td>
                <td>{registration.societyPosition}</td>
                <td>{registration.workUnit}</td>
                <td>{registration.workPosition}</td>
                <td>{registration.meetingName}</td>
                <td>{registration.meetingDate}</td>
                <td>{registration.attendType}</td>
                {activeTab === 'registration' && (
                  <>
                    <td>
                      <span className={`status-tag ${
                        registration.status === '审核通过' ? 'success' : 'reject'
                      }`}>
                        {registration.status}
                      </span>
                    </td>
                    <td>
                      <span className={`status-tag ${
                        registration.syncStatus === '已同步' ? 'success' : 'pending'
                      }`}>
                        {registration.syncStatus}
                      </span>
                    </td>
                  </>
                )}
                <td>
                  <div className="action-buttons">
                    {renderActionButtons(registration)}
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

      {/* 报名详情弹窗 */}
      <RegistrationDetailModal
        visible={isDetailModalVisible}
        registration={selectedRegistration}
        onClose={() => {
          setIsDetailModalVisible(false);
          setSelectedRegistration(null);
        }}
      />

      {/* 审核弹窗 */}
      <AuditModal
        visible={isAuditModalVisible}
        registration={selectedAuditRegistration}
        onClose={() => {
          setIsAuditModalVisible(false);
          setSelectedAuditRegistration(null);
        }}
        onAudit={handleAudit}
      />
      
      {/* 同步弹窗 */}
      <SyncModal
        visible={isSyncModalVisible}
        registration={selectedSyncRegistration}
        onClose={() => {
          setIsSyncModalVisible(false);
          setSelectedSyncRegistration(null);
        }}
        onSync={handleSync}
      />
    </div>
  );
};

export default Registration; 