import React from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { store } from "../../../app/store.ts";
import { Car } from "../../../types.ts";
import { getCarsInitiate } from "../../api/apiSlice.ts";
import CarsGrid from "../CarsGrid.tsx";
import AsyncErrorPage from "../../../components/AsyncErrorPage.tsx";

export async function loader() {
  const promise = store.dispatch(getCarsInitiate());
  promise.unsubscribe();
  return defer({ cars: promise.unwrap() });
}

export default function CarsPage() {
  const { cars } = useLoaderData() as { cars: Promise<{ data: Car[] }> };

  return (
    <main className="flex justify-center" data-testid="cars-page">
      <React.Suspense fallback={<div data-testid="spinner">Loading...</div>}>
        <Await resolve={cars} errorElement={<AsyncErrorPage />}>
          {(cars: Car[]) => <CarsGrid cars={cars} />}
        </Await>
      </React.Suspense>
    </main>
  );
}
