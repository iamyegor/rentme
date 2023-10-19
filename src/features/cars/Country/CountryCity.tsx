import { Dialog } from "@radix-ui/themes";
import { appendSearchParams } from "../../../utils/appendSearchParams.ts";
import { useSearchParams } from "react-router-dom";

type CityProps = {
  city: string;
  country: string;
};

export default function CountryCity({ city, country }: CityProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isCitySelected = searchParams.get("city") === city;

  return (
    <Dialog.Close>
      <button
        className={`cursor-pointer text-start basic-font ${
          isCitySelected && "green-text"
        }`}
        data-testid="city-item"
        onClick={() => {
          appendSearchParams(
            [
              {
                key: "city",
                value: city,
              },
              {
                key: "country",
                value: country,
              },
            ],
            setSearchParams,
          );
        }}
      >
        {city}
      </button>
    </Dialog.Close>
  );
}
