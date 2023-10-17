import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car } from "../../types.ts";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost/api" }),
  endpoints: (builder) => ({
    getCars: builder.query<Car[], void>({
      query: () => `/cars`,
    }),
  }),
});

export const { useGetCarsQuery } = apiSlice;
export const getCarsInitiate = apiSlice.endpoints.getCars.initiate;
