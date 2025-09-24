import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import ListItemText from "@mui/material/ListItemText";

import { fDate } from "@/utils/format-time";
import { Icon } from "@iconify/react";
import { Review } from "@/shared/types/product";

// ----------------------------------------------------------------------

type Props = {
  review: Review;
};

export function ProductReviewItem({ review }: Props) {
  const renderInfo = (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{ xs: "row", md: "column" }}
      sx={{ width: { md: 240 }, textAlign: { md: "center" } }}
    >
      <Icon
        icon="mdi:account-circle"
        width={40}
        style={{ marginRight: 4, color: "#535353ff" }}
      />
      <ListItemText
        primary={review.userName}
        secondary={fDate(review.date)}
        primaryTypographyProps={{
          noWrap: true,
          typography: "subtitle2",
          mb: 0.5,
        }}
        secondaryTypographyProps={{
          noWrap: true,
          typography: "caption",
          component: "span",
        }}
      />
    </Stack>
  );

  const renderContent = (
    <Stack spacing={1} flexGrow={1}>
      <Rating size="small" value={review.rating} precision={0.1} readOnly />

      {review.isPurchased && (
        <Stack
          direction="row"
          alignItems="center"
          sx={{ color: "success.main", typography: "caption" }}
        >
          <Icon
            icon="ic:round-verified"
            width={16}
            style={{ marginRight: 0.5 }}
          />
          Verified purchase
        </Stack>
      )}

      <Typography variant="body2">{review.comment}</Typography>

      <Stack direction="row" spacing={2} sx={{ pt: 1.5 }}>
        <ButtonBase disableRipple sx={{ gap: 0.5, typography: "caption" }}>
          <Icon icon="solar:like-outline" width={16} />
          123
        </ButtonBase>

        <ButtonBase disableRipple sx={{ gap: 0.5, typography: "caption" }}>
          <Icon icon="solar:dislike-outline" width={16} />
          34
        </ButtonBase>
      </Stack>
    </Stack>
  );

  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", md: "row" }}
      sx={{ mt: 5, px: { xs: 2.5, md: 0 } }}
    >
      {renderInfo}

      {renderContent}
    </Stack>
  );
}
