﻿import { screen } from "@testing-library/react";
import { rest } from "msw";
import { expect } from "vitest";
import carsFixture from "../../../test/fixtures/carsFixture.ts";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";
import { server } from "../../../test/setup.ts";

// radix UI appears to use ResizeObserver, which is not available in jsdom,
// so we have to mock it to get through the tests.
global.ResizeObserver = require("resize-observer-polyfill");

describe("CarsPage", () => {
  it("renders cars list once loaded", async () => {
    server.use(
      rest.get("http://localhost/api/cars", (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(carsFixture), ctx.delay(150));
      })
    );
    renderRouteInAppContext("/cars");

    expect(screen.queryAllByTestId("car-item")).toEqual([]);
    const catItems = await screen.findAllByTestId("car-item");
    expect(catItems.length).toBe(4);
  });

  it("renders an error message when the request fails", async () => {
    server.use(
      rest.get("http://localhost/api/cars", (_, res, ctx) => {
        return res(ctx.status(500), ctx.delay(150));
      })
    );
    renderRouteInAppContext("/cars");
    expect(screen.queryByTestId("error")).toEqual(null);

    const error = await screen.findByTestId("error");
    expect(error).toBeInTheDocument();
  });
});