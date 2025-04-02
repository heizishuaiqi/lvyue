import { createBrowserRouter } from 'react-router-dom';
import RegistrationPage from '../pages/registration';
import RegistrationForm from '../components/form';
import SuccessPage from '../pages/success';
import LoginPage from '../pages/Login';
import StatisticsPage from '../pages/Statistics';
import ProfilePage from '../pages/Profile';

// 路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/registration/:meetingId',
    element: <RegistrationPage />,
    children: [
      {
        path: '',
        element: <RegistrationForm />
      }
    ]
  },
  {
    path: '/success',
    element: <SuccessPage />
  },
  {
    path: '/statistics',
    element: <StatisticsPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  }
]);

export default router; 