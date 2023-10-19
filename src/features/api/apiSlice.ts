import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car, Location, SearchParam } from "types.ts";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost/api" }),
  endpoints: (builder) => ({
    getCars: builder.query<Car[], void>({
      query: () => `/cars`,
    }),
    getCarsByParams: builder.query<Car[], SearchParam[]>({
      query: (params) =>
        `/cars?${params.map(({ key, value }) => `${key}=${value}`).join(`&`)}`,
    }),
    getLocations: builder.query<Location[], void>({
      query: () => `/locations`,
    }),
  }),
});

export const getCarsInitiate = apiSlice.endpoints.getCars.initiate;
export const { useGetLocationsQuery } = apiSlice;
export const getCarsByParamsInitiate =
  apiSlice.endpoints.getCarsByParams.initiate;
