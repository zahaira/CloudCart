"use client";
import Box from "@mui/material/Box";
import { Image } from "@/shared/components/image";
import {
  Carousel,
  useCarousel,
  CarouselThumb,
  CarouselThumbs,
  CarouselArrowNumberButtons,
} from "@/shared/components/carousel";
import { Product } from "@/shared/types/product";

type Props = {
  images?: Product["images"];
};

export function ProductDetailsCarousel({ images }: Props) {
  const carousel = useCarousel({
    thumbs: {
      slidesToShow: "auto",
    },
  });

  const slides = images?.map((img) => ({ src: img })) || [];

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto" }}>
      {/* Main carousel */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          mb: 2.5,
          borderRadius: 3,
        }}
      >
        <CarouselArrowNumberButtons
          {...carousel.arrows}
          options={carousel.options}
          totalSlides={carousel.dots.dotCount}
          selectedIndex={carousel.dots.selectedIndex + 1}
          sx={{ right: 16, bottom: 16, position: "absolute" }}
        />

        <Carousel carousel={carousel} sx={{ width: "100%", height: "100%" }}>
          {slides.map((slide) => (
            <Image
              key={slide.src}
              alt={slide.src}
              src={slide.src}
              ratio="1/1"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                cursor: "grab",
                "&:active": { cursor: "grabbing" },
              }}
            />
          ))}
        </Carousel>
      </Box>

      {/* Thumbnails */}
      <CarouselThumbs
        ref={carousel.thumbs.thumbsRef}
        options={carousel.options?.thumbs}
        slotProps={{ disableMask: true }}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 1,
          overflowX: "auto",
        }}
      >
        {slides.map((item, index) => (
          <CarouselThumb
            key={item.src}
            index={index}
            src={item.src}
            selected={index === carousel.thumbs.selectedIndex}
            onClick={() => carousel.thumbs.onClickThumb(index)}
          />
        ))}
      </CarouselThumbs>
    </Box>
  );
}
