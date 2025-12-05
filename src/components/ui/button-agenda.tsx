import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const buttonAgendaVariants = cva(
  "inline-flex items-center justify-center rounded text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50",
        ghost: "hover:bg-gray-100 text-gray-900",
      },
      size: {
        default: "h-10 px-6 py-3",
        sm: "h-9 px-4 py-2",
        lg: "h-11 px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonAgendaProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonAgendaVariants> {
  asChild?: boolean
}

const ButtonAgenda = React.forwardRef<HTMLButtonElement, ButtonAgendaProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={buttonAgendaVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  }
)
ButtonAgenda.displayName = "ButtonAgenda"

export { ButtonAgenda, buttonAgendaVariants }
