import { rest, setupWorker } from "msw";
import { cars } from "./data";
import { Car, Location, PayFor } from "../types.ts";

const worker = setupWorker(
  rest.get("http://localhost/api/cars", (req, res, ctx) => {
    const filteredCars = filterCars(cars, req.url.searchParams);
    return res(ctx.status(200), ctx.json(filteredCars), ctx.delay(150));
    // return res(ctx.status(500), ctx.json("An error occurred"), ctx.delay(150));
  }),

  rest.get("http://localhost/api/locations", (_req, res, ctx) => {
    let locations: Location[] = [];
    for (const car of cars) {
      locations.push(car.location);
    }

    return res(ctx.status(200), ctx.json(locations), ctx.delay(150));
  }),

  rest.get("http://localhost/api/lowestAndHighestPrice", (req, res, ctx) => {
    const filteredCars = filterCars(cars, req.url.searchParams);
    const prices = filteredCars.map((car) => car.minutePriceCents / 100);
    let low = Math.min(...prices);
    let high = Math.max(...prices);
    if (req.url.searchParams.get("payFor") === PayFor.Hour) {
      low = low * 60;
      high = high * 60;
    }

    return res(ctx.status(200), ctx.json({ low, high }), ctx.delay(150));
  }),
);

function filterCars(cars: Car[], searchParams: URLSearchParams) {
  const city = searchParams.get("city");
  const country = searchParams.get("country");
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const payFor = searchParams.get("payFor") || PayFor.Minute;

  let filteredCars = cars;
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

  function getPriceBasedOnPayFor(price: number) {
    return payFor === PayFor.Minute ? price : price * 60;
  }

  return filteredCars;
}

worker.start();
