import { TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Categorization, Category, isVisible } from "@jsonforms/core"
import { useMemo } from "react"
import { isCategorization } from "./tester"

export interface CategorizationProps {
  elements: (Category | Categorization)[]
  selectedCategory: Category
  depth: number
  data: any
  onSelect: any
  ajv: any
}

export const CategorizationList = ({
  selectedCategory,
  elements,
  data,
  depth,
  onSelect,
  ajv,
}: CategorizationProps) => {
  const filteredElements = useMemo(() => {
    return elements.filter((category: Category | Categorization) =>
      isVisible(category, data, "", ajv)
    )
  }, [elements, data, ajv])

  const categoryLabels = useMemo(
    () => filteredElements.map((cat) => cat.label || ""),
    [filteredElements]
  )

  return (
    <>
      {filteredElements.map((category, idx) => {
        if (isCategorization(category)) {
          return (
            <div key={categoryLabels[idx]} className="flex flex-col">
              <TabsTrigger
                value={idx.toString()}
                onClick={onSelect(idx)}
                className={cn(
                  "data-[state=active]:bg-accent data-[state=active]:text-accent-foreground",
                  "pl-4"
                )}
              >
                {categoryLabels[idx]}
              </TabsTrigger>
              <div className="pl-4">
                <CategorizationList
                  selectedCategory={selectedCategory}
                  elements={category.elements as (Category | Categorization)[]}
                  data={data}
                  ajv={ajv}
                  depth={depth + 1}
                  onSelect={onSelect}
                />
              </div>
            </div>
          )
        } else {
          return (
            <TabsTrigger
              key={categoryLabels[idx]}
              value={idx.toString()}
              onClick={onSelect(idx)}
              className={cn(
                "data-[state=active]:bg-accent data-[state=active]:text-accent-foreground",
                "pl-4"
              )}
            >
              {categoryLabels[idx]}
            </TabsTrigger>
          )
        }
      })}
    </>
  )
}
