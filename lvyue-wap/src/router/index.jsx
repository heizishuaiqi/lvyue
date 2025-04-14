import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import StatisticsPage from '../pages/Statistics';
import ProfilePage from '../pages/Profile';
import RegistrationPage from '../pages/registration';
import RegistrationForm from '../components/form';
import SuccessPage from '../pages/success';
import ErrorBoundary from '../components/ErrorBoundary';
import AcademicPage from '../pages/Academic';
import DeclarePage from '../pages/Academic/declare';

// 路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/statistics',
    element: <StatisticsPage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/academic',
    element: <AcademicPage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/academic/declare',
    element: <DeclarePage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/registration/:meetingId',
    element: <RegistrationPage />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '',
        element: <RegistrationForm />
      }
    ]
  },
  {
    path: '/success',
    element: <SuccessPage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '*',
    element: <ErrorBoundary />,
    errorElement: <ErrorBoundary />
  }
]);

export default router; 