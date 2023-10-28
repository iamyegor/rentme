import "./price-filter.css";
import MinPrice from "./MinPrice.tsx";
import MaxPrice from "./MaxPrice.tsx";

type PriceFilterProps = {
  prices:
    | {
        min: number;
        max: number;
      }
    | undefined;
};

export default function PriceFilter({ prices }: PriceFilterProps) {
  return (
    <div className={"filter-item flex items-center"}>
      <MinPrice minPrice={Number(prices?.min) || null} />
      <MaxPrice maxPrice={Number(prices?.max) || null} />
    </div>
  );
}
