import React, { useState } from 'react';
import './style.css';

const Statistics = () => {
  // 状态管理
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [dateRange, setDateRange] = useState(['2024-05', '']);

  // 模拟统计数据
  const [statistics] = useState([
    {
      id: '001',
      name: '张三',
      phone: '13800138000',
      role: '理事',
      workUnit: '中国电子科技集团公司',
      workPosition: '高级工程师',
      meetingCounts: {
        council: 2,  // 理事会议
        academic: 1,  // 学术会议
        executive: 1  // 常务理事会议
      }
    },
    {
      id: '002',
      name: '李四',
      phone: '13900139000',
      role: '常务理事',
      workUnit: '华为技术有限公司',
      workPosition: '技术总监',
      meetingCounts: {
        council: 3,
        academic: 2,
        executive: 2
      }
    },
    {
      id: '003',
      name: '王五',
      phone: '13700137000',
      role: '监事',
      workUnit: '清华大学',
      workPosition: '教授',
      meetingCounts: {
        council: 1,
        academic: 3,
        executive: 1
      }
    },
    {
      id: '004',
      name: '赵六',
      phone: '13600136000',
      role: '分支机构负责人',
      workUnit: '中国科学院计算技术研究所',
      workPosition: '研究员',
      meetingCounts: {
        council: 2,
        academic: 2,
        executive: 0
      }
    },
    {
      id: '005',
      name: '钱七',
      phone: '13500135000',
      role: '地方学会负责人',
      workUnit: '上海交通大学',
      workPosition: '副教授',
      meetingCounts: {
        council: 1,
        academic: 4,
        executive: 0
      }
    },
    {
      id: '006',
      name: '孙八',
      phone: '13400134000',
      role: '理事',
      workUnit: '阿里巴巴集团',
      workPosition: '技术专家',
      meetingCounts: {
        council: 3,
        academic: 1,
        executive: 1
      }
    },
    {
      id: '007',
      name: '周九',
      phone: '13300133000',
      role: '常务理事',
      workUnit: '腾讯科技',
      workPosition: '高级研究员',
      meetingCounts: {
        council: 4,
        academic: 2,
        executive: 3
      }
    },
    {
      id: '008',
      name: '吴十',
      phone: '13200132000',
      role: '监事',
      workUnit: '北京邮电大学',
      workPosition: '教授',
      meetingCounts: {
        council: 2,
        academic: 3,
        executive: 1
      }
    },
    {
      id: '009',
      name: '郑十一',
      phone: '13100131000',
      role: '分支机构负责人',
      workUnit: '中国移动通信集团',
      workPosition: '技术总监',
      meetingCounts: {
        council: 1,
        academic: 5,
        executive: 0
      }
    },
    {
      id: '010',
      name: '王十二',
      phone: '13000130000',
      role: '地方学会负责人',
      workUnit: '浙江大学',
      workPosition: '副教授',
      meetingCounts: {
        council: 2,
        academic: 3,
        executive: 0
      }
    }
  ]);

  // 处理搜索
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  // 处理日期范围变更
  const handleDateChange = (e, index) => {
    const newRange = [...dateRange];
    newRange[index] = e.target.value;
    setDateRange(newRange);
  };

  return (
    <div className="statistics-page">
      {/* 搜索和筛选区 */}
      <div className="operation-bar">
        <div className="filter-area">
          <input
            type="month"
            className="date-input"
            value={dateRange[0]}
            onChange={(e) => handleDateChange(e, 0)}
          />
          <span className="date-separator">至</span>
          <input
            type="month"
            className="date-input"
            value={dateRange[1]}
            onChange={(e) => handleDateChange(e, 1)}
          />
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
          <button className="action-button">导出统计</button>
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
              <th>理事会议次数</th>
              <th>常务理事会议次数</th>
              <th>学术会议次数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {statistics.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.role}</td>
                <td>{item.workUnit}</td>
                <td>{item.workPosition}</td>
                <td>{item.meetingCounts.council}</td>
                <td>{item.meetingCounts.executive}</td>
                <td>{item.meetingCounts.academic}</td>
                <td>
                  <div className="action-buttons">
                    <button className="table-button">查看详情</button>
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
          共 {statistics.length} 条记录
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
            disabled={currentPage * pageSize >= statistics.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 