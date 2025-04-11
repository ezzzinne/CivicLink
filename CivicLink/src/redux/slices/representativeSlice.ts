import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define a type for a single representative
interface Representative {
  name: string;
  role: string;
  state: string;
  lga: string;
}

// Define the shape of the slice state
interface RepresentativeState {
  states: string[];
  lgas: string[];
  representatives: Representative[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: RepresentativeState = {
  states: [],
  lgas: [],
  representatives: [],
  loading: false,
  error: null
};

// Async thunk to fetch states
export const fetchStates = createAsyncThunk('gov/fetchStates', async () => {
  const res = await fetch('https://civiclink-ktup.onrender.com/api/v1/government/state');
  const data = await res.json();
  return data.states;
});

// Async thunk to fetch LGAs by state
export const fetchLgas = createAsyncThunk('gov/fetchLgas', async (state: string) => {
  const res = await fetch(`https://civiclink-ktup.onrender.com/api/v1/government/lga?state=${state}`);
  const data = await res.json();
  return data.lgas;
});

// Async thunk to fetch representatives by state and LGA
export const fetchRepresentatives = createAsyncThunk(
  'gov/fetchRepresentatives',
  async ({ state, lga }: { state: string; lga: string }) => {
    const res = await fetch(`https://civiclink-ktup.onrender.com/api/v1/government/representatives?state=${state}&lga=${lga}`);
    const data = await res.json();
    return data.representatives;
  }
);

// Create the slice
const representativeSlice = createSlice({
  name: 'representatives',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // States
      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch states';
      })

      // LGAs
      .addCase(fetchLgas.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lgas = [];
      })
      .addCase(fetchLgas.fulfilled, (state, action) => {
        state.loading = false;
        state.lgas = action.payload;
      })
      .addCase(fetchLgas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch LGAs';
      })

      // Representatives
      .addCase(fetchRepresentatives.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.representatives = [];
      })
      .addCase(fetchRepresentatives.fulfilled, (state, action) => {
        state.loading = false;
        state.representatives = action.payload;
      })
      .addCase(fetchRepresentatives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch representatives';
      });
  }
});

export default representativeSlice.reducer;
