import { rest, setupWorker } from "msw";
import { cars } from "./data";

const worker = setupWorker(
  rest.get("http://localhost/api/cars", (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const city = searchParams.get("city");
    const country = searchParams.get("country");

    let filteredCars = cars;
    if (city && country) {
      filteredCars = cars.filter((car) => {
        return car.location.city === city && car.location.country === country;
      });
    }

    return res(ctx.status(200), ctx.json(filteredCars), ctx.delay(500));
    // return res(ctx.status(500), ctx.json("Not found"), ctx.delay(1000));
  }),
);

worker.start();
