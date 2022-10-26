import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from 'utils/constants';

interface LoginData {
  email: string;
  password: string;
}

interface AuthError {
  error: string;
}
interface Auth {
  user: {
    _id: string;
    fullName: string;
    email: string;
  };
  token: string;
}

export const login = createAsyncThunk<Auth, LoginData>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/auth`, data);

      localStorage.setItem('TOKEN', response.data.token);
      return response.data as Auth;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.error as AuthError);
      }
      return rejectWithValue((err as Error).message);
    }
  }
);

export const verifyEmail = createAsyncThunk<Auth, string>(
  'auth/verifyEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/auth/verify-email`, {
        params: { email },
      });

      return response.data as Auth;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.error as AuthError);
      }
      return rejectWithValue((err as Error).message);
    }
  }
);

export const signup = createAsyncThunk<Auth, string>(
  'auth/signup',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/users`, data);

      return response.data as Auth;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.error as AuthError);
      }
      return rejectWithValue((err as Error).message);
    }
  }
);

export const requestPasswordReset = createAsyncThunk<Auth, string>(
  'auth/requestPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/auth/recover`, {
        email,
      });

      return response.data as Auth;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.error as AuthError);
      }
      return rejectWithValue((err as Error).message);
    }
  }
);

export const verifyToken = createAsyncThunk<Auth, string>(
  'auth/verifyToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/auth/reset-password/${token}`
      );

      return response.data as Auth;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.error as AuthError);
      }
      return rejectWithValue((err as Error).message);
    }
  }
);

interface ResetPasswordData {
  token: string;
  password: string;
}

export const resetPassword = createAsyncThunk<Auth, ResetPasswordData>(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/auth/reset-password/${token}`,
        {
          password,
        }
      );

      return response.data as Auth;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.error as AuthError);
      }
      return rejectWithValue((err as Error).message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', () => {
  localStorage.clear();
});

function isLoggedIn() {
  return localStorage.getItem('TOKEN') ? true : false;
}

type InitialState = {
  loading: boolean;
  loggedIn: boolean;
  error?: string;
};

const initialState: InitialState = {
  error: '',
  loading: false,
  loggedIn: isLoggedIn(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.error = '';
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message as string;
      });

    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message as string;
      });

    builder
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.loggedIn = false;
    });
  },
});

export default authSlice.reducer;
