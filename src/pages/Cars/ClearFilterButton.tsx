import { useSearchParams } from "react-router-dom";
import reset from "../../../assets/icons/refresh-arrow.png";

export default function ClearFilterButton() {
  const [_searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    setSearchParams((prevSearchParams) => {
      if (prevSearchParams.get("payFor")) {
        return new URLSearchParams({
          payFor: prevSearchParams.get("payFor") as string,
        });
      }
      return new URLSearchParams();
    });
  }

  return (
    <button
      className={"filter-item flex items-center justify-center"}
      data-testid={"clear-filters"}
      onClick={() => handleClick()}
    >
      <img src={reset} alt={""} className="w-6 h-6" />
    </button>
  );
}
