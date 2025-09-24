import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import { fShortenNumber } from "@/utils/format-number";

import { ProductReviewList } from "./product-review-list";
import { Product, Review } from "@/shared/types/product";

// ----------------------------------------------------------------------

type Props = {
  totalRatings?: number;
  totalReviews?: number;
  reviews?: Review[];
  ratings?: Product["ratings"];
};

export function ProductDetailsReview({
  totalRatings,
  totalReviews,
  ratings = [],
  reviews = [],
}: Props) {
  const renderSummary = (
    <Stack spacing={1} alignItems="center" justifyContent="center">
      <Typography variant="subtitle2">Average rating</Typography>

      <Typography variant="h2">
        {totalRatings}
        /5
      </Typography>

      <Rating readOnly value={totalRatings} precision={0.1} />

      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        ({fShortenNumber(totalReviews)} reviews)
      </Typography>
    </Stack>
  );

  const renderProgress = (
    <Stack
      spacing={1.5}
      sx={{
        py: 5,
        px: { xs: 3, md: 5 },
        borderLeft: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
        borderRight: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
      }}
    >
      {ratings
        .slice(0)
        .reverse()
        .map((rating) => (
          <Stack
            key={rating.star}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            {/* Star display */}
            <Rating readOnly value={rating.star} precision={1} size="small" />

            {/* Progress bar */}
            <LinearProgress
              variant="determinate"
              value={
                totalReviews ? (rating.reviewCount / totalReviews) * 100 : 0
              }
              sx={{
                mx: 2,
                flexGrow: 1,
                height: 8,
                borderRadius: 1,
                bgcolor: "grey.300", // background of the bar (unfilled part)
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "warning.main", // filled part color
                },
              }}
            />

            {/* Count of reviews */}
            <Typography
              variant="body2"
              component="span"
              sx={{ minWidth: 48, color: "text.secondary" }}
            >
              {fShortenNumber(rating.reviewCount)}
            </Typography>
          </Stack>
        ))}
    </Stack>
  );

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        sx={{ py: { xs: 5, md: 0 } }}
      >
        {renderSummary}

        {renderProgress}
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <ProductReviewList reviews={reviews} />
    </>
  );
}
