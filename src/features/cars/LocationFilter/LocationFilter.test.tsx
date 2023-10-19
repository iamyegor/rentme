import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";
import mockSuccessfulResponse from "../../../test/helpers/mockSuccessfulResponse.tsx";
import carsFixture from "../../../test/fixtures/carsFixture.ts";
import { beforeEach, expect } from "vitest";

beforeEach(() => {
  mockSuccessfulResponse(
    "/api/locations",
    carsFixture.map((car) => car.location),
  );
  mockSuccessfulResponse("/api/cars", carsFixture);
});

describe("LocationFilter", () => {
  it("displays only cities and countries that have available cars", async () => {
    mockSuccessfulResponse("/api/cars", carsFixture);
    renderRouteInAppContext("/cars");

    const selectLocationButton = await screen.findByTestId(
      "select-location-button",
    );
    await userEvent.click(selectLocationButton);
    const cities = await screen.findAllByTestId("city-item");
    const countries = await screen.findAllByTestId("country-item");

    expect(cities.length).toBe(2);
    expect(countries.length).toBe(2);
  });

  it("displays a location once it is selected", async () => {
    renderRouteInAppContext("/cars");

    const selectLocationButton = await screen.findByTestId(
      "select-location-button",
    );
    expect(screen.queryByText("Moscow, Russia")).toEqual(null);
    await userEvent.click(selectLocationButton);
    const moscow = await screen.findByText("Moscow");
    await userEvent.click(moscow);

    expect(await screen.findByText("Moscow, Russia")).toBeInTheDocument();
  });

  it("repaints the selected location in choose location menu when the user selects it", async () => {
    renderRouteInAppContext("/cars");

    const selectLocationButton = await screen.findByTestId(
      "select-location-button",
    );
    await userEvent.click(selectLocationButton);
    let moscow = await screen.findByText("Moscow");
    // moscow.style.color returns an empty string for some reason,
    // so use style instead.
    const prevStyle = moscow.style;
    await userEvent.click(moscow);

    await userEvent.click(selectLocationButton);
    moscow = await screen.findByText("Moscow");
    expect(moscow.style).not.toEqual(prevStyle);
  });
});
