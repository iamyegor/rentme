import "@testing-library/jest-dom";
import { store } from "app/store";
import { setupServer } from "msw/node";
import { apiSlice } from "../features/api/apiSlice";

// radix UI appears to use ResizeObserver, which is not available in jsdom,
// so we have to mock it to get through the tests.
global.ResizeObserver = require("resize-observer-polyfill");

export const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  store.dispatch(apiSlice.util.resetApiState());
});
afterAll(() => server.close());

/**
 * JSDOM doesn't implement PointerEvent so we need to mock our own implementation
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
