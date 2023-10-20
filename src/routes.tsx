import NotFound from "components/NotFound.tsx";
import Layout from "./components/Layout/Layout";
import CarsPage, {
  loader as carsLoader,
} from "./pages/Cars/CarsPage/CarsPage.tsx";
import HomePage from "./features/home/HomePage.tsx";
import ErrorPage from "components/ErrorPage.tsx";
import HowItWorksPage from "features/how-it-works/HowItWorksPage.tsx";

export default [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "cars",
        element: <CarsPage />,
        loader: carsLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "how-it-works",
        element: <HowItWorksPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
