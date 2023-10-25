import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car, Location } from "types.ts";

type CarsResponse = {
  cars: Car[];
  prices: {
    min: number;
    max: number;
  };
};

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost/api" }),
  endpoints: (builder) => ({
    getCarsByParams: builder.query<CarsResponse, string>({
      query: (paramsString) => `/cars?${paramsString}`,
    }),
    getLocations: builder.query<Location[], void>({
      query: () => `/locations`,
    }),
  }),
});

export const {useGetCarsByParamsQuery} = apiSlice;
export const { useGetLocationsQuery } = apiSlice;