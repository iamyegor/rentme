import { SetURLSearchParams } from "react-router-dom";
import { SearchParam } from "../types.ts";

export function appendSearchParam(
  searchParam: SearchParam,
  setSearchParams: SetURLSearchParams,
) {
  setSearchParams((prevSearchParams) => {
    const key = Object.keys(searchParam)[0];
    prevSearchParams.set(key, searchParam[key]);
    return prevSearchParams;
  });
}