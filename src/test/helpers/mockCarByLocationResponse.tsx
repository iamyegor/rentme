import { server } from "../setup.ts";
import { rest } from "msw";
import carsFixture from "../fixtures/carsFixture.ts";

export default function mockCarByLocationResponse() {
  server.use(
    rest.get("http://localhost/api/cars", (req, res, ctx) => {
      const city = req.url.searchParams.get("city");
      const country = req.url.searchParams.get("country");

      let matchedCars;
      if (city === "Moscow" && country === "Russia") {
        matchedCars = [carsFixture[0]];
      } else {
        matchedCars = carsFixture;
      }

      return res(ctx.json(matchedCars));
    }),
  );
}
