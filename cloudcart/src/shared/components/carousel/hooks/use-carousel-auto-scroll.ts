import type { EmblaCarouselType } from "embla-carousel";
import { useState, useEffect, useCallback } from "react";
import type { UseCarouselAutoPlayReturn } from "../types";

// ----------------------------------------------------------------------

// Define a type for the autoScroll plugin
interface AutoScrollPlugin {
  play: () => void;
  stop: () => void;
  reset: () => void;
  isPlaying: () => boolean;
  options: {
    stopOnInteraction?: boolean;
    [key: string]: any; // allow other options
  };
}

export function useCarouselAutoScroll(
  mainApi?: EmblaCarouselType
): UseCarouselAutoPlayReturn {
  const [isPlaying, setIsPlaying] = useState(false);

  const onClickAutoplay = useCallback(
    (callback: () => void) => {
      const autoScroll = mainApi?.plugins()?.autoScroll as
        | AutoScrollPlugin
        | undefined;
      if (!autoScroll) return;

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [mainApi]
  );

  const onTogglePlay = useCallback(() => {
    const autoScroll = mainApi?.plugins()?.autoScroll as
      | AutoScrollPlugin
      | undefined;
    if (!autoScroll) return;

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play;
    playOrStop();
  }, [mainApi]);

  useEffect(() => {
    const autoScroll = mainApi?.plugins()?.autoScroll as
      | AutoScrollPlugin
      | undefined;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());

    mainApi
      .on("autoScroll:play", () => setIsPlaying(true))
      .on("autoScroll:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(false));
  }, [mainApi]);

  return { isPlaying, onTogglePlay, onClickAutoplay };
}
