import { Alert, AlertDescription } from "@/components/ui/alert"
import { FieldErrorProps } from "@rjsf/utils"

export function FieldErrorTemplate(props: FieldErrorProps) {
  const { errors } = props
  if (!errors || errors.length === 0) return null

  return (
    <Alert variant="destructive" className="mt-2">
      <AlertDescription>
        {errors.map((error, i) => (
          <div key={i}>{error}</div>
        ))}
      </AlertDescription>
    </Alert>
  )
}
