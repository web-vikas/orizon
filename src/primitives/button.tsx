/**
 * @file Button Primitive
 *
 * Low-level button built on top of Base UI's unstyled `<Button>`.
 * Styled with Tailwind via CVA (class-variance-authority).
 *
 * This is the **primitive** layer — it owns:
 *   - Visual variants (default/primary, outline, secondary, ghost, destructive, link)
 *   - Size tokens (xs → lg + icon sizes)
 *   - Shared interaction states (hover, active, focus-visible, disabled)
 *
 * The higher-level `components/button/Button.tsx` wraps this primitive
 * and maps Ant-Design-style props (type, danger, ghost, loading, …) onto it.
 *
 * @see {@link ../../components/button/Button.tsx} — public API wrapper
 */

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * CVA variant definition for every button style.
 *
 * Base classes handle:
 *   - Layout: inline-flex, centered content, gap for icons
 *   - Typography: text-sm, font-medium, no-wrap
 *   - Interaction: cursor-pointer, transition-all, focus-visible ring
 *   - Disabled: pointer-events-none, reduced opacity, not-allowed cursor
 *   - Accessibility: aria-invalid styling for form integration
 *   - SVG children: auto-sized, pointer-events-none
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none cursor-pointer select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      /**
       * Visual variant — maps to the Ant-Design "type" prop via the wrapper.
       *
       * | variant      | maps from          | description                        |
       * |------------- |--------------------|------------------------------------|
       * | default      | type="primary"     | Solid primary bg + shadow          |
       * | outline      | type="default/dashed" | Bordered, transparent bg        |
       * | secondary    | (internal only)    | Muted solid bg                     |
       * | ghost        | type="text"        | No bg, subtle hover                |
       * | destructive  | danger=true        | Red tinted bg                      |
       * | link         | type="link"        | Underline on hover, no bg          |
       */
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/80 active:shadow-none",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground active:bg-muted/80 aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground active:bg-muted/70 aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 active:bg-destructive/30 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },

      /**
       * Size tokens.
       *
       * Named sizes (xs → lg) control height, padding, font-size, icon size.
       * `icon` / `icon-*` sizes are square (no padding) for icon-only buttons.
       * `in-data-[slot=button-group]` overrides border-radius inside ButtonGroup.
       */
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Primitive Button component.
 *
 * Renders a Base UI `<Button>` with CVA-driven variant classes.
 * Consumers should prefer the public `<Button>` from `components/button`
 * unless they need direct access to primitive variants.
 */
function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
