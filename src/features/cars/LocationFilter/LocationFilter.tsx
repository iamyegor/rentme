import { Button, Dialog } from "@radix-ui/themes";
import pin from "../../../../assets/icons/pin.png";
import { useGetLocationsQuery } from "features/api/apiSlice.ts";
import { ReactNode, useState } from "react";
import { Location } from "types";
import Country from "features/cars/Country/Country.tsx";
import { nanoid } from "@reduxjs/toolkit";
import { useSearchParams } from "react-router-dom";
import LocationSearch from "../LocationSearch.tsx";

type GroupedLocation = {
  country: string;
  cities: string[];
};

export default function LocationFilter() {
  const [search, setSearch] = useState("");
  const [searchParams, _setSearchParams] = useSearchParams();
  const { data: locations = [], isFetching, error } = useGetLocationsQuery();

  const displayedCity = searchParams.get("city") || null;
  const displayedCountry = searchParams.get("country") || null;

  let content: ReactNode;
  if (isFetching) {
    content = <div data-testid="spinner">Loading...</div>;
  } else if (error) {
    if ("data" in error) {
      content = <div data-testid="error">{JSON.stringify(error.data)}</div>;
    }
  } else {
    const groupedLocations = groupByCountry(locations);
    let matchedLocations = getLocationsWithMatchedCity(groupedLocations);

    for (const location of matchedLocations) {
      location.cities = getMatchedCities(location);
    }

    const countriesWithCitiesElements = matchedLocations.map((location) => {
      const citiesElements = location.cities.map((city) => (
        <Country.City
          data-testid={""}
          key={nanoid()}
          city={city}
          country={location.country}
        />
      ));

      return (
        <Country key={nanoid()} country={location.country}>
          {citiesElements}
        </Country>
      );
    });

    content = (
      <>
        <LocationSearch search={search} setSearch={setSearch} />
        {countriesWithCitiesElements}
      </>
    );
  }

  function groupByCountry(locations: Location[]) {
    const countries = locations.map((location) => location.country);
    const uniqueCountries = Array.from(new Set(countries));
    const countriesWithCities: GroupedLocation[] = uniqueCountries.map(
      (country) => {
        const cities = locations
          .filter((location) => location.country === country)
          .map((location) => location.city);
        return { country, cities };
      },
    );
    return countriesWithCities;
  }

  function getLocationsWithMatchedCity(groupedLocations: GroupedLocation[]) {
    return groupedLocations.filter((location) => {
      return search
        ? location.cities.some((city) =>
            city.toLowerCase().includes(search.toLowerCase()),
          )
        : true;
    });
  }

  function getMatchedCities(location: GroupedLocation) {
    return location.cities.filter((city) => {
      return city.toLowerCase().includes(search.toLowerCase());
    });
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
          {displayedCity && displayedCountry
            ? `${displayedCity}, ${displayedCountry}`
            : "Choose location"}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>{content}</Dialog.Content>
    </Dialog.Root>
  );
}
