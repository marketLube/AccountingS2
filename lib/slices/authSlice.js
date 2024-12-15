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
  phone: "",
  id: "",
  image:
    "https://cbbstwltufvzpsqvnahz.supabase.co/storage/v1/object/public/avatars/public/logoipsum.png",
  isForgot: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsForgot(state, action) {
      state.isForgot = action.payload;
    },
    setTime(state, action) {
      state.time = action.payload;
    },

    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload?.name;
      state.email = action.payload?.email;
      state.position = action.payload?.role || "Accountant";
      state.image = action.payload?.image;
      state.phone = action.payload?.phone;
      state.id = action.payload?._id || "";
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
    setPhone(state, action) {
      state.phone = action.payload;
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
  setPhone,
  setIsForgot,
} = authSlice.actions;

export default authSlice.reducer;
