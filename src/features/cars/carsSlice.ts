import { createSlice } from "@reduxjs/toolkit";
import { Car } from "../../types";

const initialState: Car[] = [];

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    
  }
});
