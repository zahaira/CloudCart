import { ProductDetailsView } from "@/shared/section/product/view/product-details-view";
import { getProductById } from "@/shared/services/productService";
import React from "react";

interface Props {
  params: { id: string };
}

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetailsView product={product} />;
};

export default ProductPage;
