import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
};

const reminderSlice = createSlice({
  name: "reminder",

  initialState,
  reducers: {
    setRemBtnDiable(state, action) {
      state.btnDisable = action.payload;
    },
    setReminderCurentPage(state, action) {
      setCurrentPage(state, action);
    },
  },
});

export const { setReminderCurentPage, setRemBtnDiable, setDaybookType } =
  reminderSlice.actions;
export default reminderSlice.reducer;
