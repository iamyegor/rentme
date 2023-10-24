import { Category } from "../../../types.ts";
import { removeSearchParam } from "../../../utils/removeSearchParam.ts";
import { appendSearchParam } from "../../../utils/appendSearchParam.ts";
import { Select } from "@radix-ui/themes";
import { useSearchParams } from "react-router-dom";
import categories from "../../../../assets/icons/categories.png";

export default function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className={"filter-item flex items-center"}>
      <img className={"filter-icon mr-2"} src={categories} alt={""} />
      <label className={"mr-2"} htmlFor="category">
        Category
      </label>
      <Select.Root
        value={searchParams.get("category") || "all"}
        onValueChange={(value: Category) => {
          value.toString() === "all"
            ? removeSearchParam("category", setSearchParams)
            : appendSearchParam({ category: value }, setSearchParams);
        }}
      >
        <Select.Trigger
          id="category"
          color="green"
          className="font-medium cursor-pointer text-base"
          data-testid="category-dropdown"
        />
        <Select.Content color="green">
          <Select.Group>
            <Select.Item value={"all"}>All</Select.Item>
            <Select.Item value={Category.Economy}>Economy</Select.Item>
            <Select.Item value={Category.Comfort}>Comfort</Select.Item>
            <Select.Item value={Category.Premium}>Premium</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
