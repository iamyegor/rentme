import { useSearchParams} from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { appendSearchParam } from "../../../utils/appendSearchParam.ts";
import { useGetLowestAndHighestPriceQuery } from "../../../features/api/apiSlice.ts";
import "./price-filter.css";
import { debounce } from "lodash";
import close from "../../../../assets/icons/cross.png";
import { removeSearchParam } from "../../../utils/removeSearchParam.ts";

const NUMBER_DOT_REGEXP = /[^0-9.]/g;

export default function PriceFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPlaceholder, setMinPlaceholder] = useState("min price");
  const [maxPlaceholder, setMaxPlaceholder] = useState("max price");
  const { data, error } = useGetLowestAndHighestPriceQuery(
    searchParams.toString(),
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");

  const [maxPrice, setMaxPrice] = useState(
    () => searchParams.get("maxPrice") || "",
  );

  const debouncedMinPriceChange = useCallback(
    debounce((minPrice: string) => {
      if (minPrice) {
        searchParams.set("minPrice", minPrice);
        setSearchParams(searchParams);
      } else {
        searchParams.delete("minPrice");
        setSearchParams(searchParams);
      }
    }, 300),
    [searchParams],
  );

  const debouncedMaxPriceChange = useCallback(
    debounce((maxPrice: string) => {
      if (maxPrice) {
        appendSearchParam({ maxPrice: maxPrice }, setSearchParams);
      } else {
        removeSearchParam("maxPrice", setSearchParams);
      }
    }, 300),
    [searchParams],
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

  function handleMinPriceChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getActualInputValue(event.target.value);
    setMinPrice(value);
    debouncedMinPriceChange(value);
  }

  function handleMaxPriceChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getActualInputValue(event.target.value);
    setMaxPrice(value);
    debouncedMaxPriceChange(value);
  }

  function getActualInputValue(value: string) {
    return value.replace(NUMBER_DOT_REGEXP, "");
  }

  function clearMinPrice() {
    setMinPrice("");
    debouncedMinPriceChange("");
  }

  function clearMaxPrice() {
    setMaxPrice("");
    debouncedMaxPriceChange("");
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
