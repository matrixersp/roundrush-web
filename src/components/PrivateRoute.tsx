import { useAppSelector } from 'app/hooks';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoute = () => {
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};
