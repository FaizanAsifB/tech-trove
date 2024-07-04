import Logo from "@/components/logo";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-24 bg-primary py-8 text-primary-foreground">
      <div className="container flex items-center justify-between gap-4">
        <Link href="/" className="w-36" aria-label="Go to home page">
          <Logo />
        </Link>
        <p className="text-xs">2024 Tech Trove. All Rights Reserved</p>
        <div>
          <ul className="flex gap-4">
            <li>
              <Link
                href="https://www.facebook.com"
                target="_blank"
                aria-label="Tech trove facebook page"
              >
                <FaFacebookF />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                aria-label="Tech trove instagram page"
              >
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.twitter.com"
                target="_blank"
                aria-label="Tech trove twitter page"
              >
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
