import Pagination, { paginationClasses } from "@mui/material/Pagination";

import { ProductReviewItem } from "./product-review-item";
import { Review } from "@/shared/types/product";

// ----------------------------------------------------------------------

type Props = {
  reviews: Review[];
};

export function ProductReviewList({ reviews }: Props) {
  return (
    <>
      {reviews.map((review) => (
        <ProductReviewItem key={review.id} review={review} />
      ))}

      <Pagination
        count={5}
        sx={{
          mx: "auto",
          [`& .${paginationClasses.ul}`]: {
            my: 5,
            mx: "auto",
            justifyContent: "center",
          },
        }}
      />
    </>
  );
}
