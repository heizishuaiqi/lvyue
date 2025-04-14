import React, { useState, useEffect } from 'react';
import { Table, Card, Input, DatePicker, Button, Select, message, Tag, Space, Modal, Tooltip } from 'antd';
import { SearchOutlined, DownloadOutlined, EyeOutlined, BarChartOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';
import './Statistics.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

// 获取当前日期，格式化为YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 获取当月第一天
const getFirstDayOfMonth = () => {
  const date = new Date();
  date.setDate(1);
  return date;
};

const MeetingStatistics = () => {
  // 状态管理
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [searchParams, setSearchParams] = useState({
    startDate: formatDate(getFirstDayOfMonth()),
    endDate: formatDate(new Date()),
    meetingName: '',
    meetingType: 'all'
  });
  const [dateRange, setDateRange] = useState([null, null]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [attendeeLoading, setAttendeeLoading] = useState(false);

  // 加载会议统计数据
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      // TODO: 替换为实际API调用
      // 模拟API响应数据
      const response = {
        code: 200,
        data: {
          total: 8,
          list: [
            {
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
            {
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
            {
              id: '3',
              name: '2024年常务理事第一次会议',
              type: 'executive_director',
              time: '2024-04-10 10:00-12:00',
              location: '线上会议',
              totalRegistrations: 15,
              selfAttendance: 12,
              delegateAttendance: 3,
              attendanceRate: '100%'
            },
            {
              id: '4',
              name: '人工智能与电子工程学术交流会',
              type: 'academic',
              time: '2024-04-20 13:30-17:30',
              location: '上海科技馆报告厅',
              totalRegistrations: 56,
              selfAttendance: 52,
              delegateAttendance: 0,
              attendanceRate: '92.85%'
            },
            {
              id: '5',
              name: '2024年第二季度理事工作会议',
              type: 'director',
              time: '2024-05-15 14:00-16:00',
              location: '总部大楼5层会议室B',
              totalRegistrations: 25,
              selfAttendance: 18,
              delegateAttendance: 6,
              attendanceRate: '96%'
            },
            {
              id: '6',
              name: '2024年电子通信技术研讨会',
              type: 'academic',
              time: '2024-05-25 09:00-16:30',
              location: '北京国际会议中心',
              totalRegistrations: 65,
              selfAttendance: 60,
              delegateAttendance: 0,
              attendanceRate: '92.3%'
            },
            {
              id: '7',
              name: '2024年常务理事第二次会议',
              type: 'executive_director',
              time: '2024-06-10 10:00-12:00',
              location: '总部大楼3层会议室A',
              totalRegistrations: 15,
              selfAttendance: 13,
              delegateAttendance: 2,
              attendanceRate: '100%'
            },
            {
              id: '8',
              name: '集成电路设计与制造学术研讨会',
              type: 'academic',
              time: '2024-06-20 09:30-17:00',
              location: '深圳会展中心',
              totalRegistrations: 72,
              selfAttendance: 68,
              delegateAttendance: 0,
              attendanceRate: '94.4%'
            }
          ]
        }
      };
      
      setData(response.data.list);
      setPagination({
        ...pagination,
        total: response.data.total,
        current: params.current || pagination.current
      });
    } catch (error) {
      console.error('获取会议统计数据失败:', error);
      message.error('获取会议统计数据失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 首次加载和参数变化时获取数据
  useEffect(() => {
    fetchData({
      current: pagination.current,
      ...searchParams
    });
  }, [searchParams, pagination.current]);

  // 处理表格分页、排序、筛选变化
  const handleTableChange = (pagination) => {
    fetchData({
      current: pagination.current,
      ...searchParams
    });
  };

  // 处理日期范围变化
  const handleDateRangeChange = (dates) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange(dates);
      setSearchParams({
        ...searchParams,
        startDate: formatDate(dates[0].toDate()),
        endDate: formatDate(dates[1].toDate())
      });
    } else {
      setDateRange([null, null]);
      setSearchParams({
        ...searchParams,
        startDate: '',
        endDate: ''
      });
    }
  };

  // 处理会议名称搜索
  const handleMeetingNameChange = (e) => {
    const { value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      meetingName: value
    }));
  };

  // 处理会议类型选择
  const handleTypeChange = (value) => {
    setSearchParams(prev => ({
      ...prev,
      meetingType: value
    }));
  };

  // 处理搜索按钮点击
  const handleSearch = () => {
    setPagination({
      ...pagination,
      current: 1
    });
    fetchData({
      current: 1,
      ...searchParams
    });
  };

  // 处理导出数据
  const handleExport = () => {
    message.success('导出Excel成功');
    // TODO: 实现导出Excel功能
  };

  // 获取会议详情参会人员
  const fetchMeetingAttendees = async (meetingId) => {
    setAttendeeLoading(true);
    try {
      // TODO: 替换为实际API调用
      // 模拟API响应数据
      const response = {
        code: 200,
        data: [
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
            attendType: 'self'
          },
          {
            id: '4',
            name: '赵六',
            phone: '13600136000',
            role: '分支机构负责人',
            workUnit: '中国科学院计算所',
            workPosition: '研究员',
            attendType: 'delegate',
            delegateName: '钱七',
            delegatePhone: '13500135000'
          }
        ]
      };
      
      setAttendees(response.data);
    } catch (error) {
      console.error('获取参会人员数据失败:', error);
      message.error('获取参会人员数据失败，请稍后重试');
    } finally {
      setAttendeeLoading(false);
    }
  };

  // 查看会议详情
  const handleViewDetail = (record) => {
    setCurrentMeeting(record);
    fetchMeetingAttendees(record.id);
    setDetailVisible(true);
  };

  // 关闭详情弹窗
  const handleDetailClose = () => {
    setDetailVisible(false);
    setCurrentMeeting(null);
    setAttendees([]);
  };

  // 导出参会人员名单
  const handleExportAttendees = () => {
    message.success('导出参会人员名单成功');
    // TODO: 实现导出参会人员功能
  };

  // 获取会议类型标签
  const getMeetingTypeTag = (type) => {
    switch (type) {
      case 'director':
        return <Tag color="blue">理事会议</Tag>;
      case 'executive_director':
        return <Tag color="purple">常务理事会议</Tag>;
      case 'academic':
        return <Tag color="green">学术会议</Tag>;
      default:
        return <Tag>未知类型</Tag>;
    }
  };

  // 表格列定义
  const columns = [
    {
      title: '会议名称',
      dataIndex: 'name',
      key: 'name',
      width: 280,
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>
    },
    {
      title: '会议类型',
      dataIndex: 'type',
      key: 'type',
      width: 150,
      render: (type) => getMeetingTypeTag(type)
    },
    {
      title: '会议时间',
      dataIndex: 'time',
      key: 'time',
      width: 200
    },
    {
      title: '会议地点',
      dataIndex: 'location',
      key: 'location',
      width: 200
    },
    {
      title: '报名人数',
      dataIndex: 'totalRegistrations',
      key: 'totalRegistrations',
      width: 100,
      align: 'center'
    },
    {
      title: '本人出席',
      dataIndex: 'selfAttendance',
      key: 'selfAttendance',
      width: 100,
      align: 'center'
    },
    {
      title: '委托出席',
      dataIndex: 'delegateAttendance',
      key: 'delegateAttendance',
      width: 100,
      align: 'center'
    },
    {
      title: '出席率',
      dataIndex: 'attendanceRate',
      key: 'attendanceRate',
      width: 100,
      align: 'center',
      render: (rate) => (
        <span style={{ color: parseFloat(rate) >= 90 ? '#52c41a' : 
                       (parseFloat(rate) >= 80 ? '#faad14' : '#f5222d') }}>
          {rate}
        </span>
      )
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="查看详情">
            <Button 
              type="link" 
              icon={<EyeOutlined />} 
              onClick={() => handleViewDetail(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

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
        if (currentMeeting && currentMeeting.type === 'academic') {
          return '--';
        }
        return type === 'self' ? <Tag color="blue">本人出席</Tag> : <Tag color="orange">委托代表</Tag>;
      }
    }
  ];

  return (
    <div className="statistics-container">
      {/* 筛选区域 */}
      <Card className="filter-card">
        <div className="filter-row">
          <div className="filter-item">
            <span className="filter-label">时间范围：</span>
            <RangePicker 
              locale={locale}
              value={dateRange}
              onChange={handleDateRangeChange}
              style={{ width: 270 }}
            />
          </div>
          <div className="filter-item">
            <span className="filter-label">会议类型：</span>
            <Select 
              value={searchParams.meetingType}
              onChange={handleTypeChange}
              style={{ width: 180 }}
            >
              <Option value="all">全部类型</Option>
              <Option value="director">理事会议</Option>
              <Option value="executive_director">常务理事会议</Option>
              <Option value="academic">学术会议</Option>
            </Select>
          </div>
          <div className="filter-item">
            <span className="filter-label">会议名称：</span>
            <Input 
              placeholder="输入会议名称搜索" 
              value={searchParams.meetingName}
              onChange={handleMeetingNameChange}
              style={{ width: 230 }}
              allowClear
            />
          </div>
          <div className="filter-buttons">
            <Button 
              type="primary" 
              icon={<SearchOutlined />} 
              onClick={handleSearch}
            >
              搜索
            </Button>
            <Button 
              icon={<DownloadOutlined />} 
              onClick={handleExport}
              style={{ marginLeft: 8 }}
            >
              导出Excel
            </Button>
          </div>
        </div>
      </Card>
      
      {/* 数据表格 */}
      <Card 
        className="data-card"
        title={
          <div className="card-title">
            <BarChartOutlined style={{ marginRight: 8 }} />
            会议履职统计
          </div>
        }
      >
        <Table 
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ x: 1300 }}
        />
      </Card>

      {/* 会议详情弹窗 */}
      <Modal
        title="会议详情"
        width={900}
        open={detailVisible}
        onCancel={handleDetailClose}
        footer={[
          <Button key="export" onClick={handleExportAttendees}>
            导出参会人员
          </Button>,
          <Button key="close" type="primary" onClick={handleDetailClose}>
            关闭
          </Button>
        ]}
      >
        {currentMeeting && (
          <div>
            <div className="meeting-detail-info">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">会议名称：</span>
                  <span className="detail-value">{currentMeeting.name}</span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">会议类型：</span>
                  <span className="detail-value">{getMeetingTypeTag(currentMeeting.type)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">会议时间：</span>
                  <span className="detail-value">{currentMeeting.time}</span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">会议地点：</span>
                  <span className="detail-value">{currentMeeting.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">出席率：</span>
                  <span className="detail-value" style={{ 
                    color: parseFloat(currentMeeting.attendanceRate) >= 90 ? '#52c41a' : 
                           (parseFloat(currentMeeting.attendanceRate) >= 80 ? '#faad14' : '#f5222d') 
                  }}>
                    {currentMeeting.attendanceRate}
                  </span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">报名人数：</span>
                  <span className="detail-value">{currentMeeting.totalRegistrations}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">本人出席：</span>
                  <span className="detail-value">{currentMeeting.selfAttendance}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">委托出席：</span>
                  <span className="detail-value">{currentMeeting.delegateAttendance}</span>
                </div>
              </div>
            </div>
            
            <div className="meeting-detail-divider"></div>
            
            <div className="meeting-attendees">
              <h3>参会人员名单</h3>
              <div className="attendee-search">
                <Input.Search 
                  placeholder="搜索姓名或手机号" 
                  style={{ width: 250, marginBottom: 16 }}
                  enterButton
                />
              </div>
              <Table 
                columns={attendeeColumns}
                dataSource={attendees}
                rowKey="id"
                loading={attendeeLoading}
                pagination={{ pageSize: 5 }}
                scroll={{ x: 870 }}
                size="small"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MeetingStatistics; 