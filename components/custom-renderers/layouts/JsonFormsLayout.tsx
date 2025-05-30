import { cn } from "@/utils/cn"
import { RendererProps } from "@jsonforms/core"
import React from "react"

interface JsonFormsLayoutProps extends RendererProps {
  children: React.ReactNode
  className?: string
}

export const JsonFormsLayout = ({
  className,
  children,
  visible,
}: JsonFormsLayoutProps) => {
  return (
    <div className={cn("w-full", visible === false && "hidden", className)}>
      {children}
    </div>
  )
}
