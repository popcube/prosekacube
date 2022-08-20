import { configureStore } from '@reduxjs/toolkit';
import cookieControlSlice from './cookieControlSlice';
import dataSlice from './dataSlice';
import goalPointSlice from './goalPointSlice';
import livePointsPerShowSlice from './livePointsPerShowSlice';

const store = configureStore({
  reducer: {
    goalPoint: goalPointSlice,
    data: dataSlice,
    livePointsPerShow: livePointsPerShowSlice,
    cookieControl: cookieControlSlice
  }
});

export default store;