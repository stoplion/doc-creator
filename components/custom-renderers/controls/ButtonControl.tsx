import { ControlProps } from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { Button } from "../../ui/button"

export const ButtonControl = ({
  data,
  handleChange,
  path,
  label,
  errors,
  required,
  visible,
  uischema,
}: ControlProps) => {
  if (!visible) {
    return null
  }

  // Get button options from uischema
  const options = uischema.options || {}
  const {
    variant = "default",
    size = "default",
    className = "",
    onClick,
  } = options

  const handleClick = () => {
    if (onClick) {
      // If there's a custom onClick handler in options, call it
      onClick(data)
    } else {
      // Otherwise just toggle the value
      handleChange(path, !data)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant={variant as any}
        size={size as any}
        className={`${className} ${
          variant === "default"
            ? "bg-white hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            : ""
        }`}
        onClick={handleClick}
      >
        {label}
      </Button>
      {errors && (
        <div className="text-sm text-red-500 dark:text-red-400">
          {Array.isArray(errors)
            ? errors
                .map((error: { message: string }) => error.message)
                .join(", ")
            : errors}
        </div>
      )}
    </div>
  )
}

export default withJsonFormsControlProps(ButtonControl)
