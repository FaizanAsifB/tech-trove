import { Button } from "@/components/ui/button";
import { checkRole } from "@/lib/roles";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

const AuthButtons = () => {
  return (
    <>
      <SignedIn>
        <Link
          href={"/orders"}
          className="px-2
               shadow-[inset_0_0_0_0_hsl(var(--secondary))] transition-all duration-500 hover:text-primary-foreground hover:shadow-[inset_200px_0_0_0_hsl(var(--primary))] "
        >
          Orders
        </Link>
        {checkRole("admin") ? (
          <Link
            href={"/admin"}
            className=" flex items-center gap-1 rounded-sm bg-secondary px-2"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        ) : null}
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default AuthButtons;
