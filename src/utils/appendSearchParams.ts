import { SetURLSearchParams } from "react-router-dom";
import { SearchParam } from "../types.ts";

export function appendSearchParams(
  searchParams: SearchParam[],
  setSearchParams: SetURLSearchParams,
) {
  setSearchParams((prevSearchParams) => {
    for (const param of searchParams) {
      console.log(searchParams, prevSearchParams.toString());
      const key = Object.keys(param)[0];
      prevSearchParams.set(key, param[key]);
    }
    return prevSearchParams;
  });
}
