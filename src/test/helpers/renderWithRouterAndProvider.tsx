import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { setupStore } from "../../app/store";
import routes from "../../routes";

export default function renderWithRouterAndProvider(route: string) {
  const router = createMemoryRouter(routes, { initialEntries: [route] });
  const store = setupStore()

  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
