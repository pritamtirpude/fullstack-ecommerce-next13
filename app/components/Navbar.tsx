"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Cart from "./Cart";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store";
import { AiFillShopping } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import DarkLight from "./DarkLight";

const Navbar = ({ user }: Session) => {
  const cartStore = useCartStore();

  const handleActiveClick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="font-lobster text-xl">Styled</h1>
      </Link>
      <ul className="flex items-center gap-8">
        {/* Toggle the Cart */}
        <li
          onClick={() => cartStore.toggleCart()}
          className="flex items-center text-3xl relative cursor-pointer"
        >
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex justify-center items-center"
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        <DarkLight />
        {/* If the user is not signed in */}
        {!user && (
          <li className="bg-primary text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign In</button>
          </li>
        )}
        {user && (
          <li>
            <div className="dropdown dropdown-end cursor-pointer">
              <Image
                src={user?.image as string}
                alt={user?.name as string}
                width={48}
                height={48}
                className="rounded-full"
                tabIndex={0}
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu p-4 shadow space-y-4 bg-base-100 rounded-box w-72"
              >
                <li>
                  <Link onClick={handleActiveClick} href={"/dashboard"}>
                    Your Orders
                  </Link>
                </li>
                <li>
                  <Link onClick={handleActiveClick} href={"/api/auth/signout"}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
};

export default Navbar;
