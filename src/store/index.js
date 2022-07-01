import { configureStore } from "@reduxjs/toolkit";
import modalLocation from "./slices/modalLocation.slice";
import typeData from "./slices/typeData.slice";
import modal from "./slices/modal.slice";

export default configureStore({
  reducer: {
    modalLocation,
    typeData,
    modal,
  },
});
