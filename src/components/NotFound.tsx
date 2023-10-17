import Error from "./Error";

export default function NotFound() {
  const error = {
    status: 404,
    message: "Not Found",
  };

  return (
    <main data-testid="not-found-page" className="flex-1">
      <Error error={error} />
    </main>
  );
}
