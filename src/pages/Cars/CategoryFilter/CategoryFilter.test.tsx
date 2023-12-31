﻿import carsFixture from "../../../test/fixtures/carsFixture.ts";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { describe, expect } from "vitest";
import mockConditionalResponse from "test/helpers/mockConditionalResponse.tsx";

describe("CategoryFilter", () => {
  it("displays only cars that correspond with the selected category when user selects category", async () => {
    mockConditionalResponse([{ category: "economy" }], [carsFixture[0]], []);
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /economy/i }));

    await waitFor(() =>
      expect(screen.getAllByTestId("car-item").length).toBe(1),
    );
    expect(screen.getByText("Ford Fusion Hybrid, 2020")).toBeInTheDocument();
  });

  it("displays all cars when user selects all categories", async () => {
    mockConditionalResponse(
      [{ category: "economy" }],
      [carsFixture[0]],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /economy/i }));
    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /all/i }));

    await waitFor(() =>
      expect(screen.getAllByTestId("car-item").length).toBe(2),
    );
  });

  it("resets category filter when clear filters button is clicked", async () => {
    mockConditionalResponse(
      [{ category: "economy" }],
      [carsFixture[0]],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /economy/i }));
    await userEvent.click(await screen.findByTestId("clear-filters"));

    expect(await screen.findByTestId("category-dropdown")).toHaveTextContent(
      /all/i,
    );
  });
});
