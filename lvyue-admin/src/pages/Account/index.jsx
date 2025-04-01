import React, { useState } from 'react';
import './style.css';

const Account = () => {
  // 状态管理
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  // 模拟账号数据
  const [accounts] = useState([
    {
      id: '001',
      name: '张三',
      phone: '13800138000',
      role: '理事',
      workUnit: '中国电子科技集团公司',
      workPosition: '高级工程师',
      lastLoginTime: '2024-03-21 17:27:19',
      status: '正常'
    },
    {
      id: '002',
      name: '李四',
      phone: '13900139000',
      role: '常务理事',
      workUnit: '华为技术有限公司',
      workPosition: '技术总监',
      lastLoginTime: '2024-03-20 15:30:00',
      status: '正常'
    },
    {
      id: '003',
      name: '王五',
      phone: '13700137000',
      role: '监事',
      workUnit: '清华大学',
      workPosition: '教授',
      lastLoginTime: '2024-03-19 09:15:00',
      status: '正常'
    },
    {
      id: '004',
      name: '赵六',
      phone: '13600136000',
      role: '分支机构负责人',
      workUnit: '中国科学院计算技术研究所',
      workPosition: '研究员',
      lastLoginTime: '2024-03-18 14:20:00',
      status: '正常'
    },
    {
      id: '005',
      name: '钱七',
      phone: '13500135000',
      role: '地方学会负责人',
      workUnit: '上海交通大学',
      workPosition: '副教授',
      lastLoginTime: '2024-03-17 11:45:00',
      status: '正常'
    },
    {
      id: '006',
      name: '孙八',
      phone: '13400134000',
      role: '理事',
      workUnit: '阿里巴巴集团',
      workPosition: '技术专家',
      lastLoginTime: '2024-03-16 16:30:00',
      status: '正常'
    },
    {
      id: '007',
      name: '周九',
      phone: '13300133000',
      role: '常务理事',
      workUnit: '腾讯科技',
      workPosition: '高级研究员',
      lastLoginTime: '2024-03-15 10:20:00',
      status: '正常'
    },
    {
      id: '008',
      name: '吴十',
      phone: '13200132000',
      role: '监事',
      workUnit: '北京邮电大学',
      workPosition: '教授',
      lastLoginTime: '2024-03-14 13:15:00',
      status: '正常'
    },
    {
      id: '009',
      name: '郑十一',
      phone: '13100131000',
      role: '分支机构负责人',
      workUnit: '中国移动通信集团',
      workPosition: '技术总监',
      lastLoginTime: '2024-03-13 09:30:00',
      status: '正常'
    },
    {
      id: '010',
      name: '王十二',
      phone: '13000130000',
      role: '地方学会负责人',
      workUnit: '浙江大学',
      workPosition: '副教授',
      lastLoginTime: '2024-03-12 15:45:00',
      status: '正常'
    },
    {
      id: '011',
      name: '李十三',
      phone: '12900129000',
      role: '理事',
      workUnit: '百度在线网络技术有限公司',
      workPosition: '高级工程师',
      lastLoginTime: '2024-03-11 11:20:00',
      status: '正常'
    },
    {
      id: '012',
      name: '张十四',
      phone: '12800128000',
      role: '常务理事',
      workUnit: '中国科学院软件研究所',
      workPosition: '研究员',
      lastLoginTime: '2024-03-10 14:30:00',
      status: '正常'
    },
    {
      id: '013',
      name: '刘十五',
      phone: '12700127000',
      role: '监事',
      workUnit: '南京大学',
      workPosition: '教授',
      lastLoginTime: '2024-03-09 16:15:00',
      status: '正常'
    }
  ]);

  // 处理搜索
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // 重置页码
  };

  // 获取过滤后的账号列表
  const getFilteredAccounts = () => {
    if (!searchText) {
      return accounts;
    }
    const searchLower = searchText.toLowerCase();
    return accounts.filter(account => 
      account.name.toLowerCase().includes(searchLower) ||
      account.phone.includes(searchText)
    );
  };

  // 获取当前页的账号列表
  const getCurrentPageAccounts = () => {
    const filteredAccounts = getFilteredAccounts();
    return filteredAccounts.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  };

  // 获取总页数
  const getTotalPages = () => {
    const filteredAccounts = getFilteredAccounts();
    return Math.ceil(filteredAccounts.length / pageSize);
  };

  // 处理搜索按钮点击
  const handleSearchClick = () => {
    setCurrentPage(1); // 重置到第一页
  };

  // 处理创建账号
  const handleCreate = () => {
    setShowCreateModal(true);
  };

  // 处理编辑账号
  const handleEdit = (account) => {
    setCurrentAccount(account);
    setShowEditModal(true);
  };

  // 处理删除账号
  const handleDelete = (account) => {
    setCurrentAccount(account);
    setShowDeleteConfirm(true);
  };

  // 处理重置密码
  const handleResetPassword = (account) => {
    setCurrentAccount(account);
    setShowResetPasswordModal(true);
  };

  // 处理批量删除
  const handleBatchDelete = () => {
    if (selectedAccounts.length === 0) {
      alert('请选择要删除的账号');
      return;
    }
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
    <div className="account-page">
      {/* 搜索和操作区 */}
      <div className="operation-bar">
        <div className="search-area">
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="请输入姓名/手机号"
            className="search-input"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearchClick();
              }
            }}
          />
          <button className="search-button" onClick={handleSearchClick}>搜索</button>
        </div>
        <div className="action-area">
          <button className="action-button primary" onClick={handleCreate}>新建账号</button>
          <button className="action-button" onClick={handleImport}>导入</button>
          <button className="action-button" onClick={handleExport}>导出</button>
          <button className="action-button danger" onClick={handleBatchDelete}>批量删除</button>
        </div>
      </div>

      {/* 表格区域 */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAccounts(getCurrentPageAccounts().map(account => account.id));
                    } else {
                      setSelectedAccounts([]);
                    }
                  }}
                  checked={selectedAccounts.length === getCurrentPageAccounts().length}
                />
              </th>
              <th>姓名</th>
              <th>手机号码</th>
              <th>学会职务</th>
              <th>工作单位</th>
              <th>工作职务</th>
              <th>最后登录时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageAccounts().map(account => (
              <tr key={account.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedAccounts.includes(account.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAccounts([...selectedAccounts, account.id]);
                      } else {
                        setSelectedAccounts(selectedAccounts.filter(id => id !== account.id));
                      }
                    }}
                  />
                </td>
                <td>{account.name}</td>
                <td>{account.phone}</td>
                <td>{account.role}</td>
                <td>{account.workUnit}</td>
                <td>{account.workPosition}</td>
                <td>{account.lastLoginTime}</td>
                <td>
                  <span className={`status-tag ${account.status === '正常' ? 'normal' : 'disabled'}`}>
                    {account.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="table-button edit" onClick={() => handleEdit(account)}>编辑</button>
                    <button className="table-button" onClick={() => handleResetPassword(account)}>重置密码</button>
                    <button className="table-button delete" onClick={() => handleDelete(account)}>删除</button>
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
          共 {getFilteredAccounts().length} 条记录
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

      {/* 弹窗区域 */}
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>新建账号</h3>
            <form>
              <div className="form-group">
                <label>姓名</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>手机号码</label>
                <input type="tel" />
              </div>
              <div className="form-group">
                <label>密码</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>确认密码</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>学会职务</label>
                <select>
                  <option value="理事">理事</option>
                  <option value="常务理事">常务理事</option>
                  <option value="监事">监事</option>
                  <option value="分支机构负责人">分支机构负责人</option>
                  <option value="地方学会负责人">地方学会负责人</option>
                </select>
              </div>
              <div className="form-group">
                <label>工作单位</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>工作职务</label>
                <input type="text" />
              </div>
              <div className="modal-buttons">
                <button type="button" className="action-button" onClick={() => setShowCreateModal(false)}>取消</button>
                <button type="submit" className="action-button primary">确定</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>编辑账号</h3>
            <form>
              <div className="form-group">
                <label>姓名</label>
                <input type="text" defaultValue={currentAccount?.name} />
              </div>
              <div className="form-group">
                <label>手机号码</label>
                <input type="tel" defaultValue={currentAccount?.phone} />
              </div>
              <div className="form-group">
                <label>学会职务</label>
                <select defaultValue={currentAccount?.role}>
                  <option value="理事">理事</option>
                  <option value="常务理事">常务理事</option>
                  <option value="监事">监事</option>
                  <option value="分支机构负责人">分支机构负责人</option>
                  <option value="地方学会负责人">地方学会负责人</option>
                </select>
              </div>
              <div className="form-group">
                <label>工作单位</label>
                <input type="text" defaultValue={currentAccount?.workUnit} />
              </div>
              <div className="form-group">
                <label>工作职务</label>
                <input type="text" defaultValue={currentAccount?.workPosition} />
              </div>
              <div className="modal-buttons">
                <button type="button" className="action-button" onClick={() => setShowEditModal(false)}>取消</button>
                <button type="submit" className="action-button primary">确定</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content">
            <h3>确认删除</h3>
            <p>确定要删除选中的账号吗？此操作不可恢复。</p>
            <div className="modal-buttons">
              <button className="action-button" onClick={() => setShowDeleteConfirm(false)}>取消</button>
              <button className="action-button danger">确定删除</button>
            </div>
          </div>
        </div>
      )}

      {showResetPasswordModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>重置密码</h3>
            <form>
              <div className="form-group">
                <label>新密码</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>确认密码</label>
                <input type="password" />
              </div>
              <div className="modal-buttons">
                <button type="button" className="action-button" onClick={() => setShowResetPasswordModal(false)}>取消</button>
                <button type="submit" className="action-button primary">确定</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account; 