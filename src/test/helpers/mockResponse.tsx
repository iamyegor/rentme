import { rest } from "msw";
import { server } from "../setup.js";

export default function mockResponse(
  relativeUrl: string,
  fixtures: any
) {
  server.use(
    rest.get(`http://localhost${relativeUrl}`, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(fixtures));
    })
  );
}
