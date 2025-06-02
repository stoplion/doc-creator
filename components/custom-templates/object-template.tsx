import { Card } from "@/components/ui/card"
import { ObjectFieldTemplateProps } from "@rjsf/utils"

export function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
  const { title, description, properties } = props

  return (
    <Card className="p-4 space-y-4 mb-4">
      {title && (
        <div className="space-y-1 mb-2 uppercase text-zinc-400">
          <h3 className="text-lg font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {properties.map((element) => (
          <div key={element.name} className="space-y-2">
            {element.content}
          </div>
        ))}
      </div>
    </Card>
  )
}
