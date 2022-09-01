import { configureStore } from "@reduxjs/toolkit";
import livePointTracerSlice from "./livePointTracerSlice";

const store = configureStore({
  reducer: {
    livePointTracer: livePointTracerSlice,
  },
});

export default store;
