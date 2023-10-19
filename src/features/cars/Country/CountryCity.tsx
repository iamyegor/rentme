import { Dialog } from "@radix-ui/themes";
import { appendSearchParams } from "../../../utils/appendSearchParams.ts";
import { useSearchParams } from "react-router-dom";

type CityProps = {
  city: string;
  country: string;
  onCitySelected: () => void;
};

export default function CountryCity({
  city,
  country,
  onCitySelected,
}: CityProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isCitySelected = searchParams.get("city") === city;
  const isCountrySelected = searchParams.get("country") === country;

  return (
    <Dialog.Close>
      <button
        className={`cursor-pointer text-start basic-font ${
          isCitySelected && isCountrySelected && "green-text"
        } flex`}
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
          onCitySelected();
        }}
      >
        {city}
      </button>
    </Dialog.Close>
  );
}
