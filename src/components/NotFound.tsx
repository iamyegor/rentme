import ErrorPage from "./ErrorPage.tsx";

export default function NotFound() {
  const error = {
    status: 404,
    data: "Not Found",
  };

  return (
    <main data-testid="not-found-page" className="flex-1">
      <ErrorPage error={error} />
    </main>
  );
}
