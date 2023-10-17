import React from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { store } from "../../../app/store.ts";
import AsyncErrorPage from "../../../components/AsyncErrorPage.tsx";
import { Car } from "../../../types.ts";
import { getCarsInitiate } from "../../api/apiSlice.ts";
import CarsGrid from "../CarsGrid.tsx";
import PayForFilter from "../PayForFilter.tsx";

export async function loader() {
  const promise = store.dispatch(getCarsInitiate());
  promise.unsubscribe();
  return defer({ cars: promise.unwrap() });
}

export default function CarsPage() {
  const { cars } = useLoaderData() as { cars: Promise<{ data: Car[] }> };

  return (
    <main className="flex flex-col items-center" data-testid="cars-page">
      <React.Suspense fallback={<div data-testid="spinner">Loading...</div>}>
        <div className="my-4 flex justify-center items-center space-x-4 w-full">
          <div>
            Choose you location
          </div>
          <PayForFilter />
        </div>
        <Await resolve={cars} errorElement={<AsyncErrorPage />}>
          {(cars: Car[]) => <CarsGrid cars={cars} />}
        </Await>
      </React.Suspense>
    </main>
  );
}
