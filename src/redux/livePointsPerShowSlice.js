import { createSlice } from "@reduxjs/toolkit";

export const livePointsPerShow = createSlice({
  name: "livePointsPerShow",
  initialState: 14,
  reducers: {
    input: (state, action) => action.payload,
    reset: () => 14
  }
})

export const { input, reset } = livePointsPerShow.actions;

export default livePointsPerShow.reducer;