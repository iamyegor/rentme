import Error from "./Error";

export default function NotFound() {
  const error = {
    status: 404,
    message: "Not Found",
  };

  return (
    <main>
      <Error error={error} />
    </main>
  );
}
