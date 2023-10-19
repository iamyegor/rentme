import { Car, PayFor } from "types";
import { useSearchParams } from "react-router-dom";

type CarItemProps = {
  car: Car;
};

export default function CarItem({ car }: CarItemProps) {
  const [searchParams, _] = useSearchParams();
  const payForFilter = searchParams.get("payFor");

  let price: number = car.minutePriceCents;
  if (payForFilter === PayFor.Hour) {
    price = car.minutePriceCents * 60;
  }
  price = price / 100;

  return (
    <div
      className="bg-[#f5f6f8] rounded-md h-[250px] w-[400px] 
      flex flex-col justify-between items-center box-border pt-10 pb-8
      hover:scale-[1.02] transition-all duration-300 ease-in-out hover:cursor-pointer
      hover:shadow-lg shadow-sm hover:border hover:border-[#d1d1d1] relative 
      basic-font"
      data-testid="car-item"
    >
      <img
        src={car.imageUrl}
        alt={""}
        className="w-[250px] h-[130px] object-contain
        hover:scale-[1.05] transition-all duration-300"
      />
      <div className="flex justify-between items-center w-full pl-8 pr-8">
        <div className="font-semibold text-lg max-w-[230px]">
          {car.make} {car.model}, {car.year}
        </div>
        <div>
          <span
            className="text-green-500 font-semibold"
            data-testid="car-price"
          >
            ${price}
          </span>
          <span className="font-semibold">
            {" "}
            / {payForFilter === PayFor.Hour ? "hour" : "min"}
          </span>
        </div>
      </div>
    </div>
  );
}
