import shrug1 from "../../assets/icons/shrug.png";
import shrug2 from "../../assets/icons/shrug(1).png";
import shrug3 from "../../assets/icons/shrug(2).png";
import { useSearchParams } from "react-router-dom";


export default function CarsNotFound() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleResetFilters() {
    const keysToDelete = [];
    for (let key of searchParams.keys()) {
      if (key !== "payFor") {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      searchParams.delete(key);
    }

    setSearchParams(searchParams);
  }

  return (
    <div
      className={"flex flex-col items-center justify-center h-full"}
      data-testid={"cars-not-found-page"}
    >
      <div className={"flex"}>
        <img className={"w-20 h-20 mr-2"} src={shrug1} alt={""} />
        <img className={"w-20 h-20 mr-2"} src={shrug2} alt={""} />
        <img className={"w-[4.8rem] h-[4.8rem]"} src={shrug3} alt={""} />
      </div>
      <div
        className={
          "font-semibold text-2xl basic-font text-center " + "max-w-[32rem]"
        }
      >
        <span className={"text-green-500 mr-1"}>Oops!</span>It looks like we
        don't have any cars that match your selected filters.
      </div>
      <div className={"mt-[0.5rem]"}></div>
      <div
        className={
          "font-semibold text-2xl basic-font text-center " + "max-w-[32rem]"
        }
      >
        Try resetting your filters to see more options.
      </div>
      <div className={"mt-[1rem]"}></div>
      <button
        className={
          "border border-green-600 bg-green-500 p-2 text-white text-xl " +
          "w-[20rem] rounded-lg hover:bg-green-600 transition active:scale-110 " +
          "shadow-lg shadow-green-400/90 hover:shadow-green-300/90"
        }
        onClick={handleResetFilters}
        data-testid={"reset-filters"}
      >
        Reset filters
      </button>
    </div>
  );
}
