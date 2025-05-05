"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, CircularProgress, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import { IError } from "@/interface/error.interface";
const navItems = [
  { text: "Home", link: "/" },
  { text: "Contact", link: "#" },
  { text: "About", link: "#" },
];

export default function Navbar() {
  const [userRole, setUserRole] = useState("");
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const goToCart = () => {
    router.push("/cart");
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    router.replace("/login");
  };

  const { isPending, data, isError, error } = useQuery<number, IError>({
    queryKey: ["get-cart-item-count"],
    queryFn: async () => {
      const res = await axiosInstance.get("/cart/item/count");

      return res.data.totalCartItem;
    },
    enabled: userRole === "buyer",
  });

  console.log({ data });
  useEffect(() => {
    setUserRole(window.localStorage.getItem("role") as string);
  }, []);

  return (
    <nav className="w-full bg-gradient-to-r from-orange-600 to-indigo-600 shadow-lg mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              Logo
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.text}
                href={item.link}
                className="text-white hover:text-indigo-200 transition-colors duration-200 font-medium"
              >
                {item.text}
              </Link>
            ))}
            {userRole === "buyer" && (
              <IconButton sx={{ color: "#fff" }} onClick={goToCart}>
                <Badge badgeContent={data} color="warning">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            )}
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-md font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDrawer}
              className="text-white hover:text-indigo-200 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {mobileOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          mobileOpen ? "block" : "hidden"
        } bg-white shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
            >
              {item.text}
            </Link>
          ))}
          {userRole === "buyer" && (
            <IconButton sx={{ color: "#000" }} onClick={goToCart}>
              <Badge badgeContent={data} color="warning">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
