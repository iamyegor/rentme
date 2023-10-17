import { Select } from "@radix-ui/themes";
import { useAppDispatch } from "app/hooks.ts";
import React from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { store } from "../../../app/store.ts";
import AsyncErrorPage from "../../../components/AsyncErrorPage.tsx";
import { Car, PayFor } from "../../../types.ts";
import { getCarsInitiate } from "../../api/apiSlice.ts";
import CarsGrid from "../CarsGrid.tsx";
import { changePayFor } from "../carsSlice.ts";

export async function loader() {
  const promise = store.dispatch(getCarsInitiate());
  promise.unsubscribe();
  return defer({ cars: promise.unwrap() });
}

export default function CarsPage() {
  const { cars } = useLoaderData() as { cars: Promise<{ data: Car[] }> };
  const dispatch = useAppDispatch();

  return (
    <main className="flex flex-col items-center" data-testid="cars-page">
      <React.Suspense fallback={<div data-testid="spinner">Loading...</div>}>
        <div className="flex items-center">
          <span className="mr-2">Pay for</span>
          <Select.Root
            defaultValue={PayFor.Minute}
            onValueChange={(value: PayFor) => dispatch(changePayFor(value))}
          >
            <Select.Trigger variant="ghost" className="font-semibold" />
            <Select.Content>
              <Select.Group>
                <Select.Item value={PayFor.Hour}>Hour</Select.Item>
                <Select.Item value={PayFor.Minute}>Minute</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
        <Await resolve={cars} errorElement={<AsyncErrorPage />}>
          {(cars: Car[]) => <CarsGrid cars={cars} />}
        </Await>
      </React.Suspense>
    </main>
  );
}
