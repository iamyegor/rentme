import { Car, Category } from "../../types.ts";
import CarItem from "./CarItem.tsx";
import { nanoid } from "@reduxjs/toolkit";

type CarsGridProps = {
  cars: Car[];
};

type GroupedCars = Record<Category, Car[]>;

export default function CarsGrid({ cars }: CarsGridProps) {
  function renderCarItems(cars: Car[]) {
    const groupedCars = groupCarsByCategory(cars);

    const categories = Object.keys(groupedCars) as Category[];
    return categories.map((category) => (
      <div key={nanoid()} className="flex flex-col mb-4" data-testid={"car-group"}>
        <h1 className="text-2xl font-bold basic-font">
          {category.charAt(0).toUpperCase() + category.substring(1)}
        </h1>
        <div className={"border-black grid mt-4 grid-cols-3 gap-1"}>
          {groupedCars[category].map((car) => (
            <CarItem data-testid="car-item" key={car.id} car={car} />
          ))}
        </div>
      </div>
    ));
  }

  function groupCarsByCategory(cars: Car[]) {
    return cars.reduce((result, car) => {
      (result[car.category] = result[car.category] || []).push(car);
      return result;
    }, {} as GroupedCars);
  }

  return <>{renderCarItems(cars)}</>;
}
