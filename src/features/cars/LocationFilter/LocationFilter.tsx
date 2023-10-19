import { Button, Dialog } from "@radix-ui/themes";
import pin from "../../../../assets/icons/pin.png";
import { useGetLocationsQuery } from "features/api/apiSlice.ts";
import { ReactNode } from "react";
import { Location } from "types";
import Country from "features/cars/Country/Country.tsx";
import { nanoid } from "@reduxjs/toolkit";

export default function LocationFilter() {
  const { data: locations = [], isFetching, error } = useGetLocationsQuery();

  let content: ReactNode;
  if (isFetching) {
    content = <div data-testid="spinner">Loading...</div>;
  } else if (error) {
    if ("data" in error) {
      content = <div data-testid="error">{JSON.stringify(error.data)}</div>;
    }
  } else {
    const groupedLocations = groupByCountry(locations);
    content = groupedLocations.map((groupedLocation) => {
      const citiesElements = groupedLocation.cities.map((city) => (
        <Country.City
          key={nanoid()}
          city={city}
          country={groupedLocation.country}
        />
      ));

      return (
        <Country key={nanoid()} country={groupedLocation.country}>
          {citiesElements}
        </Country>
      );
    });
  }

  function groupByCountry(locations: Location[]) {
    const countries = locations.map((location) => location.country);
    const uniqueCountries = Array.from(new Set(countries));
    const countriesWithCities = uniqueCountries.map((country) => {
      const cities = locations
        .filter((location) => location.country === country)
        .map((location) => location.city);
      return { country, cities };
    });
    return countriesWithCities;
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          data-testid="select-location-button"
          color={"gray"}
          className="filter-item text-black cursor-pointer border-2 border-gray-200"
        >
          <img className="filter-icon" src={pin} alt={""} />
          Choose location
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title className="basic-font">Choose location</Dialog.Title>
        {content}
      </Dialog.Content>
    </Dialog.Root>
  );
}
