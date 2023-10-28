import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";
import { expect } from "vitest";

describe("LocationFilter", () => {
  it("displays only cities and countries that have available cars", async () => {
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

  it("repaints the selected location in location menu when the user selects it", async () => {
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

  it("displays proper location when users types city in search input", async () => {
    renderRouteInAppContext("/cars");

    const selectLocationButton = await screen.findByTestId(
      "select-location-button",
    );
    await userEvent.click(selectLocationButton);
    const searchInput = await screen.findByTestId("search-input");
    expect(screen.getAllByTestId("city-item").length).toBe(2);
    await userEvent.type(searchInput, "Moscow");

    expect(screen.getAllByTestId("city-item").length).toBe(1);
  });

  it("clears search input when the user opens location menu once again", async () => {
    renderRouteInAppContext("/cars");

    const selectLocationButton = await screen.findByTestId(
      "select-location-button",
    );
    await userEvent.click(selectLocationButton);
    const searchInput = await screen.findByTestId("search-input");
    await userEvent.type(searchInput, "Moscow");
    await userEvent.click(screen.getByText("Moscow"));
    await userEvent.click(selectLocationButton);

    expect(searchInput).toHaveValue("");
  });

  it("displays all locations when clear filters button is clicked", async () => {
    renderRouteInAppContext("/cars");

    const selectLocationButton = await screen.findByTestId(
      "select-location-button",
    );
    await userEvent.click(selectLocationButton);
    await userEvent.click(screen.getByText(/moscow/i));
    await userEvent.click(await screen.findByTestId("clear-filters"));

    expect(selectLocationButton).toHaveTextContent(/location/i);
  });
});
