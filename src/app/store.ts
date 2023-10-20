import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice.ts";

export function setupStore() {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware);
    },
  });
}

export const store = setupStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
