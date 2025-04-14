import React, { useState, useEffect } from 'react';
import { Table, Card, Input, DatePicker, Button, message, Space, Modal, Tooltip } from 'antd';
import { SearchOutlined, DownloadOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';
import './Statistics.css';

const { RangePicker } = DatePicker;

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

const PersonalStatistics = () => {
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
    keyword: ''
  });
  const [dateRange, setDateRange] = useState([null, null]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [meetingRecords, setMeetingRecords] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);

  // 加载个人履职统计数据
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      // TODO: 替换为实际API调用
      // 模拟API响应数据
      const response = {
        code: 200,
        data: {
          total: 10,
          list: [
            {
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
            {
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
            {
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
            {
              id: '4',
              name: '赵六',
              phone: '13600136000',
              role: '分支机构负责人',
              workUnit: '中国科学院计算所',
              workPosition: '研究员',
              directorMeetings: 2,
              executiveMeetings: 0,
              academicMeetings: 2
            },
            {
              id: '5',
              name: '钱七',
              phone: '13500135000',
              role: '地方学会负责人',
              workUnit: '上海交通大学',
              workPosition: '副教授',
              directorMeetings: 1,
              executiveMeetings: 0,
              academicMeetings: 4
            },
            {
              id: '6',
              name: '孙八',
              phone: '13400134000',
              role: '理事',
              workUnit: '阿里巴巴集团',
              workPosition: '技术专家',
              directorMeetings: 3,
              executiveMeetings: 1,
              academicMeetings: 1
            },
            {
              id: '7',
              name: '周九',
              phone: '13300133000',
              role: '常务理事',
              workUnit: '腾讯科技',
              workPosition: '高级研究员',
              directorMeetings: 4,
              executiveMeetings: 3,
              academicMeetings: 2
            },
            {
              id: '8',
              name: '吴十',
              phone: '13200132000',
              role: '监事',
              workUnit: '北京邮电大学',
              workPosition: '教授',
              directorMeetings: 2,
              executiveMeetings: 1,
              academicMeetings: 3
            },
            {
              id: '9',
              name: '郑十一',
              phone: '13100131000',
              role: '分支机构负责人',
              workUnit: '中国移动通信集团',
              workPosition: '技术总监',
              directorMeetings: 1,
              executiveMeetings: 0,
              academicMeetings: 5
            },
            {
              id: '10',
              name: '王十二',
              phone: '13000130000',
              role: '地方学会负责人',
              workUnit: '浙江大学',
              workPosition: '副教授',
              directorMeetings: 2,
              executiveMeetings: 0,
              academicMeetings: 3
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
      console.error('获取个人履职统计数据失败:', error);
      message.error('获取个人履职统计数据失败，请稍后重试');
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

  // 处理关键字搜索
  const handleKeywordChange = (e) => {
    const { value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      keyword: value
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

  // 获取人员履职详情
  const fetchPersonDetail = async (personId) => {
    setDetailLoading(true);
    try {
      // TODO: 替换为实际API调用
      // 模拟API响应数据
      const response = {
        code: 200,
        data: [
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
            name: '2024年信息技术发展研讨会',
            type: 'academic',
            time: '2024-03-25 09:00-17:00',
            location: '科技园国际会议中心',
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
            name: '2024年第二季度理事工作会议',
            type: 'director',
            time: '2024-05-15 14:00-16:00',
            location: '总部大楼5层会议室B',
            attendType: 'self'
          }
        ]
      };
      
      setMeetingRecords(response.data);
    } catch (error) {
      console.error('获取履职详情数据失败:', error);
      message.error('获取履职详情数据失败，请稍后重试');
    } finally {
      setDetailLoading(false);
    }
  };

  // 查看详情
  const handleViewDetail = (record) => {
    setCurrentPerson(record);
    fetchPersonDetail(record.id);
    setDetailVisible(true);
  };

  // 关闭详情弹窗
  const handleDetailClose = () => {
    setDetailVisible(false);
    setCurrentPerson(null);
    setMeetingRecords([]);
  };

  // 会议类型映射
  const meetingTypeMap = {
    director: '理事会议',
    executive: '常务理事会议',
    academic: '学术会议'
  };

  // 表格列定义
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>
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
      width: 250
    },
    {
      title: '工作职务',
      dataIndex: 'workPosition',
      key: 'workPosition',
      width: 150
    },
    {
      title: '理事会议次数',
      dataIndex: 'directorMeetings',
      key: 'directorMeetings',
      width: 120,
      align: 'center'
    },
    {
      title: '常务理事会议次数',
      dataIndex: 'executiveMeetings',
      key: 'executiveMeetings',
      width: 150,
      align: 'center'
    },
    {
      title: '学术会议次数',
      dataIndex: 'academicMeetings',
      key: 'academicMeetings',
      width: 120,
      align: 'center'
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

  // 会议记录表格列定义
  const meetingRecordColumns = [
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
      render: (type) => meetingTypeMap[type] || type
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
        // 检查当前会议是否为学术会议
        if (record.type === 'academic') {
          return '--';
        }
        return type === 'self' ? '本人出席' : `委托代表(${record.delegateName})`;
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
            <span className="filter-label">姓名/手机号：</span>
            <Input 
              placeholder="输入姓名或手机号搜索" 
              value={searchParams.keyword}
              onChange={handleKeywordChange}
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
            <UserOutlined style={{ marginRight: 8 }} />
            个人履职统计
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

      {/* 履职详情弹窗 */}
      <Modal
        title="履职详情"
        width={900}
        open={detailVisible}
        onCancel={handleDetailClose}
        footer={[
          <Button key="close" type="primary" onClick={handleDetailClose}>
            关闭
          </Button>
        ]}
      >
        {currentPerson && (
          <div>
            <div className="meeting-detail-info">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">姓名：</span>
                  <span className="detail-value">{currentPerson.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">手机号码：</span>
                  <span className="detail-value">{currentPerson.phone}</span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">学会职务：</span>
                  <span className="detail-value">{currentPerson.role}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">工作单位：</span>
                  <span className="detail-value">{currentPerson.workUnit}</span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">工作职务：</span>
                  <span className="detail-value">{currentPerson.workPosition}</span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">理事会议：</span>
                  <span className="detail-value">{currentPerson.directorMeetings}次</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">常务理事会议：</span>
                  <span className="detail-value">{currentPerson.executiveMeetings}次</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">学术会议：</span>
                  <span className="detail-value">{currentPerson.academicMeetings}次</span>
                </div>
              </div>
            </div>
            
            <div className="meeting-detail-divider"></div>
            
            <div className="meeting-attendees">
              <h3>参会记录</h3>
              <Table 
                columns={meetingRecordColumns}
                dataSource={meetingRecords}
                rowKey="id"
                loading={detailLoading}
                pagination={false}
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

export default PersonalStatistics; 