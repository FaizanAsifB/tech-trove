import { fetchCategories } from "@/lib/queries";
import Link from "next/link";

const NavLinks = async () => {
  const categories = await fetchCategories();

  return (
    <ul className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-2">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/products?filter=${category.title} `}
            className="-mx-2 px-2 py-1
               shadow-[inset_0_0_0_0_hsl(var(--primary))] transition-all duration-500 hover:text-primary-foreground hover:shadow-[inset_200px_0_0_0_hsl(var(--primary))] lg:mx-0"
          >
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
