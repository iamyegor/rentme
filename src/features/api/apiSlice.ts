import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car, Location } from "types.ts";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost/api" }),
  endpoints: (builder) => ({
    getCars: builder.query<Car[], void>({
      query: () => `/cars`,
    }),
    getCarsByLocation: builder.query<Car[], Location>({
      query: (location) =>
        `/cars?city=${location.city}&country=${location.country}`,
    }),
  }),
});

export const { useGetCarsQuery } = apiSlice;
export const getCarsInitiate = apiSlice.endpoints.getCars.initiate;
export const getCarsByLocationInitiate =
  apiSlice.endpoints.getCarsByLocation.initiate;
