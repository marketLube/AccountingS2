import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
  user: "",
  email: "",
  isNewPassword: false,
  logs: [],
  logsLoading: false,
  logsError: null,
  time: 10 * 60,
  position: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTime(state, action) {
      state.time = action.payload;
    },

    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload?.name;
      state.email = action.payload?.email;
      state.position = action.payload?.position || "";
    },
    setIsNewPassword(state, action) {
      state.isNewPassword = action.payload;
    },
    setUserName(state, action) {
      state.user = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPosition(state, action) {
      state.position = action.payload;
    },
  },
});

export const {
  setIsLoggedIn,
  setUser,
  setIsNewPassword,
  setTime,
  setPosition,
  setEmail,
  setUserName,
} = authSlice.actions;

export default authSlice.reducer;
