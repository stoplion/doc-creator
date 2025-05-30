import { ControlProps } from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { Input } from "../../ui/input"

export const TextInputControl = ({
  data,
  handleChange,
  path,
  label,
  errors,
  required,
  visible,
}: ControlProps) => {
  if (!visible) {
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-900 dark:text-zinc-200">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Input
        value={data || ""}
        onChange={(e) => handleChange(path, e.target.value)}
        className={`bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-zinc-200 placeholder:text-gray-500 dark:placeholder:text-zinc-500 ${
          errors ? "border-red-500" : ""
        }`}
      />
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

export default withJsonFormsControlProps(TextInputControl)
