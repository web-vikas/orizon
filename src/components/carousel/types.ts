/**
 * @file Carousel Type Definitions
 *
 * Props and config interfaces for the `<Carousel>` slideshow
 * component. Supports scroll / fade effects, autoplay, navigation
 * arrows, dot indicators, and an imperative ref API.
 *
 * @see {@link ./Carousel.tsx} — component implementation
 */

import type { ReactNode, CSSProperties } from "react";

export type DotPosition = "top" | "bottom" | "left" | "right";
export type CarouselEffect = "scrollx" | "fade";

export interface AutoplayConfig {
  interval?: number;
  pauseOnHover?: boolean;
}

export interface CarouselProps {
  /** Auto play config or boolean */
  autoplay?: boolean | AutoplayConfig;
  /** Whether to show dots */
  dots?: boolean | { className?: string };
  /** Dot position */
  dotPosition?: DotPosition;
  /** Transition effect */
  effect?: CarouselEffect;
  /** Number of slides to show */
  slidesToShow?: number;
  /** Before change callback */
  beforeChange?: (current: number, next: number) => void;
  /** After change callback */
  afterChange?: (current: number) => void;
  /** Show navigation arrows */
  arrows?: boolean;
  /** Initial slide index */
  initialSlide?: number;
  /** Whether to loop */
  infinite?: boolean;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  children?: ReactNode;
}

export interface CarouselRef {
  goTo: (slide: number) => void;
  next: () => void;
  prev: () => void;
}
