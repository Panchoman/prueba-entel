import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./carsSlice";

export default configureStore({
  reducer: {
    cars: carsReducer
  },
});
