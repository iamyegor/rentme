import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "../../routes.tsx";
import { store } from "../../app/store.ts";
import { Provider } from "react-redux";

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
