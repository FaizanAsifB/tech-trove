import "@/app/globals.css";
import { inter } from "@/app/ui/fonts";

import { Toaster } from "@/components/ui/sonner";
import { checkRole } from "@/lib/roles";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Header from "./_components/header";
import Nav from "./_components/nav";

export const metadata: Metadata = {
  title: "Tech Trove Dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!checkRole("ADMIN")) {
    redirect("/");
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("antialiased", inter.className)}>
          <div className="grid min-h-screen w-full antialiased md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Nav />
            <div className="flex flex-col">
              <Header />
              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
              </main>
            </div>
          </div>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
