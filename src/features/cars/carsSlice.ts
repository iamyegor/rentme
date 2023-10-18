import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PayFor } from "types";

type StoreState = {
  cars: CarsState;
};

type CarsState = {
  payFor: PayFor;
};

const initialState: CarsState = {
  payFor: PayFor.Minute,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    changePayFor: (state, action: PayloadAction<PayFor>) => {
      state.payFor = action.payload;
    },
  },
});

export const selectPayFor = (state: StoreState) => state.cars.payFor;
export const { changePayFor } = carsSlice.actions;
export default carsSlice.reducer;
