import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Account from './pages/Account/index';
import MeetingManagement from './pages/MeetingManagement';
import Registration from './pages/Registration/index';
import StatisticsLayout from './pages/Statistics/index';
import PersonalStatistics from './pages/Statistics/PersonalStatistics';
import PersonalDetail from './pages/Statistics/PersonalDetail';
import MeetingStatistics from './pages/Statistics/MeetingStatistics';
import MeetingDetail from './pages/Statistics/MeetingDetail';
import AcademicMeeting from './pages/AcademicMeeting/index';
import './App.css';

const App = () => {
  // TODO: 添加登录状态检查
  const isAuthenticated = true;

  return (
    <BrowserRouter>
      <Routes>
        {/* 登录页面 */}
        <Route path="/login" element={<Login />} />

        {/* 需要认证的路由 */}
        <Route
          path="/"
          element={
            isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Navigate to="/account" replace />} />
          <Route path="account" element={<Account />} />
          <Route path="meeting" element={<MeetingManagement />} />
          <Route path="academic" element={<AcademicMeeting />} />
          <Route path="registration" element={<Registration />} />
          
          {/* 履职统计相关路由 */}
          <Route path="statistics" element={<StatisticsLayout />}>
            <Route index element={<Navigate to="/statistics/personal" replace />} />
            <Route path="personal" element={<PersonalStatistics />} />
            <Route path="meeting" element={<MeetingStatistics />} />
            <Route path=":id" element={<PersonalDetail />} />
            <Route path="meeting/:id" element={<MeetingDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
