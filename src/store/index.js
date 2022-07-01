import { configureStore } from "@reduxjs/toolkit";
import typeData from "./slices/typeData.slice";
import modal from "./slices/modal.slice";

export default configureStore({
  reducer: {
    typeData,
    modal,
  },
});
