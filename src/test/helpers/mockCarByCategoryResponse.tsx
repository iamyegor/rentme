import { server } from "../setup.ts";
import { rest } from "msw";
import carsFixture from "../fixtures/carsFixture.ts";

export default function mockCarByCategoryResponse() {
  server.use(
    rest.get("http://localhost/api/cars", (req, res, ctx) => {
      const category = req.url.searchParams.get("category");

      let matchedCars = carsFixture;
      if (category === "economy") {
        matchedCars = [carsFixture[0]];
      } 

      return res(ctx.json(matchedCars));
    }),
  );
}
