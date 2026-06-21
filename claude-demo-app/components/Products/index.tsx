"use client";
import React from "react";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { useProducts } from "@/app/context/ProductsContext";
import SingleProductCard from "./SingleProductCard";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-plex-mono",
});

const Products = () => {
  const { products } = useProducts();

  return (
    <>
      {/* <!-- ===== Products Start ===== --> */}
      <section
        id="products"
        className={`${plexMono.variable} py-20 lg:py-25 xl:py-30`}
      >
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary dark:text-meta">
                  The Catalog
                </span>
                <h2 className="mb-4 mt-3 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                  Shop the collection
                </h2>
                <p className="max-w-md">
                  {products.length} objects, each one named for what
                  it&apos;s made of.
                </p>
              </div>
              <Link
                href="/products/add"
                className="text-black hover:text-primary dark:text-white dark:hover:text-primary"
              >
                Add Product
              </Link>
            </div>
            <div className="mt-8 h-px w-full bg-stroke dark:bg-strokedark" />
          </motion.div>
          {/* <!-- Section Title End --> */}

          <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-15 lg:grid-cols-3 xl:mt-20 xl:gap-12.5">
            {products.map((product) => (
              <SingleProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Products End ===== --> */}
    </>
  );
};

export default Products;
