import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockFailedResponse from "test/helpers/mockFailedResponse.tsx";
import mockSuccessfulResponse from "test/helpers/mockSuccessfulResponse.tsx";
import { beforeEach, expect } from "vitest";
import carsFixture from "test/fixtures/carsFixture.ts";
import renderRouteInAppContext from "test/helpers/renderRouteInAppContext.tsx";
import mockCarByLocationResponse from "../../../test/helpers/mockCarByLocationResponse.tsx";
import waitToAppearByTestId from "../../../test/helpers/waitToAppearByTestId.tsx";
import mockCarByCategoryResponse from "../../../test/helpers/mockCarByCategoryResponse.tsx";
import mockCarByLocationAndCategoryResponse from "../../../test/helpers/mockCarByLocationAndCategoryResponse.tsx";

beforeEach(() => {
  mockSuccessfulResponse(
    "/api/locations",
    carsFixture.map((car) => car.location),
  );
  mockSuccessfulResponse("/api/cars", carsFixture);
});

describe("CarsPage", () => {
  it("displays cars list once loaded", async () => {
    renderRouteInAppContext("/cars");

    expect(screen.queryAllByTestId("car-item")).toEqual([]);
    const catItems = await screen.findAllByTestId("car-item");
    expect(catItems.length).toBe(2);
  });

  it("displays an error message when cars loading fails", async () => {
    mockFailedResponse("/api/cars", 500);
    renderRouteInAppContext("/cars");

    expect(screen.queryByTestId("error")).toEqual(null);

    const error = await screen.findByTestId("error");
    expect(error).toBeInTheDocument();
  });

  it("displays proper car prices when user selects a pay for minute option", async () => {
    renderRouteInAppContext("/cars");
    await waitToAppearByTestId("car-item");

    await userEvent.click(screen.getByTestId("pay-for-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /minute/i }));

    const carPrices = await screen.findAllByTestId("car-price");

    expect(carPrices[0]).toHaveTextContent("$0.45");
    expect(carPrices[1]).toHaveTextContent("$1");
  });

  it("displays proper car prices when user selects a pay for hour option", async () => {
    renderRouteInAppContext("/cars");
    await waitToAppearByTestId("car-item");

    await userEvent.click(screen.getByTestId("pay-for-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /hour/i }));

    const carPrices = await screen.findAllByTestId("car-price");

    expect(carPrices[0]).toHaveTextContent("$27");
    expect(carPrices[1]).toHaveTextContent("$60");
  });

  it("displays cars for the selected location, when user selects location", async () => {
    mockCarByLocationResponse();
    renderRouteInAppContext("/cars");
    await waitToAppearByTestId("car-item");

    await userEvent.click(screen.getByTestId("select-location-button"));
    await userEvent.click(await screen.findByText("Moscow"));

    await waitFor(() => {
      expect(screen.getAllByTestId("car-item").length).toBe(1);
    });

    expect(screen.getByText("Ford Fusion Hybrid, 2020")).toBeInTheDocument();
  });

  it("displays only cars that correspond to the selected category when user selects category", async () => {
    mockCarByCategoryResponse("economy", [carsFixture[0]]);
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /economy/i }));
    const carItems = await screen.findAllByTestId("car-item");

    expect(carItems.length).toBe(1);
    expect(screen.getByText("Ford Fusion Hybrid, 2020")).toBeInTheDocument();
  });

  it("displays all cars when user selects all categories", async () => {
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /economy/i }));
    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /all/i }));
    const carItems = await screen.findAllByTestId("car-item");

    expect(carItems.length).toBe(2);
  });

  it("properly displays cars when both category and location are selected", async () => {
    mockCarByLocationAndCategoryResponse();
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("select-location-button"));
    await userEvent.click(await screen.findByText("Moscow"));
    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /premium/i }));

    expect(screen.queryAllByTestId("car-item")).toEqual([]);
  });
});
