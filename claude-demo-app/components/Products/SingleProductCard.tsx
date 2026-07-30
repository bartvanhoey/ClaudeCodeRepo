import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

const SingleProductCard = ({ product }: { product: Product }) => {
  const { name, price, material, note, swatch } = product;

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
      className="group z-40 rounded-md border border-white bg-white shadow-solid-3 transition-shadow hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection"
    >
      <div className={`swatch-${swatch} relative h-40 rounded-t-md`}>
        <div className="absolute -bottom-3 right-4 flex -rotate-6 items-center gap-1.5 rounded-sm bg-alabaster px-2.5 py-1.5 shadow-solid-2 transition-transform duration-300 group-hover:rotate-0 dark:bg-blackho">
          <span className="h-1.5 w-1.5 rounded-full bg-white ring-1 ring-inset ring-black/15 dark:bg-blacksection dark:ring-white/15" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-wide text-waterloo dark:text-manatee">
            {material}
          </span>
          <span className="font-mono text-[11px] font-semibold text-black dark:text-white">
            {price}
          </span>
        </div>
      </div>

      <div className="p-7.5 pt-6">
        <h3 className="text-lg font-semibold text-black dark:text-white">
          {name}
        </h3>
        <p className="mt-2 text-sm text-waterloo dark:text-manatee">{note}</p>
      </div>
    </motion.div>
  );
};

export default SingleProductCard;
