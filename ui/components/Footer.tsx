import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button, Input } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 mt-12  ">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Your Logo</h2>
            <p className="text-sm">
              Providing quality products and excellent customer service since
              2021.
            </p>
            <div className="flex space-x-4">
              <Button variant="text">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="text">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="text">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-white transition-colors"
                >
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Payment Methods
            </h3>
            <ul className="space-y-2">
              <li>PayPal</li>
              <li>Khalti</li>
              <li>Esewa</li>
              <li>Bank Transfer</li>
              <li>Cash on Delivery</li>
            </ul>
          </div>
        </div>
        <Divider className="my-8 bg-gray-700" />
        <div className="flex flex-col md:flex-row justify-center items-center">
          <p className="text-sm">
            &copy; 2023 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
