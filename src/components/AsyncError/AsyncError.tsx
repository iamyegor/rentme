import { useAsyncError } from "react-router-dom";
import accident from "../../../assets/icons/car-accident.png";
import noEntry from "../../../assets/icons/no-entry.png";
import stop from "../../../assets/icons/stop.png";
import pedestrianCrossing from "../../../assets/icons/pedestrian-crossing.png";

export default function Error() {
  const error = useAsyncError() as { data: string };

  return (
    <div className="flex items-center justify-center max-w-20">
      <div className="top-0 bottom-0 mx-auto relative" data-testid="error">
        <img className="absolute w-[110px] -top-[3.5rem] -left-[4.5rem]" src={noEntry} />
        <img
          className="absolute w-[90px] top-4 -left-20 -rotate-45 "
          src={pedestrianCrossing}
        />
        <img className="absolute w-[90px] -top-[3.5rem] left-[1rem] rotate-45" src={stop} />
        <div className="ml-4 z-10 relative">
          <div className="font-semibold text-[100px]">Error 404</div>
          <div className="line-clamp-5 text-[1.5rem] -mt-6">Not found</div>
        </div>
        <img
          className="object-contain absolute -top-8 z-0 -right-48 w-[300px] h-[300px] rotate-[30deg]"
          src={accident}
        />
      </div>
    </div>
  );
}
