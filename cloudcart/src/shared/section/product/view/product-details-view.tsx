import { Product } from "@/shared/types/product";
import { Container, Grid } from "@mui/material";
import { ProductDetailsCarousel } from "../product-details-carousel";

// ----------------------------------------------------------------------

type Props = {
  product?: Product;
};

export function ProductDetailsView({ product }: Props) {
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
        alignItems="center"
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

        <Grid
          item
          xs={12}
          md={6}
          lg={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          details
        </Grid>
      </Grid>
    </Container>
  );
}
