import Layout from "./components/Layout/Layout";
import CarsPage, {
  loader as carsLoader,
} from "./features/cars/CarsPage/CarsPage.tsx";
import HomePage from "./features/home/HomePage.tsx";
import Error from "./components/Error/Error.tsx";

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
        errorElement: <Error />,
      },
    ],
  },
];
