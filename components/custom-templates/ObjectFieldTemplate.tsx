import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  buttonId,
  canExpand,
  descriptionId,
  FormContextType,
  getTemplate,
  getUiOptions,
  ObjectFieldTemplateProps,
  RJSFSchema,
  StrictRJSFSchema,
  titleId,
} from "@rjsf/utils"
import { useCallback, useState } from "react"

/** The `ObjectFieldTemplate` is the template to use to render all the inner properties of an object along with the
 * title and description if available. If the object is expandable, then an `AddButton` is also rendered after all
 * the properties.
 *
 * @param props - The `ObjectFieldTemplateProps` for this component
 */
export default function ObjectFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  description,
  title,
  properties,
  required,
  uiSchema,
  idSchema,
  schema,
  formData,
  onAddClick,
  disabled,
  readonly,
  registry,
}: ObjectFieldTemplateProps<T, S, F>) {
  const [isOpen, setIsOpen] = useState(true)

  // Handle open state changes - this is what gets called when clicking the title
  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  const uiOptions = getUiOptions<T, S, F>(uiSchema)
  const TitleFieldTemplate = getTemplate<"TitleFieldTemplate", T, S, F>(
    "TitleFieldTemplate",
    registry,
    uiOptions
  )
  const DescriptionFieldTemplate = getTemplate<
    "DescriptionFieldTemplate",
    T,
    S,
    F
  >("DescriptionFieldTemplate", registry, uiOptions)
  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates

  return (
    <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
      {title && (
        <CollapsibleTrigger asChild>
          <div className="cursor-pointer">
            <TitleFieldTemplate
              id={titleId<T>(idSchema)}
              title={title}
              required={required}
              schema={schema}
              uiSchema={uiSchema}
              registry={registry}
            />
          </div>
        </CollapsibleTrigger>
      )}

      <CollapsibleContent>
        {description && (
          <DescriptionFieldTemplate
            id={descriptionId<T>(idSchema)}
            description={description}
            schema={schema}
            uiSchema={uiSchema}
            registry={registry}
          />
        )}
        <div className="flex flex-col gap-2 !bg-orange-900">
          {properties.map((element: any, index: number) => (
            <div
              key={index}
              className={`${element.hidden ? "hidden" : ""} flex`}
            >
              <div className="w-full"> {element.content}</div>
            </div>
          ))}
          {canExpand(schema, uiSchema, formData) ? (
            <AddButton
              id={buttonId<T>(idSchema, "add")}
              onClick={onAddClick(schema)}
              disabled={disabled || readonly}
              className="rjsf-object-property-expand"
              uiSchema={uiSchema}
              registry={registry}
            />
          ) : null}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
