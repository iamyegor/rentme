import { server } from "../setup.ts";
import { rest } from "msw";
import carsFixture from "../fixtures/carsFixture.ts";
import { Car } from "../../types.ts";

export default function mockCarByCategoryResponse(
  category: string,
  response: Car[],
) {
  server.use(
    rest.get("http://localhost/api/cars", (req, res, ctx) => {
      const categoryFilter = req.url.searchParams.get("category");

      let matchedCars = carsFixture;
      if (categoryFilter === category) {
        matchedCars = response;
      }

      return res(ctx.json(matchedCars));
    }),
  );
}
