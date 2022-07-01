import { createSlice } from "@reduxjs/toolkit";

export const typeDataSlice = createSlice({
  name: "typeData",
  initialState: "character",
  reducers: {
    setIsLocation: (state, action) => action.payload,
  },
});

export const { setIsLocation } = typeDataSlice.actions;

export default typeDataSlice.reducer;
