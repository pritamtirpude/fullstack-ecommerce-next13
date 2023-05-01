"use client";

import { useCartStore } from "@/store";
import Image from "next/image";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import basketIcon from "@/public/basket.png";
import formatPrice from "@/util/priceFormat";
import { motion, AnimatePresence } from "framer-motion";
import Checkout from "./Checkout";
import OrderConfirmed from "./OrderConfirmed";

const Cart = () => {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
      onClick={() => cartStore.toggleCart()}
    >
      <motion.div
        layout
        className="bg-base-200 absolute right-0 top-0 w-full  lg:w-[40%] h-screen p-8 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {cartStore.onCheckout === "cart" && (
          <button onClick={() => cartStore.toggleCart()}>Back to Store</button>
        )}

        {cartStore.onCheckout === "checkout" && (
          <button onClick={() => cartStore.setCheckout("cart")}>
            Check your cart 🛒
          </button>
        )}

        {cartStore.onCheckout === "cart" && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div
                key={item.id}
                className="flex p-4 my-2 gap-4 bg-base-100 rounded-md"
              >
                <Image
                  className="rounded-md h-24"
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                />
                <div>
                  <h2>{item.name}</h2>
                  <div>
                    <h2>Quantity: {item.quantity}</h2>
                    <button
                      type="button"
                      onClick={() =>
                        cartStore.removeProduct({
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoRemoveCircle />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        cartStore.addProduct({
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoAddCircle />
                    </button>
                  </div>
                  <p className="text-sm">
                    {item.unit_amount !== null
                      ? formatPrice(item.unit_amount)
                      : "N/A"}
                  </p>
                </div>
              </motion.div>
            ))}
          </>
        )}

        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
          <p>Total: {totalPrice !== null ? formatPrice(totalPrice) : "N/A"}</p>
        ) : null}

        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
          <motion.div layout>
            {cartStore.cart.length > 0 && (
              <button
                onClick={() => cartStore.setCheckout("checkout")}
                type="button"
                className="py-2 mt-4 btn btn-primary w-full rounded-md text-white"
              >
                Checkout
              </button>
            )}
          </motion.div>
        ) : null}

        {cartStore.onCheckout === "checkout" && <Checkout />}
        {cartStore.onCheckout === "success" && <OrderConfirmed />}

        <AnimatePresence>
          {cartStore.cart.length === 0 && cartStore.onCheckout === "cart" && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className="flex items-center flex-col justify-center text-2xl font-medium pt-48 opacity-75"
            >
              <h1>Uhhh ohhh...it's empty 😭</h1>
              <Image
                src={basketIcon}
                alt="empty cart"
                width={200}
                height={200}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
