import { Select } from "@radix-ui/themes";
import { PayFor } from "../../../types.ts";
import { useSearchParams } from "react-router-dom";
import clock from "../../../../assets/icons/clock.png";

export default function PayForFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center filter-item">
      <img className="filter-icon mr-2" src={clock} alt={""} />
      <div className="mr-2">Pay for</div>
      <Select.Root
        value={searchParams.get("payFor") || PayFor.Minute}
        onValueChange={(value: PayFor) => {
          localStorage.setItem("payFor", value);
          searchParams.set("payFor", value);
          setSearchParams(searchParams);
        }}
      >
        <Select.Trigger
          color="green"
          className="font-medium cursor-pointer text-base"
          data-testid="pay-for-dropdown"
        />
        <Select.Content color="green">
          <Select.Group>
            <Select.Item value={PayFor.Hour}>Hour</Select.Item>
            <Select.Item value={PayFor.Minute}>Minute</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
