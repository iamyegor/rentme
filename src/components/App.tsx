import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "routes.tsx";
import { store } from "app/store.ts";
import { Provider } from "react-redux";
import { Theme } from "@radix-ui/themes";

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <Theme className="flex flex-col h-full">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Theme>
  );
}
