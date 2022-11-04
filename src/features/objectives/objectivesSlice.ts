import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface GeneralError {
  error: string;
}

interface Objective {
  id: string;
  name: string;
}

export interface ResponseData {
  message: string;
}

export const getObjectives = createAsyncThunk<Objective[]>(
  'objectives/getObjectives',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/data/objectives.json');

      return response.data as Objective[];
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
  error?: string;
  objectives: Record<string, any>[];
};

const initialState: InitialState = {
  loading: false,
  error: '',
  objectives: [],
};

export const objectivesSlice = createSlice({
  name: 'objectives',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getObjectives.pending, (state) => {
        state.loading = true;
      })
      .addCase(getObjectives.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.objectives = action.payload;
      })
      .addCase(getObjectives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default objectivesSlice.reducer;
