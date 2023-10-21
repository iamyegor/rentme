import { describe, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";
import userEvent from "@testing-library/user-event";
import mockSuccessfulResponse from "../../../test/helpers/mockSuccessfulResponse.tsx";
import carsFixture from "../../../test/fixtures/carsFixture.ts";
import mockFailedResponse from "../../../test/helpers/mockFailedResponse.tsx";

beforeEach(() => {
  mockSuccessfulResponse(
    "/api/locations",
    carsFixture.map((car) => car.location),
  );
  mockSuccessfulResponse("/api/cars", carsFixture);
  mockSuccessfulResponse("/api/lowestAndHighestPrice", {});
});

describe("PriceFilter", () => {
  it("accepts only numbers for both inputs", async () => {
    renderRouteInAppContext("/cars");

    const minPrice = await screen.findByTestId("min-price");
    await userEvent.type(minPrice, "abc123");
    const maxPrice = await screen.findByTestId("max-price");
    await userEvent.type(maxPrice, "def321");

    expect(minPrice).toHaveValue("123");
    expect(maxPrice).toHaveValue("321");
  });

  it("clears the inputs when the reset button is clicked", async () => {
    renderRouteInAppContext("/cars");

    const minPrice = await screen.findByTestId("min-price");
    await userEvent.type(minPrice, "123");
    const maxPrice = await screen.findByTestId("max-price");
    await userEvent.type(maxPrice, "321");

    await userEvent.click(screen.getByTestId("reset-price-filter"));

    expect(minPrice).toHaveValue("");
    expect(maxPrice).toHaveValue("");
  });

  it("swap the inputs when max price is lower than min price and input lose focused", async () => {
    renderRouteInAppContext("/cars");

    const minPrice = await screen.findByTestId("min-price");
    await userEvent.type(minPrice, "321");
    const maxPrice = await screen.findByTestId("max-price");
    await userEvent.type(maxPrice, "123");
    await userEvent.tab(); // unfocus the input

    expect(minPrice).toHaveValue("123");
    expect(maxPrice).toHaveValue("321");
  });

  it("displays the lowest and highest price for minute as a placeholder when request succeeds", async () => {
    mockSuccessfulResponse("/api/lowestAndHighestPrice", {
      low: "0.45",
      high: "1",
    });
    renderRouteInAppContext("/cars");

    await waitFor(() => {
      expect(screen.getByTestId("min-price")).toHaveAttribute(
        "placeholder",
        "from 0.45",
      );
      expect(screen.getByTestId("max-price")).toHaveAttribute(
        "placeholder",
        "to 1",
      );
    });
  });

  it("displays the lowest and highest price for hour as a placeholder when user selects pay for hour and request succeeds", async () => {
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("pay-for-dropdown"));
    mockSuccessfulResponse("/api/lowestAndHighestPrice", {
      low: "27",
      high: "60",
    });
    await userEvent.click(screen.getByRole("option", { name: /hour/i }));

    await waitFor(() => {
      expect(screen.getByTestId("min-price")).toHaveAttribute(
        "placeholder",
        "from 27",
      );
      expect(screen.getByTestId("max-price")).toHaveAttribute(
        "placeholder",
        "to 60",
      );
    });
  });

  it("displays 'min price' and 'max price' as a placeholder when request fails", async () => {
    mockFailedResponse("/api/lowestAndHighestPrice", 404);
    renderRouteInAppContext("/cars");

    await waitFor(() => {
      expect(screen.getByTestId("min-price")).toHaveAttribute(
        "placeholder",
        "min price",
      );
      expect(screen.getByTestId("max-price")).toHaveAttribute(
        "placeholder",
        "max price",
      );
    });
  });

  it("displays 'min price' and 'max price' as a placeholder when no cars correspond with the filters", async () => {
    mockSuccessfulResponse("/api/lowestAndHighestPrice", {});
    renderRouteInAppContext("/cars");

    await waitFor(() => {
      expect(screen.getByTestId("min-price")).toHaveAttribute(
        "placeholder",
        "min price",
      );
      expect(screen.getByTestId("max-price")).toHaveAttribute(
        "placeholder",
        "max price",
      );
    });
  });

  it("sets price to the lowest one when user enters a value lower than the lowest price and input loses focus", async () => {
    mockSuccessfulResponse("/api/lowestAndHighestPrice", {
      low: "0.45",
      high: "1",
    });
    renderRouteInAppContext("/cars");

    const minPrice = await screen.findByTestId("min-price");
    await userEvent.type(minPrice, "0.44");
    await userEvent.tab(); // unfocus the input

    expect(minPrice).toHaveValue("0.45");
  });

  it("sets price to the highest one when user enters a value higher than the highest price and input loses focus", async () => {
    mockSuccessfulResponse("/api/lowestAndHighestPrice", {
      low: "0.45",
      high: "1",
    });
    renderRouteInAppContext("/cars");

    const maxPrice = await screen.findByTestId("max-price");
    await userEvent.type(maxPrice, "1.01");
    await userEvent.tab(); // unfocus the input

    expect(maxPrice).toHaveValue("1");
  });
});
