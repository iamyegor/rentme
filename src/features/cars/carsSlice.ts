import { createSlice } from "@reduxjs/toolkit";
import { PayFor } from "types";

type CarsState = {
  payFor: PayFor;
};

const initialState: CarsState = {
  payFor: PayFor.Minute,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
});

export default carsSlice.reducer;
