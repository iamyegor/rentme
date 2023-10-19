import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";
import mockSuccessfulResponse from "../../../test/helpers/mockSuccessfulResponse.tsx";
import carsFixture from "../../../test/fixtures/carsFixture.ts";
import { expect } from "vitest";

describe("LocationFilter", () => {
  it("displays only cities and countries that have available cars", async () => {
    mockSuccessfulResponse("/api/cars", carsFixture);
    mockSuccessfulResponse("/api/locations", [
      {
        country: "Russia",
        city: "Moscow",
      },
      {
        country: "USA",
        city: "New York",
      },
    ]);
    renderRouteInAppContext("/cars");
    await screen.findAllByTestId("car-item");

    await userEvent.click(screen.getByTestId("select-location-button"));

    const cities = await screen.findAllByTestId("city-item");
    const countries = await screen.findAllByTestId("country-item");

    expect(cities.length).toBe(2);
    expect(countries.length).toBe(2);
  });
});
