import React from "react";
import Products from "@/components/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products Page - Solid SaaS Boilerplate",

  // other metadata
  description: "This is Products page for Solid Pro"
};

const ProductsPage = () => {
  return (
    <div className="pb-20 pt-40">
      <Products />
    </div>
  );
};

export default ProductsPage;
