import { createSlice } from "@reduxjs/toolkit";
import { JSTOffset } from "../components/live_point_chart";

const initialState = {
  goalPoint: 10000,
  data: [],
  livePointsPerShow: 14,
  cookieControl: false,
  info: "",
};

export const livePointTracerSlice = createSlice({
  name: "livePointTracer",
  initialState,

  reducers: {
    initialLoad: (state, action) => {
      let loadFlg = false;

      if (localStorage.getItem("goalPoint") != null) {
        Object.assign(state, { goalPoint: localStorage.getItem("goalPoint") });
        loadFlg = true;
      }

      if (localStorage.getItem("data") != null) {
        const data = JSON.parse(localStorage.getItem("data"));
        if (data.length > 0) {
          if (
            new Date(data[data.length - 1].time).getMonth() !=
            new Date(Date.now() + JSTOffset).getMonth()
          ) {
            localStorage.removeItem("data");
            //Object.assign(state, { data: initialState.data });
          } else {
            Object.assign(state, { data });
            loadFlg = true;
          }
        }
      }

      if (localStorage.getItem("livePointsPerShow") != null) {
        Object.assign(state, {
          livePointsPerShow: Number(localStorage.getItem("livePointsPerShow")),
        });
        loadFlg = true;
      }

      if (loadFlg) {
        Object.assign(state, { cookieControl: true, info: action.payload.info });
      }
      return state;
    },

    infoSet: (state, action) => {
      return Object.assign(state, { info: action.payload });
    },

    goalPointInput: (state, action) => {
      if (state.cookieControl) {
        localStorage.setItem("goalPoint", action.payload.data);
        Object.assign(state, { goalPoint: action.payload.data, info: action.payload.infoSave });
      } else {
        Object.assign(state, { goalPoint: action.payload.data, info: action.payload.infoNoSave });
      }
      return state;
    },

    dataInput: (state, action) => {
      let newData = [...state.data, action.payload.data];
      if (state.cookieControl) {
        localStorage.setItem("data", JSON.stringify(newData));
        Object.assign(state, { data: newData, info: action.payload.infoSave });
      } else {
        Object.assign(state, { data: newData, info: action.payload.infoNoSave });
      }
      return state;
    },

    dataDeleteOnePoint: (state, action) => {
      let newData = state.data.length > 0 ? [...state.data].slice(0, -1) : state.data;
      if (state.cookieControl) {
        localStorage.setItem("data", JSON.stringify(newData));
        Object.assign(state, { data: newData, info: action.payload.infoSave });
      } else {
        Object.assign(state, { data: newData, info: action.payload.infoNoSave });
      }
      return state;
    },

    livePointsPerShowInput: (state, action) => {
      if (state.cookieControl) {
        localStorage.setItem("livePointsPerShow", action.payload.data);
        Object.assign(state, {
          livePointsPerShow: action.payload.data,
          info: action.payload.infoSave,
        });
      } else {
        Object.assign(state, {
          livePointsPerShow: action.payload.data,
          info: action.payload.infoNoSave,
        });
      }
      return state;
    },

    cookieSet: (state, action) => {
      if (action.payload.data) {
        localStorage.setItem("goalPoint", state.goalPoint);
        localStorage.setItem("data", JSON.stringify(state.data));
        localStorage.setItem("livePointsPerShow", state.livePointsPerShow);
        Object.assign(state, {
          cookieControl: action.payload.data,
          info: action.payload.infoSave,
        });
      } else {
        Object.assign(state, {
          cookieControl: action.payload.data,
          info: action.payload.infoNoSave,
        });
      }
      return state;
    },

    allReset: (state, action) => {
      localStorage.removeItem("goalPoint");
      localStorage.removeItem("data");
      localStorage.removeItem("livePointsPerShow");
      return Object.assign({}, initialState, { info: action.payload.info });
    },
  },
});

export const {
  initialLoad,
  infoSet,
  goalPointInput,
  dataInput,
  dataDeleteOnePoint,
  livePointsPerShowInput,
  cookieSet,
  allReset,
  dataReset,
} = livePointTracerSlice.actions;

export default livePointTracerSlice.reducer;
