import { createSlice } from "@reduxjs/toolkit";

export const carsSlice = createSlice({
  name: "cars",
  initialState: {
    list: [],
  },
  reducers: {
    add: (state, action) => {
      state.list.push(action.payload);
    },
    remove: (state, action) => {
      state.list = state.list.filter(function (car) {
        return car.id != action.payload;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove } = carsSlice.actions;

export default carsSlice.reducer;
