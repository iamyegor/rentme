import { rest } from "msw";
import { server } from "test/setup";

export default function mockFailedResponse(
  relativeUrl: string,
  status: number
) {
  return server.use(
    rest.get(`http://localhost${relativeUrl}`, (_, res, ctx) => {
      return res(ctx.status(status), ctx.delay(150));
    })
  );
}
