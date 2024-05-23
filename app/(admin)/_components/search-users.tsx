"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <form
        className="space-y-2"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
        }}
      >
        <div className="flex items-center gap-2">
          <Input
            id="search"
            name="search"
            type="text"
            placeholder="Search for Users"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
    </div>
  );
};
