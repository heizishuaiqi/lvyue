import React, { useState, useEffect } from 'react';
import { Table, Card, Input, Button, message, Space, Tooltip } from 'antd';
import { SearchOutlined, DownloadOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Statistics.css';

const PersonalStatistics = () => {
  const navigate = useNavigate();
  // 状态管理
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [searchParams, setSearchParams] = useState({
    keyword: ''
  });

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

  // 查看详情
  const handleViewDetail = (record) => {
    navigate(`/statistics/${record.id}`);
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

  return (
    <div className="statistics-container">
      {/* 筛选区域 */}
      <Card className="filter-card">
        <div className="filter-row">
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
    </div>
  );
};

export default PersonalStatistics; 