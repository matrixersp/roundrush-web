import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { BASE_API_URL } from 'utils/constants';

export interface LoginData {
  email: string;
  password: string;
}

export interface Auth {
  session: {
    created: string;
    expires: string;
    id: string;
    userId: string;
  } | null;
}

export const login = createAsyncThunk<Auth, LoginData>(
  'auth/login',
  async (data, thunkApi) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/user/Login`, data, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_M3O_API_TOKEN}`,
        },
      });

      localStorage.setItem('SESSION', JSON.stringify(response.data['session']));
      return response.data as Auth;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return thunkApi.rejectWithValue(err.response.data.error);
      }
      throw err;
    }
  }
);

export const logout = createAsyncThunk('auth/logout', () => {
  localStorage.clear();
});

const initialState: Auth & { isLoggedIn: boolean } = {
  session: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.session = action.payload.session;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.session = null;
    });
  },
});

export default authSlice.reducer;
