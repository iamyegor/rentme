import { screen, waitFor } from "@testing-library/react";
import mockFailedResponse from "../../../test/helpers/mockFailedResponse.tsx";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";
import waitToAppearByTestId from "../../../test/helpers/waitToAppearByTestId.tsx";
import carsFixture from "../../../test/fixtures/carsFixture.ts";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";
import mockCarsResponseWithParams from "../../../test/helpers/mockCarsResponseWithParams.tsx";

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
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("pay-for-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /hour/i }));

    await waitFor(() => {
      expect(screen.getAllByTestId("car-price")[0]).toHaveTextContent("$27");
    });
    expect(screen.getAllByTestId("car-price")[1]).toHaveTextContent("$60");
  });
  it("displays cars for the selected location, when user selects location", async () => {
    mockCarsResponseWithParams(
      [{ city: "Moscow" }, { country: "Russia" }],
      [carsFixture[0]],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("select-location-button"));
    await userEvent.click(await screen.findByText(/moscow/i));

    await waitFor(() => {
      expect(screen.getByText("Ford Fusion Hybrid, 2020")).toBeInTheDocument();
    });
  });

  it("properly displays cars when both category and location are selected", async () => {
    mockCarsResponseWithParams(
      [{ city: "Moscow" }, { country: "Russia" }, { category: "premium" }],
      [],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("select-location-button"));
    await userEvent.click(await screen.findByText(/moscow/i));
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
    mockCarsResponseWithParams(
      [{ minPrice: "0.40" }, { maxPrice: "0.50" }],
      [carsFixture[0]],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.type(await screen.findByTestId("min-price"), "0.40");
    await userEvent.type(screen.getByTestId("max-price"), "0.50");

    await waitFor(() => {
      expect(screen.getAllByTestId("car-item").length).toBe(1);
      expect(screen.getByText("Ford Fusion Hybrid, 2020")).toBeInTheDocument();
    });
  });

  it("displays cars with price of specified range for hour", async () => {
    mockCarsResponseWithParams(
      [{ minPrice: "50" }, { maxPrice: "65" }],
      [carsFixture[1]],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("pay-for-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /hour/i }));
    await userEvent.type(await screen.findByTestId("min-price"), "50");
    await userEvent.type(screen.getByTestId("max-price"), "65");

    setTimeout(() => screen.debug(undefined, 20000), 1500);
    await waitFor(
      () => {
        expect(screen.getAllByTestId("car-item").length).toBe(1);
        expect(screen.getByText("Tesla S, 2019")).toBeInTheDocument();
      },
      { timeout: 1500 },
    );
  });

  it("displays appropriate cars when user clears min price using clear button", async () => {
    mockCarsResponseWithParams(
      [{ minPrice: "0.5" }, { maxPrice: "1.5" }],
      [carsFixture[1]],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.type(await screen.findByTestId("min-price"), "0.5");
    await userEvent.type(screen.getByTestId("max-price"), "1.5");

    await userEvent.click(screen.getByTestId("min-price-clear"));

    await waitFor(() => {
      expect(screen.getAllByTestId("car-item").length).toBe(2);
    });
  });

  it("displays appropriate cars when user clears max price using clear button", async () => {
    mockCarsResponseWithParams(
      [{ minPrice: "0.5" }, { maxPrice: "1.5" }],
      [carsFixture[1]],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.type(await screen.findByTestId("min-price"), "0.5");
    await userEvent.type(screen.getByTestId("max-price"), "1.5");

    await userEvent.click(screen.getByTestId("max-price-clear"));

    await waitFor(() => {
      expect(screen.getAllByTestId("car-item").length).toBe(2);
    });
  });

  it("displays cars not found when there are no cars corresponding with the min price filter", async () => {
    mockCarsResponseWithParams([{ minPrice: "1234" }], [], carsFixture);
    renderRouteInAppContext("/cars");

    await userEvent.type(await screen.findByTestId("min-price"), "1234");

    await waitFor(() => {
      expect(screen.getByTestId("cars-not-found-page")).toBeInTheDocument();
    });
  });

  it("displays cars not found when there are no cars corresponding with the max price filter", async () => {
    mockCarsResponseWithParams([{ maxPrice: "0.1" }], [], carsFixture);
    renderRouteInAppContext("/cars");

    await userEvent.type(await screen.findByTestId("max-price"), "0.1");

    await waitFor(() => {
      expect(screen.getByTestId("cars-not-found-page")).toBeInTheDocument();
    });
  });

  it("displays cars not found when there are no cars corresponding with the min and max price filters", async () => {
    mockCarsResponseWithParams(
      [{ minPrice: "1" }, { maxPrice: "2" }],
      [],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.type(await screen.findByTestId("min-price"), "1");
    await userEvent.type(screen.getByTestId("max-price"), "2");

    await waitFor(() => {
      expect(screen.getByTestId("cars-not-found-page")).toBeInTheDocument();
    });
  });

  it("displays cars not found when there are no cars corresponding with the location filter", async () => {
    mockCarsResponseWithParams(
      [
        {
          city: "Moscow",
          country: "Russia",
        },
      ],
      [],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("select-location-button"));
    await userEvent.click(await screen.findByText(/moscow/i));

    await waitFor(() => {
      expect(screen.getByTestId("cars-not-found-page")).toBeInTheDocument();
    });
  });

  it("displays cars not found when there are no cars corresponding with the category filter", async () => {
    mockCarsResponseWithParams([{ category: "premium" }], [], carsFixture);
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /premium/i }));

    await waitFor(() => {
      expect(screen.getByTestId("cars-not-found-page")).toBeInTheDocument();
    });
  });

  it("resets price filters when user clicks reset button on CarsNotFound page", async () => {
    mockCarsResponseWithParams(
      [{ minPrice: "1" }, { maxPrice: "2" }],
      [],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    const minPriceInput = await screen.findByTestId("min-price");
    await userEvent.type(minPriceInput, "1");

    const maxPriceInput = await screen.findByTestId("max-price");
    await userEvent.type(maxPriceInput, "2");

    await userEvent.click(await screen.findByTestId("reset-filters"));

    expect(minPriceInput).toHaveValue("");
    expect(maxPriceInput).toHaveValue("");
  });

  it("resets category filter when user clicks reset button on CarsNotFound page", async () => {
    mockCarsResponseWithParams([{ category: "premium" }], [], carsFixture);
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /premium/i }));

    await userEvent.click(await screen.findByTestId("reset-filters"));

    await waitFor(() => {
      expect(screen.getByTestId("category-dropdown")).toHaveTextContent("All");
    });
  });

  it("doesn't reset payFor filter when user clicks on reset filters button on CarsNotFound page", async () => {
    mockCarsResponseWithParams([{ minPrice: "1234" }], [], carsFixture);
    renderRouteInAppContext("/cars");

    const payForDropdown = await screen.findByTestId("pay-for-dropdown");
    await userEvent.click(payForDropdown);
    await userEvent.click(screen.getByRole("option", { name: /hour/i }));
    await userEvent.type(await screen.findByTestId("min-price"), "1234");
    await userEvent.click(await screen.findByTestId("reset-filters"));

    await waitFor(() => {
      expect(screen.getByTestId("pay-for-dropdown")).toHaveTextContent("Hour");
    });
  });
});

