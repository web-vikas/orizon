"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { CarouselProps, CarouselRef, AutoplayConfig } from "./types";

// ---------------------------------------------------------------------------
// InternalCarousel
// ---------------------------------------------------------------------------

const InternalCarousel = React.forwardRef<CarouselRef, CarouselProps>(
  (
    {
      autoplay = false,
      dots = true,
      dotPosition = "bottom",
      effect = "scrollx",
      slidesToShow = 1,
      beforeChange,
      afterChange,
      arrows = false,
      initialSlide = 0,
      infinite = true,
      className,
      style,
      children,
    },
    ref,
  ) => {
    const slides = React.Children.toArray(children);
    const totalSlides = slides.length;
    const [currentIndex, setCurrentIndex] = React.useState(initialSlide);
    const [isTransitioning, setIsTransitioning] = React.useState(false);
    const timerRef = React.useRef<ReturnType<typeof setInterval>>(undefined);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const autoplayConfig: AutoplayConfig | false =
      autoplay === false
        ? false
        : autoplay === true
          ? { interval: 3000, pauseOnHover: true }
          : { interval: 3000, pauseOnHover: true, ...autoplay };

    const goTo = React.useCallback(
      (index: number) => {
        if (isTransitioning) return;
        const next =
          infinite
            ? ((index % totalSlides) + totalSlides) % totalSlides
            : Math.max(0, Math.min(index, totalSlides - slidesToShow));

        beforeChange?.(currentIndex, next);
        setIsTransitioning(true);
        setCurrentIndex(next);

        setTimeout(() => {
          setIsTransitioning(false);
          afterChange?.(next);
        }, 300);
      },
      [currentIndex, totalSlides, slidesToShow, infinite, beforeChange, afterChange, isTransitioning],
    );

    const next = React.useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);
    const prev = React.useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);

    // Expose imperative API
    React.useImperativeHandle(ref, () => ({
      goTo,
      next,
      prev,
    }));

    // Autoplay
    React.useEffect(() => {
      if (autoplayConfig === false || totalSlides <= 1) return;

      const startAutoplay = () => {
        timerRef.current = setInterval(next, autoplayConfig.interval);
      };

      startAutoplay();

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [autoplayConfig, next, totalSlides]);

    const handleMouseEnter = () => {
      if (autoplayConfig && autoplayConfig.pauseOnHover && timerRef.current) {
        clearInterval(timerRef.current);
      }
    };

    const handleMouseLeave = () => {
      if (autoplayConfig && autoplayConfig.pauseOnHover) {
        timerRef.current = setInterval(next, autoplayConfig.interval);
      }
    };

    const isVertical = dotPosition === "left" || dotPosition === "right";

    // Dots
    const dotsNode = dots && totalSlides > 1 && (
      <div
        className={cn(
          "flex gap-1",
          isVertical ? "flex-col" : "flex-row",
          dotPosition === "bottom" && "mt-3 justify-center",
          dotPosition === "top" && "mb-3 justify-center",
          dotPosition === "left" && "mr-3 items-center",
          dotPosition === "right" && "ml-3 items-center",
        )}
      >
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={cn(
              "rounded-full transition-all",
              idx === currentIndex
                ? "bg-primary"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
              isVertical
                ? (idx === currentIndex ? "h-4 w-2" : "h-2 w-2")
                : (idx === currentIndex ? "h-2 w-4" : "h-2 w-2"),
              typeof dots === "object" && dots.className,
            )}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    );

    return (
      <div
        className={cn(
          "relative",
          isVertical && "flex",
          dotPosition === "left" && "flex-row-reverse",
          className,
        )}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {(dotPosition === "top" || dotPosition === "left") && dotsNode}

        <div ref={containerRef} className="relative flex-1 overflow-hidden">
          {/* Slides */}
          {effect === "scrollx" ? (
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              }}
            >
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className="shrink-0"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  {slide}
                </div>
              ))}
            </div>
          ) : (
            // Fade effect
            <div className="relative">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "transition-opacity duration-300",
                    idx === 0 ? "relative" : "absolute inset-0",
                    idx === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none",
                  )}
                >
                  {slide}
                </div>
              ))}
            </div>
          )}

          {/* Arrows */}
          {arrows && totalSlides > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white hover:bg-black/50"
                onClick={prev}
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white hover:bg-black/50"
                onClick={next}
                aria-label="Next slide"
              >
                <ChevronRightIcon className="size-5" />
              </button>
            </>
          )}
        </div>

        {(dotPosition === "bottom" || dotPosition === "right") && dotsNode}
      </div>
    );
  },
);

InternalCarousel.displayName = "Carousel";

export { InternalCarousel };
