import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="container flex-1 ">
      <div className="relative h-[704px] bg-stone-200 rounded-md grid grid-cols-2 items-center justify-items-end">
        <Image
          src="/images/hero-1.png"
          fill
          alt="hero"
          className="object-cover"
        />
        <div className="ml-16 z-10">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-wide lg:text-6xl">
            Discover the latest tech innovations.
          </h1>
          <p className="mt-2">Shop now and upgrade your digital experience</p>
          <Button className="mt-6">Shop now</Button>
        </div>
      </div>
    </section>
  )
}
export default Hero
