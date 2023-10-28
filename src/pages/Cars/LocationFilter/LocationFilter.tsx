import { Button, Dialog } from "@radix-ui/themes";
import pin from "../../../../assets/icons/pin.png";
import { useGetLocationsQuery } from "../../../features/api/apiSlice.ts";
import { ReactNode, useState } from "react";
import Country from "../Country/Country.tsx";
import { nanoid } from "@reduxjs/toolkit";
import { useSearchParams } from "react-router-dom";
import LocationSearch from "../LocationSearch.tsx";

type GroupedLocations = Record<string, string[]>;

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
    const desiredLocations = getLocationsWithMatchedCity(groupByCountry());
    const countries = Object.keys(desiredLocations) as string[];

    const locationsElements = countries.map((country) => {
      const citiesElements = desiredLocations[country].map((city) => (
        <Country.City
          key={nanoid()}
          city={city}
          country={country}
          onCitySelected={() => setSearch("")}
        />
      ));

      return (
        <Country key={nanoid()} country={country}>
          {citiesElements}
        </Country>
      );
    });

    content = (
      <>
        <LocationSearch search={search} setSearch={setSearch} />
        {locationsElements}
      </>
    );
  }

  function groupByCountry() {
    return locations.reduce((result, { country, city }) => {
      (result[country] = result[country] || []).push(city);
      return result;
    }, {} as GroupedLocations);
  }

  function getLocationsWithMatchedCity(groupedLocations: GroupedLocations) {
    const countries = Object.keys(groupedLocations) as string[];
    return countries.reduce((result, country) => {
      const cities = groupedLocations[country];
      const matchedCities = cities.filter((city) => {
        return city.toLowerCase().includes(search.toLowerCase());
      });

      if (matchedCities.length > 0) {
        result[country] = matchedCities;
      }

      return result;
    }, {} as GroupedLocations);
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
            : "Location"}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>{content}</Dialog.Content>
    </Dialog.Root>
  );
}
