import { Product } from "@/shared/types/product";

import { _mockProducts } from "@/shared/_mock/_products";

export const getProductById = async (id: string): Promise<Product | null> => {
  // Example: simulate an API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  const product = _mockProducts.find((p) => p.id === id);
  return product || null;
};
