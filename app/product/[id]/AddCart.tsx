"use client";

import { AddCartType } from "@/Types/AddCartType";
import { useCartStore } from "@/store";
import { useState } from "react";

const AddCart = ({ name, id, image, unit_amount, quantity }: AddCartType) => {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ id, name, image, unit_amount, quantity });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };
  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className="my-8 btn btn-primary w-full md:w-auto lg:w-auto"
      >
        {added ? "Adding to cart..." : "Add to cart"}
      </button>
    </>
  );
};

export default AddCart;
