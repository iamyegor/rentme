import { ReactNode, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SortBy } from "types.ts";
import { appendSearchParam } from "utils/appendSearchParam.ts";
import CarsNotFound from "../../../components/CarsNotFound.tsx";
import ErrorPage from "../../../components/ErrorPage.tsx";
import Spinner from "../../../components/Spinner.tsx";
import { useGetCarsByParamsQuery } from "../../../features/api/apiSlice.ts";
import CarsGrid from "../CarsGrid.tsx";
import CategoryFilter from "../CategoryFilter/CategoryFilter.tsx";
import LocationFilter from "../LocationFilter/LocationFilter.tsx";
import PayForFilter from "../PayForFilter/PayForFilter.tsx";
import PriceFilter from "../PriceFilter/PriceFilter.tsx";
import SortByFilter from "../SortByFilter.tsx";
import ClearFilterButton from "../ClearFilterButton.tsx";

export default function CarsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, error, isFetching } = useGetCarsByParamsQuery({
    searchParams: searchParams.toString(),
  });

  useEffect(() => {
    if (!searchParams.get("sortBy")) {
      appendSearchParam({ sortBy: SortBy.Popularity }, setSearchParams);
    }
  }, [searchParams.get("sortBy")]);

  let content: ReactNode;
  if (error) {
    if ("data" in error) {
      content = (
        <ErrorPage
          error={{ status: error.status, data: error.data as string }}
        />
      );
    }
  } else if (isFetching) {
    content = <Spinner />;
  } else if (data?.cars.length === 0) {
    content = <CarsNotFound />;
  } else if (data?.cars) {
    content = <CarsGrid cars={data.cars} />;
  }

  return (
    <main className="flex flex-col items-center" data-testid="cars-page">
      <div className="my-4 flex justify-center items-center space-x-4 w-full">
        <ClearFilterButton />
        <SortByFilter />
        <CategoryFilter />
        <LocationFilter />
        <PayForFilter />
        <PriceFilter prices={data?.prices} />
      </div>
      {content}
    </main>
  );
}
