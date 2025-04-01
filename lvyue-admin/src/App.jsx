import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Account from './pages/Account/index';
import MeetingManagement from './pages/MeetingManagement';
import Registration from './pages/Registration/index';
import Statistics from './pages/Statistics/index';
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
          <Route path="registration" element={<Registration />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
