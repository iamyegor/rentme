import {SearchParam} from "../../types.ts";
import mockResponseWithParams from "./mockResponseWithParams.tsx";

export default function mockCarsResponseWithParams(
  params: SearchParam[],
  resolvedCars: any,
  alternativeCars: any,
) {
  mockResponseWithParams(
    params,
    { cars: resolvedCars },
    { cars: alternativeCars },
  );
}
