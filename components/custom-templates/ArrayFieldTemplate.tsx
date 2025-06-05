import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  ArrayFieldTemplateProps,
  buttonId,
  FormContextType,
  getTemplate,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils"
import dynamic from "next/dynamic"
import { useCallback, useState } from "react"
import AddButton from "../custom-widgets/AddButton"

// Client-only drag and drop wrapper to prevent hydration mismatches
const DragDropArrayItems = dynamic(() => import("./DragDropArrayItems"), {
  ssr: false,
})

/** The `ArrayFieldTemplate` component is the template used to render all items in an array.
 *
 * @param props - The `ArrayFieldItemTemplateType` props for the component
 */
export default function ArrayFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: ArrayFieldTemplateProps<T, S, F>) {
  const {
    canAdd,
    disabled,
    idSchema,
    uiSchema,
    items,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
  } = props
  const uiOptions = getUiOptions<T, S, F>(uiSchema)
  const ArrayFieldDescriptionTemplate = getTemplate<
    "ArrayFieldDescriptionTemplate",
    T,
    S,
    F
  >("ArrayFieldDescriptionTemplate", registry, uiOptions)
  const ArrayFieldItemTemplate = getTemplate<"ArrayFieldItemTemplate", T, S, F>(
    "ArrayFieldItemTemplate",
    registry,
    uiOptions
  )
  const ArrayFieldTitleTemplate = getTemplate<
    "ArrayFieldTitleTemplate",
    T,
    S,
    F
  >("ArrayFieldTitleTemplate", registry, uiOptions)

  // State for collapsible functionality
  const [isOpen, setIsOpen] = useState(true)

  // Handle open state changes
  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  // Handle drag end event
  const handleDragEnd = useCallback(
    (oldIndex: number, newIndex: number) => {
      if (items && oldIndex !== newIndex) {
        const item = items[oldIndex]
        if (item.buttonsProps?.onReorderClick) {
          item.buttonsProps.onReorderClick(oldIndex, newIndex)()
        }
      }
    },
    [items]
  )

  // Button templates are not overridden in the uiSchema
  // const {
  //   ButtonTemplates: { AddButton },
  // } = registry.templates
  return (
    <div>
      <div className="m-0 flex p-0">
        <div className="m-0 w-full p-0">
          <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
            {(uiOptions.title || title) && (
              <CollapsibleTrigger asChild>
                <div className="cursor-pointer hover:bg-gray-800/50 rounded-md p-1 -m-1 transition-colors group">
                  <ArrayFieldTitleTemplate
                    idSchema={idSchema}
                    title={uiOptions.title || title}
                    schema={schema}
                    uiSchema={uiSchema}
                    required={required}
                    registry={registry}
                  />
                </div>
              </CollapsibleTrigger>
            )}

            <CollapsibleContent>
              <ArrayFieldDescriptionTemplate
                idSchema={idSchema}
                description={uiOptions.description || schema.description}
                schema={schema}
                uiSchema={uiSchema}
                registry={registry}
              />
              <div
                key={`array-item-list-${idSchema.$id}`}
                className="p-0 m-0 w-full mb-2"
              >
                <DragDropArrayItems
                  items={items as any}
                  ArrayFieldItemTemplate={ArrayFieldItemTemplate as any}
                  onDragEnd={handleDragEnd}
                />
                {canAdd && (
                  <div className="mt-2 flex">
                    <AddButton
                      id={buttonId<T>(idSchema, "add")}
                      className="rjsf-array-item-add w-full"
                      onClick={onAddClick}
                      disabled={disabled || readonly}
                      uiSchema={uiSchema}
                      registry={registry}
                    >
                      Add
                    </AddButton>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}
