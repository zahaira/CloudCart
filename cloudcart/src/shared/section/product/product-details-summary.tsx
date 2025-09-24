"use client";

import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { fCurrency, fShortenNumber } from "@/utils/format-number";

import { Form } from "@/shared/components/hook-form";
import { Icon } from "@iconify/react";

import { IncrementerButton } from "./components/incrementer-button";
import { Product } from "@/shared/types/product";
import { Checkout } from "@/shared/types/checkout";

// ----------------------------------------------------------------------

type Props = {
  product: Product;
  items?: Checkout[];
  disableActions?: boolean;
  onGotoStep?: (step: number) => void;
  onAddCart?: (cartItem: Checkout) => void;
};

export function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disableActions,
  ...other
}: Props) {
  const {
    id,
    name,
    price,
    coverUrl,
    stock,
    priceSale,
    saleLabel,
    totalRatings,
    totalReviews,
    inventoryType,
    subDescription,
  } = product;

  const existProduct =
    !!items?.length && items.map((item) => item.id).includes(id);

  const isMaxQuantity =
    !!items?.length &&
    items.filter((item) => item.id === id).map((item) => item.quantity)[0] >=
      stock;

  const defaultValues = {
    id,
    name,
    coverUrl,
    stock,
    price,
    quantity: stock < 1 ? 0 : 1,
  };

  const methods = useForm({ defaultValues });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!existProduct) {
        onAddCart?.({
          ...data,
          subtotal: data.price * data.quantity,
        });
      }
      onGotoStep?.(0);
      // router.push(paths.product.checkout);
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddCart = useCallback(() => {
    try {
      onAddCart?.({
        ...values,
        subtotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values]);

  const renderPrice = (
    <Box sx={{ typography: "h5" }}>
      {priceSale && (
        <Box
          component="span"
          sx={{
            color: "text.disabled",
            textDecoration: "line-through",
            mr: 0.5,
          }}
        >
          {fCurrency(priceSale)}
        </Box>
      )}

      {fCurrency(price)}
    </Box>
  );

  const renderShare = (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Link
        variant="subtitle2"
        sx={{
          color: "text.secondary",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Icon icon="mingcute:add-line" width={16} style={{ marginRight: 1 }} />
        Compare
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: "text.secondary",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Icon icon="solar:heart-bold" width={16} style={{ marginRight: 1 }} />
        Favorite
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: "text.secondary",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Icon icon="solar:share-bold" width={16} style={{ marginRight: 1 }} />
        Share
      </Link>
    </Stack>
  );

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={values.quantity}
          disabledDecrease={values.quantity <= 1}
          disabledIncrease={values.quantity >= stock}
          onIncrease={() => setValue("quantity", values.quantity + 1)}
          onDecrease={() => setValue("quantity", values.quantity - 1)}
        />

        <Typography
          variant="caption"
          component="div"
          sx={{ textAlign: "right" }}
        >
          Available: {stock}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        disabled={isMaxQuantity || disableActions}
        size="large"
        color="primary"
        variant="contained"
        startIcon={<Icon icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: "nowrap" }}
      >
        Add to cart
      </Button>

      <Button
        fullWidth
        size="large"
        color="secondary"
        type="submit"
        variant="contained"
        disabled={disableActions}
      >
        Buy now
      </Button>
    </Stack>
  );

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      {subDescription}
    </Typography>
  );

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ color: "text.disabled", typography: "body2" }}
    >
      <Rating
        size="small"
        value={totalRatings}
        precision={0.1}
        readOnly
        sx={{ mr: 1 }}
      />
      {`(${fShortenNumber(totalReviews)} reviews)`}
    </Stack>
  );

  const renderInventoryType = (
    <Box
      component="span"
      sx={{
        typography: "overline",
        fontWeight: "bold",
        color:
          (inventoryType === "out of stock" && "error.main") || "success.main",
      }}
    >
      {inventoryType}
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {renderInventoryType}

          <Typography variant="h5">{name}</Typography>

          {renderRating}

          {renderPrice}

          {renderSubDescription}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        {renderQuantity}

        <Divider sx={{ borderStyle: "dashed" }} />

        {renderActions}

        {renderShare}
      </Stack>
    </Form>
  );
}
