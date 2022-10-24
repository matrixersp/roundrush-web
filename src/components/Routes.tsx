import { Navigate, useRoutes } from 'react-router-dom';
import { Login } from 'features/auth/Login';
import { PrivateRoute } from 'components/PrivateRoute';
import { Signup } from 'components/Signup';
import { ForgotPassword } from 'components/ForgotPassword';
import { SpaceSettings } from 'components/SpaceSettings';
import { Dashboard } from 'components/Dashboard';
import { Info } from 'components/SpaceSettings/Info';
import { Members } from 'components/SpaceSettings/Members';

export const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        { path: '', element: <Navigate to="/dashboard" /> },
        { path: 'dashboard', element: <Dashboard /> },
        {
          path: '/settings',
          element: <SpaceSettings />,
          children: [
            { path: '', element: <Info /> },
            { path: 'members', element: <Members /> },
          ],
        },
      ],
    },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/*', element: <div>Not Found</div> },
  ]);
  return element;
};
