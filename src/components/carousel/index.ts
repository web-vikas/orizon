/**
 * @file Carousel — Public Barrel Export
 *
 * Re-exports the `<Carousel>` slideshow component.
 */

import { InternalCarousel } from "./Carousel";

/**
 * Carousel slideshow component.
 *
 * Cycles through child slides with `effect` (scrollx / fade),
 * `autoplay`, `arrows`, `dots`, and `dotPosition`. Exposes an
 * imperative ref with `goTo`, `next`, and `prev` methods.
 *
 * @example
 * ```tsx
 * <Carousel autoplay arrows>
 *   <div>Slide 1</div>
 *   <div>Slide 2</div>
 * </Carousel>
 *
 * <Carousel effect="fade" dotPosition="right">
 *   <img src="/a.jpg" />
 *   <img src="/b.jpg" />
 * </Carousel>
 * ```
 */
const Carousel = InternalCarousel;

export { Carousel };
export type {
  CarouselProps,
  CarouselRef,
  DotPosition,
  CarouselEffect,
  AutoplayConfig,
} from "./types";
