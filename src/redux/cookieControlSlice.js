import { createSlice } from "@reduxjs/toolkit";

export const cookieControl = createSlice({
  name: "cookieControl",
  initialState: false,
  reducers: {
    cookieSet: (state, action) => action.payload
  }
})

export const { cookieSet } = cookieControl.actions;

export default cookieControl.reducer;