import { createSlice } from "@reduxjs/toolkit";

export const cookieControl = createSlice({
  name: "cookieControl",
  initialState: false,
  reducers: {
    set: (state, action) => action.payload
  }
})

export const { set } = cookieControl.actions;

export default cookieControl.reducer;