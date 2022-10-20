import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoute = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
