import Logo from "@/components/logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-24 bg-primary py-8 text-primary-foreground">
      <div className="container flex justify-between">
        <Link href="/" target="_blank" className="w-36 ">
          <Logo />
        </Link>
        <div>2024 Tech Trove. All Rights are Reserved</div>
        <div>
          <ul className="flex gap-4">
            <li>
              <Link href="#" target="_blank"></Link>
            </li>
            <li>
              <Link href="#" target="_blank"></Link>
            </li>
            <li>
              <Link href="#" target="_blank">
                x
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
