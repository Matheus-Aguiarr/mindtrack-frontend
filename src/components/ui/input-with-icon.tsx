import { Input } from "./input"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import type {ReactNode} from 'react'
import type {InputHTMLAttributes} from 'react'

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  iconRight?: ReactNode
}

export const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon, iconRight, className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}

        <Input
          ref={ref}
          className={cn(
            icon ? "pl-10" : "",
            iconRight ? "pr-10" : "",
            className
          )}
          {...props}
        />

        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {iconRight}
          </span>
        )}
      </div>
    )
  }
)

InputWithIcon.displayName = "InputWithIcon"
