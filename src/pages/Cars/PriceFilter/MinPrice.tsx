import { useSearchParams } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./price-filter.css";
import { debounce } from "lodash";
import close from "../../../../assets/icons/cross.png";
import { PayFor } from "../../../types.ts";
import { appendSearchParam } from "../../../utils/appendSearchParam.ts";
import { removeSearchParam } from "../../../utils/removeSearchParam.ts";

type PriceFilterProps = {
  minPrice: number | null;
};

const NUMBER_DOT_REGEXP = /[^0-9.]/g;

export default function MinPrice({ minPrice }: PriceFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [placeholder, setPlaceholder] = useState("min price");
  const [price, setPrice] = useState(searchParams.get("minPrice") || "");
  const [debouncedPrice, setDebouncedPrice] = useState(price);

  const debouncedPriceChange = useCallback(
    debounce((minPrice: string) => {
      setDebouncedPrice(minPrice);
    }, 300),
    [],
  );

  useEffect(() => {
    if (minPrice) {
      if (searchParams.get("payFor") === PayFor.Hour) {
        setPlaceholder(`from ${minPrice * 60}`);
      } else {
        setPlaceholder(`from ${minPrice}`);
      }
    } else {
      setPlaceholder("min price");
    }
  }, [minPrice, searchParams.get("payFor")]);

  useEffect(() => {
    setPrice(searchParams.get("minPrice") || "");
  }, [searchParams.get("minPrice")]);

  useEffect(() => {
    if (debouncedPrice) {
      appendSearchParam({ minPrice: debouncedPrice }, setSearchParams);
    } else {
      removeSearchParam("minPrice", setSearchParams);
    }
  }, [debouncedPrice]);

  useEffect(() => {
    debouncedPriceChange(price);
  }, [price]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(NUMBER_DOT_REGEXP, "");
    setPrice(value);
  }

  function clearPrice() {
    setPrice("");
  }

  return (
    <>
      <span className={"price-filter__dollar-sign"}>$</span>
      <div className={"price-filter__input-container mr-2"}>
        <input
          name={"minPrice"}
          className={"price-filter__input"}
          type={"text"}
          data-testid={"min-price"}
          placeholder={placeholder}
          onChange={handleChange}
          value={price}
          autoComplete={"off"}
        />
        <button
          className={"cursor-pointer"}
          onClick={clearPrice}
          data-testid={"min-price-clear"}
        >
          <img className={"min-w-[1.3rem] w-[1.3rem]"} src={close} alt={""} />
        </button>
      </div>
    </>
  );
}
