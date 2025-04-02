import { createBrowserRouter } from 'react-router-dom';
import RegistrationPage from '../pages/registration';
import RegistrationForm from '../components/form';
import SuccessPage from '../pages/success';

// 路由配置
const router = createBrowserRouter([
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
    element: <SuccessPage />,
  }
]);

export default router; 