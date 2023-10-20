import React from "react";

type LocationSearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function LocationSearch({
  search,
  setSearch,
}: LocationSearchProps) {
  return (
    <input
      className={
        "focus:outline-none basic-font border border-gray-200" +
        " rounded-md p-2 w-full mb-4"
      }
      type={"text"}
      placeholder={"Search for the city"}
      data-testid={"search-input"}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}