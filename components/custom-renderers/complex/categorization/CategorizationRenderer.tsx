import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"
import type { Categorization, Category } from "@jsonforms/core"
import { withJsonFormsLayoutProps } from "@jsonforms/react"
import { useState } from "react"
import type { CustomLayoutProps } from "../../util"
import { withCustomProps } from "../../util"
import { CategorizationList } from "./CategorizationList"
import { SingleCategory } from "./SingleCategory"

export interface CategorizationState {
  selectedCategory: Category
}

interface CategorizationProps {
  selected?: number
  onChange?(selected: number, prevSelected: number): void
}

export const CategorizationRenderer = ({
  data,
  uischema,
  schema,
  path,
  selected,
  visible,
  onChange,
  ajv,
}: CustomLayoutProps & CategorizationProps) => {
  const categorization = uischema as Categorization
  const elements = categorization.elements as (Category | Categorization)[]
  const [previousCategorization, setPreviousCategorization] =
    useState<Categorization>(uischema as Categorization)
  const [activeCategory, setActiveCategory] = useState<number>(selected ?? 0)

  const safeCategory =
    activeCategory >= categorization.elements.length ? 0 : activeCategory

  if (categorization !== previousCategorization) {
    setActiveCategory(0)
    setPreviousCategorization(categorization)
  }

  const onCategorySelected = (categoryIndex: number) => () => {
    if (onChange) {
      return onChange(categoryIndex, safeCategory)
    }
    return setActiveCategory(categoryIndex)
  }

  if (visible === false) {
    return null
  }

  return (
    <Card className="w-full">
      <Tabs defaultValue={safeCategory.toString()} className="w-full">
        <TabsList className="w-full justify-start">
          <CategorizationList
            elements={elements}
            selectedCategory={elements[safeCategory] as Category}
            data={data}
            ajv={ajv}
            depth={0}
            onSelect={onCategorySelected}
          />
        </TabsList>
        <TabsContent value={safeCategory.toString()} className="mt-4">
          <SingleCategory
            category={elements[safeCategory] as Category}
            schema={schema}
            path={path}
            key={safeCategory}
          />
        </TabsContent>
      </Tabs>
    </Card>
  )
}

export default withCustomProps(withJsonFormsLayoutProps(CategorizationRenderer))
