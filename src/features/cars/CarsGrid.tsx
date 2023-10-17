import { Car, PayFor } from "../../types";
import CarItem from "./CarItem";

type CarsGridProps = {
  cars: Car[];
};

export default function CarsGrid({ cars }: CarsGridProps) {
  function renderCarItems(cars: Car[]) {
    return (
      <>
        {cars.map((car) => (
          <CarItem data-testid="car-item" key={car.id} car={car} />
        ))}
      </>
    );
  }

  return (
    <div className="grid grid-flow-row h-0 grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-1">
      {renderCarItems(cars)}
    </div>
  );
}
