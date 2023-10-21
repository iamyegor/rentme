import { rest } from "msw";
import { server } from "../setup.ts";

export default function mockFailedResponse(
  relativeUrl: string,
  status: number
) {
  server.use(
    rest.get(`http://localhost${relativeUrl}`, (_, res, ctx) => {
      return res(ctx.status(status));
    })
  );
}
