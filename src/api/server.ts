import { rest, setupWorker } from "msw";
import { cars } from "./data";
import { Location } from "../types.ts";

const worker = setupWorker(
  rest.get("http://localhost/api/cars", (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const city = searchParams.get("city");
    const country = searchParams.get("country");
    const category = searchParams.get("category");

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

    return res(ctx.status(200), ctx.json(filteredCars), ctx.delay(150));
    // return res(ctx.status(500), ctx.json("Not found"), ctx.delay(150));
  }),

  rest.get("http://localhost/api/locations", (_req, res, ctx) => {
    let locations: Location[] = [];
    for (const car of cars) {
      locations.push(car.location);
    }

    return res(ctx.status(200), ctx.json(locations), ctx.delay(150));
  }),
);

worker.start();
