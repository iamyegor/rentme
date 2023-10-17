import { useAppSelecter } from "app/hooks";
import { Car, PayFor } from "../../types";
import { selectPayFor } from "./carsSlice";

type CarItemProps = {
  car: Car;
};

export default function CarItem({ car }: CarItemProps) {
  const payFor = useAppSelecter((state) => selectPayFor(state));

  let price: number = car.minutePriceCents;
  if (payFor === PayFor.Hour) {
    price = car.minutePriceCents * 60;
  }
  price = price / 100;

  return (
    <div
      className="bg-[#f5f6f8] rounded-md h-[250px] w-[400px] 
      flex flex-col justify-between items-center box-border pt-10 pb-8
      hover:scale-[1.02] transition-all duration-300 ease-in-out hover:cursor-pointer
      hover:shadow-lg shadow-sm hover:border hover:border-[#d1d1d1] relative"
      data-testid="car-item"
    >
      <img
        src={car.imageUrl}
        className="w-[250px] h-[130px] object-contain
        hover:scale-[1.05] transition-all duration-300"
      />
      <div className="flex justify-between items-center w-full pl-8 pr-8">
        <span className="font-semibold text-lg max-w-[230px]">
          {car.make} {car.model}, {car.year}
        </span>
        <div>
          <span className="text-green-500 font-semibold">${price}</span>
          <span className="font-semibold">
            {" "}
            / {payFor === PayFor.Hour ? "hour" : "min"}
          </span>
        </div>
      </div>
    </div>
  );
}
