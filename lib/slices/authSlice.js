import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
  user: null,
  email: null,
  isNewPassword: false,
  logs: [],
  logsLoading: false,
  logsError: null,
  time: 10 * 60,
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
    },
    setIsNewPassword(state, action) {
      state.isNewPassword = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUser, setIsNewPassword, setTime } =
  authSlice.actions;

export default authSlice.reducer;
