import React, { ReactElement } from "react";
import { Flex } from "@radix-ui/themes";
import CountryCity from "./CountryCity.tsx";

type CountryProps = {
  children:
    | ReactElement<typeof CountryCity>
    | ReactElement<typeof CountryCity>[];
  country: string;
};

type CountryComponent = React.FC<CountryProps> & {
  City: typeof CountryCity;
};

const Country: CountryComponent = ({ children, country }: CountryProps) => {
  return (
    <Flex direction="column" gap="3">
      <div className="flex flex-col">
        <div className="font-semibold basic-font" data-testid="country-item">
          {country}
        </div>
        {children}
      </div>
    </Flex>
  );
};

Country.City = CountryCity;
export default Country;
