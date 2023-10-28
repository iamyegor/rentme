import { describe, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";
import userEvent from "@testing-library/user-event";
import mockResponse from "../../../test/helpers/mockResponse.tsx";
import mockConditionalResponse from "../../../test/helpers/mockConditionalResponse.tsx";
import { getCarsFixture } from "../../../test/fixtures/carsFixtureV2.ts";

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

  it("displays the lowest and highest price for minute as a placeholder", async () => {
    mockSuccessfulPricesResponse("0.45", "1");
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

  it("displays the lowest and highest price for hour as a placeholder when user selects pay for hour", async () => {
    mockSuccessfulPricesResponse("0.45", "1");
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("pay-for-dropdown"));
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

  it("displays 'min price' and 'max price' as a placeholder when there are no cars", async () => {
    mockResponse("/api/cars", { cars: [] });
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

  it("clears the min price input field when user clicks on the clear button", async () => {
    renderRouteInAppContext("/cars");

    await userEvent.type(await screen.findByTestId("min-price"), "0.25");
    await userEvent.click(screen.getByTestId("min-price-clear"));

    expect(screen.getByTestId("min-price")).toHaveValue("");
  });

  it("clears the max price input field when user clicks on the clear button", async () => {
    renderRouteInAppContext("/cars");

    await userEvent.type(await screen.findByTestId("max-price"), "0.25");
    await userEvent.click(screen.getByTestId("max-price-clear"));

    expect(screen.getByTestId("max-price")).toHaveValue("");
  });

  it("clears the min and max price inputs when clear filters button is clicked", async () => {
    mockConditionalResponse(
      [{ minPrice: "0.25" }, { maxPrice: "0.25" }],
      [getCarsFixture()[0]],
      getCarsFixture(),
    );
    renderRouteInAppContext("/cars");

    await userEvent.type(await screen.findByTestId("min-price"), "0.25");
    await userEvent.type(await screen.findByTestId("max-price"), "0.25");
    await waitFor(() =>
      expect(screen.getAllByTestId("car-item").length).toBe(1),
    );

    await userEvent.click(screen.getByTestId("clear-filters"));

    await waitFor(() => {
      expect(screen.getByTestId("min-price")).toHaveValue("");
      expect(screen.getByTestId("max-price")).toHaveValue("");
    });
  });
});

function mockSuccessfulPricesResponse(min: string, max: string) {
  mockResponse("/api/cars", {
    cars: [],
    prices: {
      min: min,
      max: max,
    },
  });
}
