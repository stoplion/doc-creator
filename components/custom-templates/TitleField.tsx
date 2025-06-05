import {
  FormContextType,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
  TitleFieldProps,
} from "@rjsf/utils"

import { Separator } from "../../components/ui/separator"

/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
export default function TitleField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ id, title, uiSchema }: TitleFieldProps<T, S, F>) {
  const uiOptions = getUiOptions<T, S, F>(uiSchema)
  console.log("TitleField props:", {
    id,
    title,
    schema: uiSchema,
    uiSchema,
    required: uiSchema?.required,
    uiOptions,
    schemaType: uiSchema?.type,
    schemaProperties: uiSchema?.properties,
    schemaItems: uiSchema?.items,
  })
  return (
    <div id={id} className="my-1 flex flex-col gap-0.5 !bg-blue-900">
      <h5>{uiOptions.title || title}!!</h5>
      <Separator
        dir="horizontal"
        style={{ height: "1px" }}
        className="bg-white"
      />
    </div>
  )
}
