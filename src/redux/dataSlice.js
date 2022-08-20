import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: [],
  reducers: {
    dataInput: (state, action) => [...state, action.payload],
    dataReset: () => [],
    dataDeleteOnePoint: (state) => {
      if (state.length > 0) {
        return [...state].slice(0, -1);
      }
      else {
        return state;
      }
    }
  }
})

export const { dataInput, dataReset, dataDeleteOnePoint } = dataSlice.actions;

export default dataSlice.reducer;