import { Select } from "@radix-ui/themes";
import { useAppDispatch } from "app/hooks";
import { PayFor } from "types";
import { changePayFor } from "./carsSlice";

export default function PayForFilter() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center bg-gray-100 p-2 shadow rounded-md">
      <div className="mr-3">Pay for</div>
      <Select.Root
        onValueChange={(value: PayFor) => dispatch(changePayFor(value))}
      >
        <Select.Trigger
          color="green"
          variant="ghost"
          className="font-semibold"
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
