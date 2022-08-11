import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  tabKey: 1,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.tabKey = action.payload;
    },
    addToHistory: (state, action) => {
      state.history.unshift(action.payload);
    },
  },
});

export const { setCurrentTab, addToHistory } = historySlice.actions;

export default historySlice.reducer;
