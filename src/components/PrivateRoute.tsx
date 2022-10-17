import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoute = () => {
  const isLoggedIn = true;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
