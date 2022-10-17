import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { Login } from 'components/Login';
import { PrivateRoute } from 'components/PrivateRoute';
import { Signup } from 'components/Signup';
import { ForgotPassword } from 'components/ForgotPassword';
import { SpaceSettings } from 'components/SpaceSettings';
import { Dashboard } from 'components/Dashboard';
import { Info } from 'components/SpaceSettings/Info';
import { Members } from 'components/SpaceSettings/Members';

const RoutesElement = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        { path: '', element: <Dashboard /> },
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
  ]);
  return element;
};

type Props = {};

export const Routes = (props: Props) => {
  return (
    <Router>
      <RoutesElement />
    </Router>
  );
};
