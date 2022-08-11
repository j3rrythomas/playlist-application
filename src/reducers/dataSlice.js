import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardModalVisible: false,
  cardModalData: {},
  bucketModalVisible: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCardModalVisible: (state, action) => {
      state.cardModalVisible = action.payload.isVisible;
      state.cardModalData = action.payload.data;
    },
    setBucketModalVisible: (state, action) => {
      state.bucketModalVisible = action.payload;
    },
  },
});

export const { setCardModalVisible, setBucketModalVisible } = dataSlice.actions;

export default dataSlice.reducer;
