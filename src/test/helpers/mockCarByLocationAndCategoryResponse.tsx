import { rest } from "msw";
import { server } from "../setup.ts";
import carsFixture from "../fixtures/carsFixture.ts";

export default function mockCarByLocationAndCategoryResponse() {
  server.use(
    rest.get("http://localhost/api/cars", (req, res, ctx) => {
      const cityFilter = req.url.searchParams.get("city");
      const countryFilter = req.url.searchParams.get("country");
      const categoryFilter = req.url.searchParams.get("category");

      const matchedCars = carsFixture.filter((car) => {
        return (
          car.location.city === cityFilter &&
          car.location.country === countryFilter &&
          car.category === categoryFilter
        );
      });

      return res(ctx.json(matchedCars));
    }),
  );
}
