import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car, Location, LowHighPrices } from "types.ts";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost/api" }),
  endpoints: (builder) => ({
    getCars: builder.query<Car[], void>({
      query: () => `/cars`,
    }),
    getCarsByParams: builder.query<Car[], string>({
      query: (paramsString) => `/cars?${paramsString}`,
    }),
    getLocations: builder.query<Location[], void>({
      query: () => `/locations`,
    }),
    getLowestAndHighestPrice: builder.query<LowHighPrices, string>({
      query: (paramsString) => `/lowestAndHighestPrice?${paramsString}`,
    }),
  }),
});

export const getCarsInitiate = apiSlice.endpoints.getCars.initiate;
export const {useGetCarsByParamsQuery} = apiSlice;
export const { useGetCarsQuery } = apiSlice;
export const { useGetLocationsQuery } = apiSlice;
export const { useGetLowestAndHighestPriceQuery } = apiSlice;
export const getCarsByParamsInitiate =
  apiSlice.endpoints.getCarsByParams.initiate;
