import { configureStore } from "@reduxjs/toolkit";
import { doctorsSlice, DoctorsState } from "./doctors/doctors";

export interface RootState {
  doctors: DoctorsState;
}

export const store = configureStore<RootState>({
  reducer: {
    doctors: doctorsSlice.reducer,
  },
});
