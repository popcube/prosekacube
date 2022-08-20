import { createSlice } from "@reduxjs/toolkit";

export const livePointsPerShow = createSlice({
  name: "livePointsPerShow",
  initialState: 14,
  reducers: {
    livePointsPerShowInput: (state, action) => action.payload,
    livePointsPerShowReset: () => 14
  }
})

export const { livePointsPerShowInput, livePointsPerShowReset } = livePointsPerShow.actions;

export default livePointsPerShow.reducer;