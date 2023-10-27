import { server } from "../setup.js";
import { rest } from "msw";
import { SearchParam } from "../../types.js";

export default function mockConditionalResponse(
  params: SearchParam[],
  resolvedValue: any,
  alternativeValue: any = {}
) {
  server.use(
    rest.get("http://localhost/api/cars", (req, res, ctx) => {
      const allTrue = params.every((param) => {
        const key = Object.keys(param)[0];
        return req.url.searchParams.get(key) === param[key];
      });

      if (allTrue) {
        return res(ctx.json({ cars: resolvedValue }));
      } else {
        return res(ctx.json({ cars: alternativeValue }));
      }
    })
  );
}
