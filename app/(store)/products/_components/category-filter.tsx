"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";

type CategoryFilterProps = {
  categories: Pick<Category, "id" | "title">[];
  filteredCategories: string | string[];
};

const CategoryFilter = ({
  categories,
  filteredCategories,
}: CategoryFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // const filteredCategories = searchParams.getAll("filter") || "";

  const [optimisticFilters, setOptimisticFilters] = useOptimistic<
    string[],
    string
  >(
    typeof filteredCategories === "string"
      ? [filteredCategories]
      : filteredCategories,
    (state, newFilter) => {
      if (state?.includes(newFilter)) {
        return state.filter((category) => category !== newFilter);
      }

      return [...state, newFilter];
    },
  );

  const [isPending, startTransition] = useTransition();

  const createQueryString = (name: string, value: string) => {
    const isExisting = optimisticFilters?.includes(value);
    const params = new URLSearchParams(searchParams.toString());
    if (isExisting) {
      params.delete(name, value);
    }
    if (!isExisting) params.append(name, value);
    return params.toString();
  };

  return (
    <ul className="flex flex-wrap items-center gap-4 text-sm lg:block lg:space-y-3 ">
      {categories.map((category) => (
        <li key={category.id} className="flex items-center gap-2">
          <Checkbox
            aria-label={category.title}
            id={category.title}
            checked={optimisticFilters?.includes(category.title)}
            onCheckedChange={() => {
              router.push(
                `${pathname}?${createQueryString("filter", category.title)}`,
              );
              startTransition(() => setOptimisticFilters(category.title));
            }}
          />
          <Label htmlFor={category.title}>{category.title}</Label>
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
