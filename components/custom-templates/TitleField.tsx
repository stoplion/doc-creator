import {
  FormContextType,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
  TitleFieldProps,
} from "@rjsf/utils"

import { Separator } from "../../components/ui/separator"

/** Helper function to detect nesting for primitive fields that bypass ObjectFieldTemplate */
function detectPrimitiveFieldNesting(id: string): boolean {
  if (!id) return false

  console.log("🔍 Primitive Detection for:", id)

  // Remove the __title suffix first to get the actual field path
  const fieldPath = id.replace(/__title$/, "")
  console.log("🔍 Field path after removing __title:", fieldPath)

  // Parse ID structure same as ObjectFieldTemplate
  const segments = fieldPath
    .split("_")
    .filter((segment: string) => segment !== "root" && segment !== "")
  console.log("🔍 All segments:", segments)

  // Remove array indices
  const nonArraySegments = segments.filter(
    (segment: string) => !/^\d+$/.test(segment)
  )
  console.log("🔍 Non-array segments:", nonArraySegments)

  // Special case: Fields within array items (work, education, etc.) should be considered nested
  // If we have array indices in the path, this indicates we're inside an array item
  const hasArrayIndex = segments.some((segment: string) =>
    /^\d+$/.test(segment)
  )
  const isFieldInArrayItem = nonArraySegments.length === 2 && hasArrayIndex

  // Regular nested primitive fields: exactly 2 non-array segments
  const isRegularNestedField = nonArraySegments.length === 2

  const isNested = isFieldInArrayItem || isRegularNestedField

  console.log("🔍 Primitive detection result:", {
    id,
    fieldPath,
    segments,
    nonArraySegments,
    hasArrayIndex,
    isFieldInArrayItem,
    isRegularNestedField,
    count: nonArraySegments.length,
    isNested,
  })

  return isNested
}

/** The `TitleField` is the template to use to render the title of a field
 * Renders nested object titles in green color when marked by ObjectFieldTemplate
 * Top-level headers and array item headers retain default styling
 *
 * @param props - The `TitleFieldProps` for this component
 */
export default function TitleField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ id, title, required, uiSchema }: TitleFieldProps<T, S, F>) {
  const uiOptions = getUiOptions<T, S, F>(uiSchema)
  const displayTitle = uiOptions.title || title

  // Check if this is specifically marked as a nested object title by ObjectFieldTemplate
  let isNestedObjectTitle = uiOptions.isNestedObjectTitle === true

  // Fallback: If not marked by ObjectFieldTemplate, check if it's a nested primitive field
  if (!isNestedObjectTitle) {
    isNestedObjectTitle = detectPrimitiveFieldNesting(id)
  }

  // Debug logging
  console.log("🎨 TitleField Debug:", {
    id,
    title: displayTitle,
    isNestedObjectTitle,
    fromObjectTemplate: uiOptions.isNestedObjectTitle === true,
    fromPrimitiveDetection:
      !uiOptions.isNestedObjectTitle && detectPrimitiveFieldNesting(id),
    uiOptions: uiOptions,
  })

  // Return null if no title to display
  if (!displayTitle) {
    return null
  }

  if (isNestedObjectTitle) {
    // Nested object titles - render in green
    console.log("🟢 Rendering GREEN title:", displayTitle)
    return (
      <div id={id} className="my-2 flex flex-col gap-1">
        <h3 className="text-green-600 font-semibold text-lg group-hover:underline group-hover:decoration-green-400 group-hover:decoration-2 group-hover:underline-offset-2 transition-all">
          {displayTitle}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        <Separator
          dir="horizontal"
          style={{ height: "1px" }}
          className="bg-green-200"
        />
      </div>
    )
  } else {
    // Top-level titles and array item titles - retain default styling
    console.log("⚪ Rendering DEFAULT title:", displayTitle)
    return (
      <div id={id} className="my-1 flex flex-col">
        <h2 className="font-bold text-xl group-hover:underline group-hover:decoration-gray-400 group-hover:decoration-2 group-hover:underline-offset-2 transition-all">
          {displayTitle}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h2>
        {/* <Separator
          dir="horizontal"
          style={{ height: "1px" }}
          className="bg-gray-300"
        /> */}
      </div>
    )
  }
}
