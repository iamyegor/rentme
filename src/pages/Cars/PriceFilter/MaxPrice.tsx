import { useSearchParams } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { PayFor } from "../../../types.ts";
import { appendSearchParam } from "../../../utils/appendSearchParam.ts";
import { removeSearchParam } from "../../../utils/removeSearchParam.ts";
import close from "../../../../assets/icons/cross.png";

const NUMBER_DOT_REGEXP = /[^0-9.]/g;

type MaxPriceProps = {
  maxPrice: number | null;
};

export default function MaxPrice({ maxPrice }: MaxPriceProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [placeholder, setPlaceholder] = useState("max price");
  const [price, setPrice] = useState(searchParams.get("maxPrice") || "");
  const [debouncedPrice, setDebouncedPrice] = useState(price);

  const debouncedPriceChange = useCallback(
    debounce((maxPrice: string) => {
      setDebouncedPrice(maxPrice);
    }, 300),
    [],
  );

  useEffect(() => {
    if (maxPrice) {
      if (searchParams.get("payFor") === PayFor.Hour) {
        setPlaceholder(`to ${maxPrice * 60}`);
      } else {
        setPlaceholder(`to ${maxPrice}`);
      }
    } else {
      setPlaceholder("max price");
    }
  }, [maxPrice, searchParams.get("payFor")]);

  useEffect(() => {
    setPrice(searchParams.get("maxPrice") || "");
  }, [searchParams.get("maxPrice")]);

  useEffect(() => {
    if (debouncedPrice) {
      appendSearchParam({ maxPrice: debouncedPrice }, setSearchParams);
    } else {
      removeSearchParam("maxPrice", setSearchParams);
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
          name={"maxPrice"}
          className={"price-filter__input"}
          type={"text"}
          data-testid={"max-price"}
          placeholder={placeholder}
          onChange={handleChange}
          value={price}
          autoComplete={"off"}
        />
        <button
          className={"cursor-pointer"}
          onClick={clearPrice}
          data-testid={"max-price-clear"}
        >
          <img className={"min-w-[1.3rem] w-[1.3rem]"} src={close} alt={""} />
        </button>
      </div>
    </>
  );
}
