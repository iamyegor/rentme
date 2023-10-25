import { useSearchParams } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./price-filter.css";
import { debounce } from "lodash";
import close from "../../../../assets/icons/cross.png";
import { PayFor } from "../../../types.ts";

const NUMBER_DOT_REGEXP = /[^0-9.]/g;

type PriceFilterProps = {
  prices:
    | {
        min: number;
        max: number;
      }
    | undefined;
};

export default function PriceFilter({ prices }: PriceFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPlaceholder, setMinPlaceholder] = useState("min price");
  const [maxPlaceholder, setMaxPlaceholder] = useState("max price");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);

  const debouncedMinPriceChange = useCallback(
    debounce((minPrice: string) => {
      setDebouncedMinPrice(minPrice);
    }, 300),
    [],
  );

  const debouncedMaxPriceChange = useCallback(
    debounce((maxPrice: string) => {
      setDebouncedMaxPrice(maxPrice);
    }, 300),
    [],
  );

  useEffect(() => {
    if (prices) {
      if (searchParams.get("payFor") === PayFor.Hour) {
        setMinPlaceholder(`from ${prices.min * 60}`);
        setMaxPlaceholder(`to ${prices.max * 60}`);
      } else {
        setMinPlaceholder(`from ${prices.min}`);
        setMaxPlaceholder(`to ${prices.max}`);
      }
    } else {
      setMinPlaceholder("min price");
      setMaxPlaceholder("max price");
    }
  }, [prices, searchParams.get("payFor")]);

  useEffect(() => {
    setMinPrice(searchParams.get("minPrice") || "");
  }, [searchParams.get("minPrice")]);

  useEffect(() => {
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams.get("maxPrice")]);

  useEffect(() => {
    if (debouncedMinPrice) {
      searchParams.set("minPrice", minPrice);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("minPrice");
      setSearchParams(searchParams);
    }
  }, [debouncedMinPrice]);

  useEffect(() => {
    if (debouncedMaxPrice) {
      searchParams.set("maxPrice", maxPrice);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("maxPrice");
      setSearchParams(searchParams);
    }
  }, [debouncedMaxPrice]);

  useEffect(() => {
    debouncedMinPriceChange(minPrice);
  }, [minPrice]);

  useEffect(() => {
    debouncedMaxPriceChange(maxPrice);
  }, [maxPrice]);

  function handleMinPriceChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getActualInputValue(event.target.value);
    setMinPrice(value);
  }

  function handleMaxPriceChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getActualInputValue(event.target.value);
    setMaxPrice(value);
  }

  function getActualInputValue(value: string) {
    return value.replace(NUMBER_DOT_REGEXP, "");
  }

  function clearMinPrice() {
    setMinPrice("");
  }

  function clearMaxPrice() {
    setMaxPrice("");
  }

  return (
    <div className={"filter-item flex items-center"}>
      <span className={"price-filter__dollar-sign"}>$</span>
      <div className={"price-filter__input-container mr-2"}>
        <input
          name={"minPrice"}
          className={"price-filter__input"}
          type={"text"}
          data-testid={"min-price"}
          placeholder={minPlaceholder}
          onChange={handleMinPriceChange}
          value={minPrice}
          autoComplete={"off"}
        />
        <button
          className={"cursor-pointer"}
          onClick={clearMinPrice}
          data-testid={"min-price-clear"}
        >
          <img className={"min-w-[1.3rem] w-[1.3rem]"} src={close} alt={""} />
        </button>
      </div>
      <span className={"price-filter__dollar-sign"}>$</span>
      <div className={"price-filter__input-container"}>
        <input
          name={"maxPrice"}
          className={"price-filter__input"}
          type={"text"}
          data-testid={"max-price"}
          placeholder={maxPlaceholder}
          onChange={handleMaxPriceChange}
          value={maxPrice}
          autoComplete={"off"}
        />
        <button
          className={"cursor-pointer"}
          onClick={clearMaxPrice}
          data-testid={"max-price-clear"}
        >
          <img className={"min-w-[1.3rem] w-[1.3rem]"} src={close} alt={""} />
        </button>
      </div>
    </div>
  );
}
