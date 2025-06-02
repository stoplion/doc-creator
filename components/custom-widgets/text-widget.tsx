import { Input } from "@/components/ui/input"
import { WidgetProps } from "@rjsf/utils"

export function TextWidget(props: WidgetProps) {
  const {
    id,
    value,
    onChange,
    disabled,
    onBlur,
    onFocus,
    autofocus,
    required,
    readonly,
    placeholder,
    name,
  } = props
  debugger
  return (
    <Input
      id={id}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => onBlur && onBlur(id, e.target.value)}
      onFocus={(e) => onFocus && onFocus(id, e.target.value)}
      disabled={disabled || readonly}
      required={required}
      autoFocus={autofocus}
      readOnly={readonly}
      placeholder={placeholder}
      name={name}
      autoComplete="off"
    />
  )
}
