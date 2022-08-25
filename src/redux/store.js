import { configureStore } from '@reduxjs/toolkit';
import livePointTracerSlice from "./livePointTracerSlice";

const store = configureStore({
  preloadedState: {
    livePointTracer: {
      goalPoint: 8000,
      data: [],
      livePointsPerShow: 14,
      cookieControl: false,
      info: ""
    }
  },
  reducer: {
    livePointTracer: livePointTracerSlice
  }
});

export default store;