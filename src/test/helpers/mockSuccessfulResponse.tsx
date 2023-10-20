import { rest } from "msw";
import { server } from "test/setup";

export default function mockSuccessfulResponse(
  relativeUrl: string,
  fixtures: any
) {
  server.use(
    rest.get(`http://localhost${relativeUrl}`, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(fixtures));
    })
  );
}
