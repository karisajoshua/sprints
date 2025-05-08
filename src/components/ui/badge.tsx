
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        magenta: "border-transparent bg-magenta text-white hover:bg-magenta/80",
        purple: "border-transparent bg-purple text-white hover:bg-purple/80",
        lavender: "border-transparent bg-lavender text-white hover:bg-lavender/80",
        subtle: "border-transparent bg-accent/20 text-accent hover:bg-accent/30",
        gradient: "border-transparent bg-gradient-lavender text-white",
        todo: "border-transparent bg-muted text-muted-foreground",
        progress: "border-transparent bg-lavender/20 text-lavender",
        review: "border-transparent bg-magenta/20 text-magenta",
        done: "border-transparent bg-purple/20 text-purple",
        emerald: "border-transparent bg-lavender text-white hover:bg-lavender/80", // Remapped emerald to lavender
        sand: "border-transparent bg-magenta text-white hover:bg-magenta/80", // Remapped sand to magenta
        teal: "border-transparent bg-purple text-white hover:bg-purple/80", // Remapped teal to purple
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
