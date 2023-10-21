import { server } from "../setup.ts";
import { rest } from "msw";
import { SearchParam } from "../../types.ts";

export default function mockResponseWithParams(
  params: SearchParam[],
  resolvedValue: any,
  alternativeValue: any,
) {
  server.use(
    rest.get("http://localhost/api/cars", (req, res, ctx) => {
      const allTrue = params.every(({ key, value }) => {
        return req.url.searchParams.get(key) === value;
      });

      if (allTrue) {
        return res(ctx.json(resolvedValue));
      } else {
        return res(ctx.json(alternativeValue));
      }
    }),
  );
}
