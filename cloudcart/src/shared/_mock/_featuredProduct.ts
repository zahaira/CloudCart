import type { Product } from "../types/product";
import { _mockProducts } from "./_products";

export const featuredProducts: Product[] = _mockProducts.filter(
  (product) => product.isFeatured
);
