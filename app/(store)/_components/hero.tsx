import { Button } from "@/components/ui/button";
import heroImage from "@/public/images/hero-1.png";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="container">
      <div className="relative flex aspect-[1499/704] max-h-[884px] max-w-[1560px] items-center rounded-md bg-secondary">
        <Image
          src={heroImage}
          fill
          quality={100}
          placeholder="blur"
          alt="image of two Iphones and two laptops "
          className="object-cover object-center lg:object-contain"
          priority
        />
        <div className="z-10 w-3/5 py-8 pl-4 md:pl-8 xl:pl-16">
          <h1 className=" text-xl md:text-4xl lg:text-5xl xl:text-6xl">
            Discover the latest
            <br />
            tech innovations.
          </h1>
          <p className="mt-2  text-sm md:text-base lg:text-lg xl:text-xl">
            Shop now and upgrade your digital experience
          </p>
          <Button className="mt-6" asChild>
            <Link href="/products">SHOP NOW</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
