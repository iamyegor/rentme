import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { apiSlice } from "../features/api/apiSlice";
import { store } from "app/store";

export const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  store.dispatch(apiSlice.util.resetApiState());
});
afterAll(() => server.close());
