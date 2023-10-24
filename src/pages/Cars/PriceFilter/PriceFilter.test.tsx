import { describe, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";
import userEvent from "@testing-library/user-event";
import mockSuccessfulResponse from "../../../test/helpers/mockSuccessfulResponse.tsx";
import mockFailedResponse from "../../../test/helpers/mockFailedResponse.tsx";

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
});
