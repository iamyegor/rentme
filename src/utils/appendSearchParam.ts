import { SetURLSearchParams } from "react-router-dom";
import { SearchParam } from "../types.ts";

export function appendSearchParam(
  searchParam: SearchParam,
  setSearchParams: SetURLSearchParams,
) {
  setSearchParams((prevSearchParams) => {
    prevSearchParams.set(searchParam.key, searchParam.value);
    return prevSearchParams;
  });
}
