import { Button } from "@/components/ui/button";
import { checkRole } from "@/lib/roles";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Container, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const AuthLinks = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
      <SignedIn>
        <Link
          href={"/orders"}
          className="transition-color
               -mx-2 flex items-center   gap-1  text-foreground/70 hover:text-foreground lg:mx-0"
        >
          <Container className="h-5 w-5 lg:hidden" />
          Orders
        </Link>
        {checkRole("ADMIN") ? (
          <Link
            href={"/admin"}
            className=" -mx-2 flex items-center gap-1 rounded-sm px-2 py-1 lg:mx-0 lg:bg-secondary"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        ) : null}
        <UserButton
          appearance={{
            elements: {
              userButtonPopoverCard: {
                pointerEvents: "initial",
              },
              rootBox: "mt-auto ml-auto lg:ml-0",
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default AuthLinks;
