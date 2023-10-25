import { ReactNode } from "react";
import CarsGrid from "../CarsGrid.tsx";
import PayForFilter from "../PayForFilter.tsx";
import LocationFilter from "../LocationFilter/LocationFilter.tsx";
import CategoryFilter from "../CategoryFilter/CategoryFilter.tsx";
import PriceFilter from "../PriceFilter/PriceFilter.tsx";
import { useGetCarsByParamsQuery } from "../../../features/api/apiSlice.ts";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "../../../components/ErrorPage.tsx";
import Spinner from "../../../components/Spinner.tsx";
import CarsNotFound from "../../../components/CarsNotFound.tsx";

export default function CarsPage() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const { data, error, isFetching } = useGetCarsByParamsQuery(
    searchParams.toString(),
  );

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
        <CategoryFilter />
        <LocationFilter />
        <PayForFilter />
        <PriceFilter prices={data?.prices} />
      </div>
      {content}
    </main>
  );
}
