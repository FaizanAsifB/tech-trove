import { fetchCategories } from "@/lib/queries";
import Link from "next/link";

const NavLinks = async () => {
  const categories = await fetchCategories({ navPos: "asc" });

  return (
    <ul className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-4">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/products?filter=${category.title} `}
            className="transition-color -mx-2
                text-foreground/70 duration-300 hover:text-foreground lg:mx-0"
          >
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
