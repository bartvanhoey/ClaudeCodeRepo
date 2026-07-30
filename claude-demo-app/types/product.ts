export type ProductSwatch =
  | "wood"
  | "linen"
  | "ceramic"
  | "rattan"
  | "marble"
  | "brass"
  | "cotton"
  | "glass";

export type Product = {
  id: number;
  name: string;
  price: string;
  material: string;
  note: string;
  swatch: ProductSwatch;
};
