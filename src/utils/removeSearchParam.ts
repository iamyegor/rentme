import { SetURLSearchParams } from "react-router-dom";

export function removeSearchParam(
  key: string,
  setSearchParams: SetURLSearchParams,
) {
  setSearchParams((prevSearchParams) => {
    prevSearchParams.delete(key);
    return prevSearchParams;
  });
}
