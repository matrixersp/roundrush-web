import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';

function getSessionId() {
  const session = localStorage.getItem('SESSION');
  return session ? JSON.parse(session).id : null;
}

const preloadedState = {
  auth: {
    session: null,
    isLoggedIn: !!getSessionId(),
  },
};

export const store = configureStore({
  preloadedState,
  reducer: {
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
