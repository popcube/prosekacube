import { createSlice } from "@reduxjs/toolkit";

export const goalPointSlice = createSlice({
  name: "goalPoint",
  initialState: 8000,
  reducers: {
    goalPointInput: (state, action) => action.payload,
    goalPointReset: () => 8000
  }
})

export const { goalPointInput, goalPointReset } = goalPointSlice.actions;

export default goalPointSlice.reducer;