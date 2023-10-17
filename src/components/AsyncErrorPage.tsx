import Error from "components/Error";
import { useAsyncError } from "react-router-dom";
import { ErrorWithStatus } from "types";

export default function AsyncErrorPage() {
  const { status, data } = useAsyncError() as { status: number; data: string };

  return <Error error={{ status, message: data }} />;
}
