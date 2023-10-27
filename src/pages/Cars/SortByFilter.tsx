import { Select } from "@radix-ui/themes";
import { useSearchParams } from "react-router-dom";
import { SortBy } from "types";
import { appendSearchParam } from "utils/appendSearchParam";
import sort from "../../../assets/icons/sort.png";

export default function SortByFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className={"filter-item flex items-center"}>
      <img className={"filter-icon mr-2"} src={sort} alt={"Categories"} />
      <label className={"mr-2"} htmlFor="category">
        Sort by
      </label>
      <Select.Root
        value={searchParams.get("sortBy") as string}
        onValueChange={(value: SortBy) => {
          appendSearchParam({ sortBy: value }, setSearchParams);
        }}
      >
        <Select.Trigger
          id="category"
          color="green"
          className="font-medium cursor-pointer text-base"
          data-testid="sort-by-dropdown"
        />
        <Select.Content color="green">
          <Select.Group>
            <Select.Item value={SortBy.Popularity}>Popularity</Select.Item>
            <Select.Item value={SortBy.Price}>Price</Select.Item>
            <Select.Item value={SortBy.Name}>Name</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
