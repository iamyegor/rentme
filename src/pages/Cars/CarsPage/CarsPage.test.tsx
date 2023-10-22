import { screen, waitFor } from "@testing-library/react";
import mockFailedResponse from "../../../test/helpers/mockFailedResponse.tsx";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";
import waitToAppearByTestId from "../../../test/helpers/waitToAppearByTestId.tsx";
import carsFixture from "../../../test/fixtures/carsFixture.ts";
import mockSuccessfulResponse from "../../../test/helpers/mockSuccessfulResponse.tsx";
import { expect } from "vitest";
import mockResponseWithParams from "../../../test/helpers/mockResponseWithParams.tsx";
import userEvent from "@testing-library/user-event";

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

    await waitFor(() => {
      expect(carPrices[0]).toHaveTextContent("$0.45");
    });
    await waitFor(() => {
      expect(carPrices[1]).toHaveTextContent("$1");
    });
  });

  it("displays proper car prices when user selects a pay for hour option", async () => {
    mockSuccessfulResponse("/api/cars", carsFixture);
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("pay-for-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /hour/i }));

    await waitFor(() => {
      expect(screen.getAllByTestId("car-price")[0]).toHaveTextContent("$27");
    });
    expect(screen.getAllByTestId("car-price")[1]).toHaveTextContent("$60");
  });

  it("displays cars for the selected location, when user selects location", async () => {
    mockResponseWithParams(
      [
        {
          key: "city",
          value: "Moscow",
        },
        {
          key: "country",
          value: "Russia",
        },
      ],
      [carsFixture[0]],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("select-location-button"));
    await userEvent.click(await screen.findByText("Moscow"));

    await waitFor(() => {
      expect(screen.getAllByTestId("car-item").length).toBe(1);
    });

    expect(screen.getByText("Ford Fusion Hybrid, 2020")).toBeInTheDocument();
  });

  it("properly displays cars when both category and location are selected", async () => {
    mockResponseWithParams(
      [
        { key: "city", value: "Moscow" },
        {
          key: "country",
          value: "Russia",
        },
        { key: "category", value: "premium" },
      ],
      [],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("select-location-button"));
    await userEvent.click(await screen.findByText("Moscow"));
    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /premium/i }));

    await waitFor(() => {
      expect(screen.queryAllByTestId("car-item")).toEqual([]);
    });
  });

  it("displays cars grouped by categories", async () => {
    renderRouteInAppContext("/cars");

    await waitToAppearByTestId("car-item");
    expect(screen.getAllByTestId("car-group").length).toBe(2);
    expect(screen.getByText(/economy/i)).toBeInTheDocument();
    expect(screen.getByText(/premium/i)).toBeInTheDocument();
  });

  it("displays cars with price of specified range for minute", async () => {
    mockResponseWithParams(
      [
        { key: "minPrice", value: "0.40" },
        {
          key: "maxPrice",
          value: "0.50",
        },
      ],
      [carsFixture[0]],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.type(await screen.findByTestId("min-price"), "0.40");
    await userEvent.type(screen.getByTestId("max-price"), "0.50");

    await userEvent.click(screen.getByTestId("apply-price-filter"));

    await waitFor(() => {
      expect(screen.getAllByTestId("car-item").length).toBe(1);
    });
    expect(screen.getByText("Ford Fusion Hybrid, 2020")).toBeInTheDocument();
  });

  it("displays cars with price of specified range for hour", async () => {
    mockResponseWithParams(
      [
        { key: "minPrice", value: "25" },
        {
          key: "maxPrice",
          value: "30",
        },
      ],
      [carsFixture[0]],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("pay-for-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /hour/i }));

    await userEvent.type(await screen.findByTestId("min-price"), "25");
    await userEvent.type(screen.getByTestId("max-price"), "30");
    await userEvent.click(screen.getByTestId("apply-price-filter"));

    await waitFor(() => {
      expect(screen.getAllByTestId("car-item").length).toBe(1);
    });
    expect(screen.getByText("Ford Fusion Hybrid, 2020")).toBeInTheDocument();
  });

  it("removes minPrice and maxPrice filter when user manually clears input fields", async () => {
    mockResponseWithParams(
      [
        { key: "minPrice", value: "25" },
        {
          key: "maxPrice",
          value: "30",
        },
      ],
      [carsFixture[0]],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.type(await screen.findByTestId("min-price"), "25");
    await userEvent.type(screen.getByTestId("max-price"), "30");
    await userEvent.click(screen.getByTestId("apply-price-filter"));

    await userEvent.clear(await screen.findByTestId("min-price"));
    await userEvent.clear(screen.getByTestId("max-price"));

    await waitFor(() => {
      expect(screen.getAllByTestId("car-item").length).toBe(2);
    });
  });
});
