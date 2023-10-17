import { rest, setupWorker } from "msw";
import { cars } from "./data";

const worker = setupWorker(
  rest.get("http://localhost/api/cars", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(cars), ctx.delay(500));
    return res(ctx.status(500), ctx.json("Not found"), ctx.delay(1000));
  })
);

worker.start();
