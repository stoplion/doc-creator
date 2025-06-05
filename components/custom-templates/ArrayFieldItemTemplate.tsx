import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  ArrayFieldItemTemplateType,
  FormContextType,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils"
import { GripVertical, Trash2 } from "lucide-react"

/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldItemTemplateType` props for the component
 */
export default function ArrayFieldItemTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: ArrayFieldItemTemplateType<T, S, F> & { sortableId: string }) {
  const { children, buttonsProps, hasToolbar, uiSchema, registry, sortableId } =
    props
  const uiOptions = getUiOptions<T, S, F>(uiSchema)

  // Set up sortable functionality
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sortableId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-2 flex flex-row flex-wrap relative ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="grow shrink bg-red-900">{children}</div>
      <div className="flex items-end justify-end p-0.5 top-0 right-0">
        {hasToolbar && (
          <div className="flex gap-2">
            {/* Drag Handle */}
            <button
              type="button"
              className="p-1 text-gray-500 hover:text-gray-700 cursor-grab active:cursor-grabbing"
              {...attributes}
              {...listeners}
            >
              <GripVertical size={16} />
            </button>

            {/* Delete Button */}
            {buttonsProps?.onDropIndexClick && (
              <button
                type="button"
                className="p-1 text-red-500 hover:text-red-700"
                onClick={buttonsProps.onDropIndexClick(buttonsProps.index)}
                disabled={buttonsProps.disabled || buttonsProps.readonly}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
