import Logo from "@/components/logo";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
              <Link href="https://www.facebook.com" target="_blank">
                <FaFacebookF />
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com" target="_blank">
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link href="https://www.twitter.com" target="_blank">
                <FaXTwitter />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
