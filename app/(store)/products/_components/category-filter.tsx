"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useOptimistic } from "react";

type CategoryFilterProps = {
  categories: Pick<Category, "id" | "title">[];
};

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filteredCategories = searchParams.getAll("filter") || "";

  const [optimisticFilters, addOptimisticFilters] = useOptimistic<
    string[],
    string
  >(filteredCategories, (state, newFilter) => {
    if (filteredCategories?.includes(newFilter))
      return state.filter((category) => category !== newFilter);

    return [...state, newFilter];
  });

  const createQueryString = (name: string, value: string) => {
    const isExisting = filteredCategories?.includes(value);
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
              addOptimisticFilters(category.title);
              router.push(
                `${pathname}?${createQueryString("filter", category.title)}`,
              );
            }}
          />
          <Label htmlFor={category.title}>{category.title}</Label>
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
