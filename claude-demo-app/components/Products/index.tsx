"use client";
import React from "react";
import productsData from "./productsData";
import SingleProductCard from "./SingleProductCard";
import SectionHeader from "../Common/SectionHeader";

const Products = () => {
  return (
    <>
      {/* <!-- ===== Products Start ===== --> */}
      <section id="products" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <SectionHeader
            headerInfo={{
              title: "OUR PRODUCTS",
              subtitle: "Browse Our Products",
              description: `A look at our latest products, with three shown per row.`,
            }}
          />
          {/* <!-- Section Title End --> */}

          <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-15 lg:grid-cols-3 xl:mt-20 xl:gap-12.5">
            {productsData.map((product) => (
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
