import Error from "components/Error";
import { useRouteError } from "react-router-dom";
import { ErrorWithStatus } from "types";

export default function ErrorPage() {
  const error = useRouteError() as ErrorWithStatus;
  return <Error error={error} />;
}
