import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from 'utils/constants';

interface GeneralError {
  error: string;
}

interface Industry {
  id: string;
  name: string;
}

type EmployeesSize = Industry;

export const getIndustries = createAsyncThunk<Industry[], void>(
  'organization/getIndustries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/industries`);

      return response.data as Industry[];
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.error as GeneralError);
      }
      return rejectWithValue((err as Error).message);
    }
  }
);

export const getEmployeesSize = createAsyncThunk<EmployeesSize[], void>(
  'organization/getEmployeesSize',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/employees-sizes`);

      return response.data as EmployeesSize[];
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.error as GeneralError);
      }
      return rejectWithValue((err as Error).message);
    }
  }
);

export interface Space {
  message: string;
}

export const spaceExists = createAsyncThunk<Space, string>(
  'organization/spaceExists',
  async (spaceName, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/organizations/space-exists`,
        {
          params: { spaceName },
        }
      );

      return response.data as Space;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.error as GeneralError);
      }
      return rejectWithValue((err as Error).message);
    }
  }
);

type InitialState = {
  loading: boolean;
  space: Record<string, any> | null;
  error?: string;
  industries: Record<string, any>[];
  employeesSize: Record<string, any>[];
};

const initialState: InitialState = {
  loading: false,
  space: null,
  error: '',
  industries: [],
  employeesSize: [],
};

export const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(spaceExists.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(spaceExists.pending, (state) => {
        state.loading = true;
      })
      .addCase(spaceExists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });

    builder.addCase(getIndustries.fulfilled, (state, action) => {
      state.industries = action.payload;
    });

    builder.addCase(getEmployeesSize.fulfilled, (state, action) => {
      state.employeesSize = action.payload;
    });
  },
});

export default organizationSlice.reducer;
