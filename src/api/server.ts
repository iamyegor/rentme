import { rest, setupWorker } from "msw";
import { cars } from "./data";
import { Car, Location, PayFor, SortBy } from "../types.ts";

const worker = setupWorker(
  rest.get("http://localhost/api/cars", (req, res, ctx) => {
    const filteredCars = getFilteredCars(cars, req.url.searchParams);
    const response: any = {
      cars: filteredCars,
    };

    if (filteredCars.length > 0) {
      const prices = filteredCars.map((car) => car.minutePriceCents / 100);
      response.prices = {
        min: Math.min(...prices),
        max: Math.max(...prices),
      };
    }
    return res(ctx.status(200), ctx.json(response), ctx.delay(1000));
    // return res(ctx.status(500), ctx.json("An error occurred"), ctx.delay(150));
  }),

  rest.get("http://localhost/api/locations", (_req, res, ctx) => {
    let locations: Location[] = [];
    for (const car of cars) {
      locations.push(car.location);
    }

    return res(ctx.status(200), ctx.json(locations), ctx.delay(1000));
  }),

  rest.get("http://localhost/api/lowestAndHighestPrice", (req, res, ctx) => {
    const filteredCars = getFilteredCars(cars, req.url.searchParams);
    const prices = filteredCars.map((car) => car.minutePriceCents / 100);
    let low = Math.min(...prices);
    let high = Math.max(...prices);
    if (req.url.searchParams.get("payFor") === PayFor.Hour) {
      low = low * 60;
      high = high * 60;
    }

    return res(ctx.status(200), ctx.json({ low, high }), ctx.delay(1000));
  })
);

function getFilteredCars(cars: Car[], searchParams: URLSearchParams) {
  const city = searchParams.get("city");
  const country = searchParams.get("country");
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const payFor = searchParams.get("payFor") || PayFor.Minute;
  const sortBy = searchParams.get("sortBy");

  let filteredCars = cars.sort((a, b) => a.id.localeCompare(b.id));
  if (city && country) {
    filteredCars = cars.filter((car) => {
      return car.location.city === city && car.location.country === country;
    });
  }
  if (category) {
    filteredCars = filteredCars.filter((car) => {
      return car.category === category;
    });
  }
  if (minPrice) {
    filteredCars = filteredCars.filter((car) => {
      const price = getPriceBasedOnPayFor(car.minutePriceCents / 100);
      return price >= Number(minPrice);
    });
  }
  if (maxPrice) {
    filteredCars = filteredCars.filter((car) => {
      const price = getPriceBasedOnPayFor(car.minutePriceCents / 100);
      return price <= Number(maxPrice);
    });
  }
  if (sortBy === SortBy.Price) {
    filteredCars = filteredCars.sort(
      (a, b) => a.minutePriceCents - b.minutePriceCents
    );
  } else if (sortBy === SortBy.Name) {
    filteredCars = filteredCars.sort((a, b) =>
      `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`)
    );
  }

  function getPriceBasedOnPayFor(price: number) {
    return payFor === PayFor.Minute ? price : price * 60;
  }

  return filteredCars;
}

worker.start();
