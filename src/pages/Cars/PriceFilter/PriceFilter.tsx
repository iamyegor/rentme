import { useSearchParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { removeSearchParam } from "../../../utils/removeSearchParam.ts";
import { appendSearchParam } from "../../../utils/appendSearchParam.ts";
import { useGetLowestAndHighestPriceQuery } from "../../../features/api/apiSlice.ts";
import reset from "../../../../assets/icons/refresh-arrow.png";
import apply from "../../../../assets/icons/magnifying-glass.png";
import "./price-filter.css";

const NUMBER_DOT_REGEXP = /[^0-9.]/g;

export default function PriceFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const otherSearchParams = Object.fromEntries(
    [...searchParams.entries()].filter(
      ([key]) => key !== "minPrice" && key !== "maxPrice",
    ),
  );
  const [minPlaceholder, setMinPlaceholder] = useState("min price");
  const [maxPlaceholder, setMaxPlaceholder] = useState("max price");
  const { data, error } = useGetLowestAndHighestPriceQuery(
    searchParams.toString(),
  );
  const [minPrice, setMinPrice] = useState(
    () => searchParams.get("minPrice") || "",
  );
  const [maxPrice, setMaxPrice] = useState(
    () => searchParams.get("maxPrice") || "",
  );

  useEffect(() => {
    if (data?.low && data?.high && !error) {
      setMinPlaceholder(`from ${data.low}`);
      setMaxPlaceholder(`to ${data.high}`);
    } else {
      setMinPlaceholder("min price");
      setMaxPlaceholder("max price");
    }
  }, [data]);

  useEffect(() => {
    resetPrices();
  }, [JSON.stringify(otherSearchParams)]);

  function applyPrices() {
    if (minPrice) {
      appendSearchParam({ key: "minPrice", value: minPrice }, setSearchParams);
    } else {
      removeSearchParam("minPrice", setSearchParams);
    }

    if (maxPrice) {
      appendSearchParam({ key: "maxPrice", value: maxPrice }, setSearchParams);
    } else {
      removeSearchParam("maxPrice", setSearchParams);
    }
  }

  function handleMinPriceChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setMinPrice(value.replace(NUMBER_DOT_REGEXP, ""));
  }

  function handleMaxPriceChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setMaxPrice(value.replace(NUMBER_DOT_REGEXP, ""));
  }

  function resetPrices() {
    setMinPrice("");
    setMaxPrice("");
    removeSearchParam("minPrice", setSearchParams);
    removeSearchParam("maxPrice", setSearchParams);
  }

  function handleBlur() {
    const newMinPrice = Number(setMinPriceIfNecessary()) || Number(minPrice);
    const newMaxPrice = Number(setMaxPriceIfNecessary()) || Number(maxPrice);
    if (newMinPrice && newMaxPrice) {
      if (newMinPrice > newMaxPrice) {
        setMinPrice(newMaxPrice.toString());
        setMaxPrice(newMinPrice.toString());
      }
    }
  }

  function setMinPriceIfNecessary() {
    if (data?.low && data?.high) {
      if (minPrice && Number(minPrice) > data.high) {
        setMinPrice(data.high.toString());
        return data.high.toString();
      }
      if (minPrice && Number(minPrice) < data.low) {
        setMinPrice(data.low.toString());
        return data.low.toString();
      }
    }
  }

  function setMaxPriceIfNecessary() {
    if (data?.low && data?.high) {
      if (maxPrice && Number(maxPrice) > data.high) {
        setMaxPrice(data.high.toString());
        return data.high.toString();
      }
      if (maxPrice && Number(maxPrice) < data.low) {
        setMaxPrice(data.high.toString());
        return data.high.toString();
      }
    }
  }

  return (
    <div className={"filter-item flex items-center"}>
      <span className={"mr-0.5 text-green-500 scale-[1.15]"}>$</span>
      <input
        name={"minPrice"}
        className={"price-filter__input mr-2"}
        type={"text"}
        data-testid={"min-price"}
        placeholder={minPlaceholder}
        onBlur={handleBlur}
        onChange={handleMinPriceChange}
        value={minPrice}
        autoComplete={"off"}
      />
      <span className={"mr-0.5 text-green-500 scale-[1.15]"}>$</span>
      <input
        name={"maxPrice"}
        className={"price-filter__input"}
        type={"text"}
        data-testid={"max-price"}
        placeholder={maxPlaceholder}
        onBlur={handleBlur}
        onChange={handleMaxPriceChange}
        value={maxPrice}
        autoComplete={"off"}
      />
      <button data-testid={"apply-price-filter"} onClick={applyPrices}>
        <div className={"price-filter__icon-container ml-1 rounded-l-md"}>
          <img className={"w-5"} src={apply} alt={""} />
        </div>
      </button>
      <button data-testid={"reset-price-filter"} onClick={resetPrices}>
        <div className={"price-filter__icon-container -ml-[1px] rounded-r-md"}>
          <img className={"w-5"} src={reset} alt={""} />
        </div>
      </button>
    </div>
  );
}
