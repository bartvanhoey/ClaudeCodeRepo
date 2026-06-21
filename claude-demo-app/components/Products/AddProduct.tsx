"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useProducts } from "@/app/context/ProductsContext";
import { ProductSwatch } from "@/types/product";

const swatches: ProductSwatch[] = [
  "wood",
  "linen",
  "ceramic",
  "rattan",
  "marble",
  "brass",
  "cotton",
  "glass",
];

const inputClasses =
  "w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white";

const AddProduct = () => {
  const { addProduct } = useProducts();
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    price: "",
    material: "",
    note: "",
    swatch: swatches[0],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addProduct(data);
    toast.success("Product added");
    router.push("/products");
  };

  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1016 px-4 md:px-8 xl:px-0">
        <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary dark:text-meta">
          The Catalog
        </span>
        <h1 className="mb-4 mt-3 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
          Add a product
        </h1>
        <p className="max-w-md">
          Describe the object and pick the material that matches.
        </p>
        <div className="mt-8 h-px w-full bg-stroke dark:bg-strokedark" />

        <form onSubmit={handleSubmit} className="mt-12.5 max-w-md">
          <div className="mb-7.5">
            <input
              name="name"
              type="text"
              placeholder="Product name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
              className={inputClasses}
            />
          </div>

          <div className="mb-7.5">
            <input
              name="price"
              type="text"
              placeholder="$49.00"
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
              required
              className={inputClasses}
            />
          </div>

          <div className="mb-7.5">
            <input
              name="material"
              type="text"
              placeholder="Material"
              value={data.material}
              onChange={(e) => setData({ ...data, material: e.target.value })}
              required
              className={inputClasses}
            />
          </div>

          <div className="mb-7.5">
            <input
              name="note"
              type="text"
              placeholder="Short note"
              value={data.note}
              onChange={(e) => setData({ ...data, note: e.target.value })}
              required
              className={inputClasses}
            />
          </div>

          <div className="mb-10">
            <select
              name="swatch"
              value={data.swatch}
              onChange={(e) =>
                setData({ ...data, swatch: e.target.value as ProductSwatch })
              }
              required
              className={inputClasses}
            >
              {swatches.map((swatch) => (
                <option key={swatch} value={swatch}>
                  {swatch[0].toUpperCase() + swatch.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            aria-label="add product"
            className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
          >
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
