"use client";

import { Product } from "@/shared/types/product";
import { alpha, Card, Container, Grid, Tab, Tabs } from "@mui/material";
import { ProductDetailsCarousel } from "../product-details-carousel";
import { ProductDetailsSummary } from "../product-details-summary";
import { useTabs } from "@/shared/components/hooks/use-tabs";
import ProductDetailsDescription from "../product-details-description";
import { ProductDetailsReview } from "../product-details-review";

// ----------------------------------------------------------------------

type Props = {
  product?: Product;
};

export function ProductDetailsView({ product }: Props) {
  const tabs = useTabs("description");

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: "var(--layout-dashboard-content-pt)",
      }}
    >
      <Grid
        container
        spacing={{ xs: 3, md: 5, lg: 8 }}
        justifyContent="center"
        gap={1}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProductDetailsCarousel images={product?.images ?? []} />
        </Grid>

        <Grid item xs={12} md={6} lg={5}>
          {product && (
            <ProductDetailsSummary disableActions={false} product={product} />
          )}
        </Grid>
      </Grid>
      <Card
        sx={{
          my: 3,
          boxShadow: (theme) => `0px 6px 8px -2px ${theme.palette.grey[400]}`,
        }}
      >
        <Tabs
          value={tabs.value}
          onChange={tabs.onChange}
          sx={{
            px: 3,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {[
            { value: "description", label: "Description" },
            {
              value: "reviews",
              label: `Reviews (${product?.reviews?.length})`,
            },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {tabs.value === "description" && product?.specifications && (
          <ProductDetailsDescription
            description={product.description}
            specifications={product?.specifications ?? ""}
          />
        )}

        {tabs.value === "reviews" && (
          <ProductDetailsReview
            ratings={product?.ratings ?? []}
            reviews={product?.reviews ?? []}
            totalRatings={product?.totalRatings ?? 0}
            totalReviews={product?.totalReviews ?? 0}
          />
        )}
      </Card>
    </Container>
  );
}
