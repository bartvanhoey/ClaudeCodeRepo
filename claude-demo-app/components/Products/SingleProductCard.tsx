import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

const SingleProductCard = ({ product }: { product: Product }) => {
  const { name, price } = product;

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: -10,
        },

        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="animate_top z-40 rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark"
    >
      <div className="mb-5 flex h-40 items-center justify-center rounded-[4px] bg-alabaster dark:bg-blackho">
        <span className="text-sm text-waterloo dark:text-manatee">
          Image placeholder
        </span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
        {name}
      </h3>
      <p className="text-black dark:text-white">{price}</p>
    </motion.div>
  );
};

export default SingleProductCard;
