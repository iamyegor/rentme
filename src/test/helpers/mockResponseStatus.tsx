import { rest } from "msw";
import { server } from "../setup.js";

export default function mockResponseStatus(
  relativeUrl: string,
  status: number
) {
  server.use(
    rest.get(`http://localhost${relativeUrl}`, (_, res, ctx) => {
      return res(ctx.status(status));
    })
  );
}
