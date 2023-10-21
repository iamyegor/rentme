import { screen } from "@testing-library/react";

export default async function waitToAppearByTestId(elementTestId: string) {
  await screen.findAllByTestId(elementTestId);
}