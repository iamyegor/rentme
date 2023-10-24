import accident from "../../assets/icons/car-accident.png";
import noEntry from "../../assets/icons/no-entry.png";
import pedestrianCrossing from "../../assets/icons/pedestrian-crossing.png";
import stop from "../../assets/icons/stop.png";

type ErrorProps = {
  error: {
    status: number | string;
    data: string;
  };
};

export default function ErrorPage({ error }: ErrorProps) {
  return (
    <div
      data-testid={"error"}
      className="flex items-center justify-center max-w-20 h-full"
    >
      <div className="top-0 bottom-0 mx-auto relative">
        <img
          className="absolute w-[110px] -top-[3.5rem] -left-[4.5rem]"
          src={noEntry}
          alt={""}
        />
        <img
          className="absolute w-[90px] top-4 -left-20 -rotate-45 "
          src={pedestrianCrossing}
          alt={""}
        />
        <img
          className="absolute w-[90px] -top-[3.5rem] left-[1rem] rotate-45"
          src={stop}
          alt={""}
        />
        <div className="ml-4 z-10 relative">
          <div className="font-semibold text-[100px]">
            Error
            <span className="text-green-600"> {error.status}</span>
          </div>
          <div className="line-clamp-5 text-[1.5rem] -mt-6">{error.data}</div>
        </div>
        <img
          className="object-contain absolute -top-8 z-0 -right-48 w-[300px] h-[300px] rotate-[30deg]"
          src={accident}
          alt={""}
        />
      </div>
    </div>
  );
}
