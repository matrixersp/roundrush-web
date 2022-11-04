import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import organizationReducer from 'features/organization/organizationSlice';
import objectiveReducer from 'features/objectives/objectivesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  organization: organizationReducer,
  objective: objectiveReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
