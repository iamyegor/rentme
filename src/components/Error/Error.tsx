import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError() as Error;
  let errorMessage: string = "Unkown error";
  if ("data" in error) {
    errorMessage = JSON.stringify(error.data);
  } else if ("message" in error) {
    errorMessage = error.message;
  }
  return <h1>Looks like an error occured: {errorMessage}</h1>;
}
