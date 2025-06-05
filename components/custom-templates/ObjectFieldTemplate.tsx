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

/** Helper function to determine if this is a nested object field
 * by checking the idSchema structure and parent context
 */
function isNestedObjectField<T, S extends StrictRJSFSchema = RJSFSchema>(
  idSchema: any,
  schema: S
): boolean {
  const id = idSchema?.$id || ""

  // Debug logging
  console.log("🔍 ObjectFieldTemplate Debug:", {
    id,
    schemaType: schema.type,
    title: (schema as any).title,
  })

  // Check if this is a nested object (not just any nested field)
  // Look for patterns that indicate this is an object field within another structure
  if (schema.type === "object" && id) {
    // Count the depth, but exclude array indices (numbers) from the count
    const segments = id
      .split("_")
      .filter((segment: string) => segment !== "root")

    // Filter out array indices (numeric segments) to get actual object nesting
    const nonArraySegments = segments.filter(
      (segment: string) => !/^\d+$/.test(segment)
    )

    // Special case: Array items within sections (work, education, etc.) should be considered nested
    // If we have one section name and one array index, this is an array item that should be green
    const hasArrayIndex = segments.some((segment: string) =>
      /^\d+$/.test(segment)
    )
    const isArrayItem = nonArraySegments.length === 1 && hasArrayIndex

    // Regular nested objects: more than 1 non-array segment
    const isNestedObject = nonArraySegments.length > 1

    const isNested = isArrayItem || isNestedObject

    console.log("🔍 Nesting Analysis:", {
      id,
      segments,
      nonArraySegments,
      hasArrayIndex,
      isArrayItem,
      isNestedObject,
      isNested,
      title: (schema as any).title,
    })

    // Return true if this is either an array item or a nested object
    return isNested
  }

  return false
}

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

  // Determine if this object title should be styled as nested
  const isNested = isNestedObjectField(idSchema, schema)

  // Create modified uiSchema to pass nesting context to TitleFieldTemplate
  const titleUiSchema = {
    ...uiSchema,
    "ui:options": {
      ...uiOptions,
      isNestedObjectTitle: isNested,
    },
  }

  return (
    <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
      {title && (
        <CollapsibleTrigger asChild>
          <div className="cursor-pointer hover:bg-gray-800/50 rounded-md p-1 -m-1 transition-colors group">
            <TitleFieldTemplate
              id={titleId<T>(idSchema)}
              title={title}
              required={required}
              schema={schema}
              uiSchema={titleUiSchema}
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
