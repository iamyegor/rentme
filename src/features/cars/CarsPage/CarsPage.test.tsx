import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { expect } from "vitest";
import carsFixture from "../../../test/fixtures/carsFixture.ts";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";
import { server } from "../../../test/setup.ts";
import mockSuccessfulResponse from "test/helpers/mockSuccessfulResponse.tsx";
import mockFailedResponse from "test/helpers/mockFailedResponse.tsx";

// radix UI appears to use ResizeObserver, which is not available in jsdom,
// so we have to mock it to get through the tests.
global.ResizeObserver = require("resize-observer-polyfill");

describe("CarsPage", () => {
  it("renders cars list once loaded", async () => {
    mockSuccessfulResponse("/api/cars", carsFixture);
    renderRouteInAppContext("/cars");

    expect(screen.queryAllByTestId("car-item")).toEqual([]);
    const catItems = await screen.findAllByTestId("car-item");
    expect(catItems.length).toBe(2);
  });

  it("renders an error message when the request fails", async () => {
    mockFailedResponse("/api/cars", 500);
    renderRouteInAppContext("/cars");
    expect(screen.queryByTestId("error")).toEqual(null);

    const error = await screen.findByTestId("error");
    expect(error).toBeInTheDocument();
  });

  it("displays proper car prices when user selects a pay for minute option", async () => {
    mockSuccessfulResponse("/api/cars", carsFixture);
    renderRouteInAppContext("/cars");

    await screen.findAllByTestId("car-item");

    await userEvent.click(screen.getByTestId("pay-for-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /minute/i }));

    const carPrices = await screen.findAllByTestId("car-price");

    expect(carPrices[0]).toHaveTextContent("$0.45");
    expect(carPrices[1]).toHaveTextContent("$1");
  });

  it("displays proper car prices when user selects a pay for hour option", async () => {
    mockSuccessfulResponse("/api/cars", carsFixture);
    renderRouteInAppContext("/cars");

    await screen.findAllByTestId("car-item");

    await userEvent.click(screen.getByTestId("pay-for-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /hour/i }));

    const carPrices = await screen.findAllByTestId("car-price");

    expect(carPrices[0]).toHaveTextContent("$27");
    expect(carPrices[1]).toHaveTextContent("$60");
  });
});
