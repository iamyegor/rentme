import { SetURLSearchParams } from "react-router-dom";
import { SearchParam } from "../types.ts";

export function appendSearchParams(
  searchParams: SearchParam[],
  setSearchParams: SetURLSearchParams,
) {
  setSearchParams((prevSearchParams) => {
    for (const { key, value } of searchParams) {
      prevSearchParams.set(key, value);
    }
    return prevSearchParams;
  });
}
