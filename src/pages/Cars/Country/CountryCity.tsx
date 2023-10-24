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
        className={`cursor-pointer text-start basic-font hover:opacity-70 
          transition  ${
            isCitySelected && isCountrySelected && "green-text"
          } flex`}
        data-testid="city-item"
        onClick={() => {
          appendSearchParams(
            [{ city: city }, { country: country }],
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
