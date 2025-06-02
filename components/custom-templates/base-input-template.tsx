import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BaseInputTemplateProps } from "@rjsf/utils"
import { Case, Switch } from "react-if"

export function BaseInputTemplate(props: BaseInputTemplateProps) {
  const {
    id,
    value,
    type = "text",
    onChange,
    onBlur,
    onFocus,
    disabled,
    readonly,
    ...rest
  } = props

  // Adapt RJSF event handlers to native events
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange && onChange(e.target.value)
  }
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onBlur && onBlur(id, e.target.value)
  }
  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onFocus && onFocus(id, e.target.value)
  }

  return (
    <Switch>
      <Case condition={type === "textarea"}>
        <Textarea
          id={id}
          value={value || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled || readonly}
          {...rest}
        />
      </Case>
      <Case condition={true}>
        <Input
          id={id}
          type={type}
          value={value || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled || readonly}
          {...rest}
        />
      </Case>
    </Switch>
  )
}
