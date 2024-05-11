import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Footer from "./_components/footer";
import Header from "./_components/header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title:
    "Tech Trove - Shop the Latest Electronics. Explore Smartphones, Laptops & More",
  description:
    "Welcome to Tech Trove, your premier destination for cutting-edge electronics. Explore a wide range of smartphones, laptops, cameras, and more. Elevate your digital lifestyle with our curated selection of top-quality products. Shop now for the latest innovations and enjoy a seamless online shopping experience with fast shipping and dedicated customer support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head></head>
        <body
          className={cn(
            "flex min-h-screen flex-col bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <Toaster richColors />

          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
