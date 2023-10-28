import "@testing-library/jest-dom";

import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { store } from "../app/store.ts";
import { apiSlice } from "../features/api/apiSlice.ts";
import { setupServer } from "msw/node";
import mockResponse from "./helpers/mockResponse.tsx";
import carsFixture from "./fixtures/carsFixture.ts";

export const server = setupServer();
beforeAll(() => server.listen());

afterAll(() => server.close());

beforeEach(() => {
  mockResponse(
    "/api/locations",
    carsFixture.map((car) => car.location),
  );
  mockResponse("/api/cars", { cars: carsFixture });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  store.dispatch(apiSlice.util.resetApiState());
});

/* RADIX UI MOCKS */

// radix UI appears to use ResizeObserver, which is not available in jsdom,
// so we have to mock it to get through the tests.
global.ResizeObserver = require("resize-observer-polyfill");

/**
 * JSDOM doesn't implement PointerEvent, so we need to mock our own implementation
 * Default to mouse left click interaction
 * https://github.com/radix-ui/primitives/issues/1822
 * https://github.com/jsdom/jsdom/pull/2666
 */
class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || "mouse";
  }
}

window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
