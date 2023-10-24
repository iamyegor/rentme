import shrug1 from "../../assets/icons/shrug.png";
import shrug2 from "../../assets/icons/shrug(1).png";
import shrug3 from "../../assets/icons/shrug(2).png";

export default function CarNotFound() {
  return (
    <div className={"flex flex-col items-center justify-center h-full"}>
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
        <span className={"text-green-500 mr-1"}>Oops!</span>It looks like we don't
        have any cars that match your selected filters.
      </div>
      <div className={"mt-[0.5rem]"}></div>
      <div
        className={
          "font-semibold text-2xl basic-font text-center " + "max-w-[32rem]"
        }
      >
        Try broadening your search or resetting the filters to discover more
        options.
      </div>
    </div>
  );
}
