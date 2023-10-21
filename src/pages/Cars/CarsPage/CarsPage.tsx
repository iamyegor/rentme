import React from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { store } from "../../../app/store.ts";
import AsyncErrorPage from "../../../components/AsyncErrorPage.tsx";
import { Car } from "../../../types.ts";
import { getCarsByParamsInitiate } from "../../../features/api/apiSlice.ts";
import CarsGrid from "../CarsGrid.tsx";
import PayForFilter from "../PayForFilter.tsx";
import LocationFilter from "../LocationFilter/LocationFilter.tsx";
import CategoryFilter from "../CategoryFilter/CategoryFilter.tsx";
import PriceFilter from "../PriceFilter/PriceFilter.tsx";

export async function loader({ request }: { request: any }) {
  const carsPromise = store.dispatch(
    getCarsByParamsInitiate(new URL(request.url).searchParams.toString()),
  );

  carsPromise.unsubscribe();
  return defer({
    carsPromise: carsPromise.unwrap(),
  });
}

export default function CarsPage() {
  const { carsPromise } = useLoaderData() as {
    carsPromise: Promise<Car[]>;
  };

  return (
    <main className="flex flex-col items-center" data-testid="cars-page">
      <React.Suspense
        fallback={<div data-testid="spinner">Loading 1234556...</div>}
      >
        <div className="my-4 flex justify-center items-center space-x-4 w-full">
          <CategoryFilter />
          <LocationFilter />
          <PayForFilter />
          <PriceFilter />
        </div>
        <Await resolve={carsPromise} errorElement={<AsyncErrorPage />}>
          {(cars) => <CarsGrid cars={cars} />}
        </Await>
      </React.Suspense>
    </main>
  );
}
