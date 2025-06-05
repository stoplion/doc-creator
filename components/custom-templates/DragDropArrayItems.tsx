"use client"

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import {
  ArrayFieldItemTemplateType,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils"
import { ComponentType } from "react"

interface DragDropArrayItemsProps<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
> {
  items: ArrayFieldItemTemplateType<T, S, F>[] | undefined
  ArrayFieldItemTemplate: ComponentType<
    ArrayFieldItemTemplateType<T, S, F> & { sortableId: string }
  >
  onDragEnd: (oldIndex: number, newIndex: number) => void
}

export default function DragDropArrayItems<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  items,
  ArrayFieldItemTemplate,
  onDragEnd,
}: DragDropArrayItemsProps<T, S, F>) {
  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id && items) {
      const oldIndex = items.findIndex((item) => item.key === active.id)
      const newIndex = items.findIndex((item) => item.key === over?.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        onDragEnd(oldIndex, newIndex)
      }
    }
  }

  if (!items) {
    return null
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.key)}
        strategy={verticalListSortingStrategy}
      >
        {items.map(
          ({ key, ...itemProps }: ArrayFieldItemTemplateType<T, S, F>) => (
            <ArrayFieldItemTemplate key={key} sortableId={key} {...itemProps} />
          )
        )}
      </SortableContext>
    </DndContext>
  )
}
