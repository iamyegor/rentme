import { Button, Dialog, Flex } from "@radix-ui/themes";
import { appendSearchParams } from "utils/appendSearchParams.ts";
import { useSearchParams } from "react-router-dom";
import pin from "../../../assets/icons/pin.png";

export default function LocationFilter() {
  const [_, setSearchParams] = useSearchParams();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          data-testid="select-location-button"
          color={"gray"}
          className="filter-item text-black cursor-pointer border-2 border-gray-200"
        >
          <img className="filter-icon" src={pin} alt={""} />
          Choose location
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Choose location</Dialog.Title>

        <Flex direction="column" gap="3">
          <button
            onClick={() => {
              appendSearchParams(
                [
                  {
                    key: "city",
                    value: "Moscow",
                  },
                  {
                    key: "country",
                    value: "Russia",
                  },
                ],
                setSearchParams,
              );
            }}
            className="cursor-pointer"
          >
            Moscow
          </button>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
