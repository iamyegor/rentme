import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StoreState = {
  cars: CarsState;
};

type CarsState = {
  filters: Record<string, string>;
};

const initialState: CarsState = {
  filters: {},
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<{[key: string]: string}>) {
      const key = Object.keys(action.payload)[0];
      state.filters[key] = action.payload[key];
    },
  },
});

export const selectFilters = (state: StoreState) => state.cars.filters;
export const { setFilter } = carsSlice.actions;
export default carsSlice.reducer;
