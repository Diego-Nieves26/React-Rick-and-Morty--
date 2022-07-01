import { createSlice } from "@reduxjs/toolkit";

export const modalLocationSlice = createSlice({
  name: "modalLocation",
  initialState: null,
  reducers: {
    setModalLocation: (state, action) => action.payload,
  },
});

export const { setModalLocation } = modalLocationSlice.actions;

export default modalLocationSlice.reducer;
