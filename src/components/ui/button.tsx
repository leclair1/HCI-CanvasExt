import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent text-sm font-semibold tracking-tight transition-[transform,box-shadow,background,filter] duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/25 dark:aria-invalid:ring-destructive/45 aria-invalid:border-destructive overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-300 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-black/15 after:opacity-0 after:transition-opacity after:duration-150 hover:before:opacity-80 active:scale-[0.99] active:after:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_18px_42px_-18px_var(--ring)] hover:-translate-y-0.5 hover:bg-primary/92 hover:shadow-[0_28px_62px_-22px_var(--ring)] active:translate-y-0 active:shadow-[0_16px_36px_-20px_var(--ring)]",
        destructive:
          "bg-destructive text-white shadow-[0_18px_38px_-18px_rgba(244,63,94,0.55)] hover:-translate-y-0.5 hover:bg-destructive/90 hover:shadow-[0_26px_58px_-24px_rgba(244,63,94,0.6)] active:translate-y-0 focus-visible:ring-destructive/30 dark:focus-visible:ring-destructive/45 dark:bg-destructive/70",
        outline:
          "border border-input bg-background text-foreground shadow-[0_14px_35px_-24px_rgba(15,23,42,0.45)] hover:-translate-y-0.5 hover:bg-accent/70 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_18px_38px_-20px_rgba(15,23,42,0.35)] hover:-translate-y-0.5 hover:bg-secondary/80 hover:shadow-[0_24px_52px_-24px_rgba(15,23,42,0.45)]",
        ghost:
          "bg-transparent text-foreground hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary dark:text-primary-foreground dark:hover:bg-primary/20 before:opacity-0 hover:before:opacity-0",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, type, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      type={asChild ? undefined : type ?? "button"}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
