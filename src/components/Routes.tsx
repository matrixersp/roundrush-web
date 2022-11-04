import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Login } from 'features/auth/Login';
import { PrivateRoute } from 'components/PrivateRoute';
import { Signup } from 'features/auth/Signup';
import { ForgotPassword } from 'features/auth/ForgotPassword';
import { SpaceSettings } from 'features/space-settings';
import { Info } from 'features/space-settings/Info';
import { Members } from 'features/space-settings/Members';
import { Layout } from 'components/ui/Layout';
import { Objectives } from 'features/objectives';
import { PersonalBoard } from 'features/personal-board';

const Dashboard = React.lazy(() =>
  import('features/dashboard').then((module) => ({ default: module.Dashboard }))
);

export const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        {
          path: '',
          element: <Layout />,
          children: [
            { path: '', element: <Navigate to="/dashboard" /> },
            { path: 'dashboard', element: <Dashboard /> },
            {
              path: 'space-settings',
              element: <SpaceSettings />,
              children: [
                { path: '', element: <Navigate to="info" /> },
                { path: 'info', element: <Info /> },
                { path: 'members', element: <Members /> },
              ],
            },
            { path: 'objectives', element: <Objectives /> },
            { path: 'personal-board', element: <PersonalBoard /> },
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
