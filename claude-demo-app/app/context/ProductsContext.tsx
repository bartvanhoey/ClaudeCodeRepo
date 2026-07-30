"use client";
import { createContext, useContext, useState } from "react";
import productsData from "@/components/Products/productsData";
import { Product } from "@/types/product";

type ProductsContextValue = {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>(productsData);

  const addProduct = (product: Omit<Product, "id">) => {
    const nextId = Math.max(0, ...products.map((p) => p.id)) + 1;
    setProducts((prev) => [...prev, { ...product, id: nextId }]);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
