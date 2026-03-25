import { createSlice } from "@reduxjs/toolkit";

export interface Doctor {
  name: string;
  timezone: string;
  day_of_week: string;
  available_at: string;
  available_until: string;
  available_slots: string[];
}

export interface DoctorsState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}

export const doctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [] as Doctor[],
    loading: false,
    error: null,
  } as DoctorsState,
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setDoctors, setLoading, setError } = doctorsSlice.actions;
export default doctorsSlice.reducer;
