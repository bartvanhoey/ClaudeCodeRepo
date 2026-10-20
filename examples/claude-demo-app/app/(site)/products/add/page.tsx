import React from "react";
import AddProduct from "@/components/Products/AddProduct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product - Solid SaaS Boilerplate",

  // other metadata
  description: "Add a new product to the catalog",
};

const AddProductPage = () => {
  return (
    <div className="pb-20 pt-40">
      <AddProduct />
    </div>
  );
};

export default AddProductPage;
