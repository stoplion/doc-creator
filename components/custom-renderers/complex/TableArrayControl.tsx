import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrayControlProps,
  ArrayTranslations,
  ControlElement,
  createDefaultValue,
  encode,
  getControlPath,
  Helpers,
  Paths,
  RankedTester,
  Resolve,
  Test,
} from "@jsonforms/core"
import {
  DispatchCell,
  withArrayTranslationProps,
  withJsonFormsArrayControlProps,
  withTranslateProps,
} from "@jsonforms/react"
import { Trash2 } from "lucide-react"
import { cn } from "../../../utils/cn"
import { Button } from "../../ui/button"

const { convertToValidClassName } = Helpers
const { or, isObjectArrayControl, isPrimitiveArrayControl, rankWith } = Test

/**
 * Alternative tester for an array that also checks whether the 'table'
 * option is set.
 * @type {RankedTester}
 */
export const tableArrayControlTester: RankedTester = rankWith(
  3,
  or(isObjectArrayControl, isPrimitiveArrayControl)
)

type BaseProps = ArrayControlProps & {
  translations: ArrayTranslations
  className?: string
  removeItems: (path: string, toDelete: number[]) => () => void
}

const TableArrayControl = ({
  addItem,
  uischema,
  schema,
  rootSchema,
  path,
  data,
  visible,
  errors,
  label,
  childErrors = [],
  translations,
  enabled,
  className,
  removeItems,
}: BaseProps) => {
  if (!visible) {
    return null
  }

  const controlElement = uischema as ControlElement
  const createControlElement = (key?: string): ControlElement => ({
    type: "Control",
    label: false,
    scope: schema.type === "object" ? `#/properties/${key}` : "#",
  })

  const confirmDelete = (path: string, index: number) => {
    const p = path.substring(0, path.lastIndexOf("."))
    removeItems(p, [index])()
  }

  const isValid = errors.length === 0
  const properties = schema.properties || {}

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{label}</h3>
        <Button
          type="button"
          disabled={!enabled}
          onClick={addItem(path, createDefaultValue(schema, rootSchema))}
        >
          {translations.addTooltip}
        </Button>
      </div>

      {!isValid && (
        <div className="rounded-md bg-red-900/50 p-2 text-sm text-red-200">
          {errors}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(properties)
                .filter((prop) => properties[prop].type !== "array")
                .map((prop) => (
                  <TableHead key={prop}>
                    {properties[prop].title ?? prop}
                  </TableHead>
                ))}
              <TableHead>Valid</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data || !Array.isArray(data) || data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  {translations.noDataMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((_child, index) => {
                const childPath = Paths.compose(path, `${index}`)
                const errorsPerEntry = childErrors.filter((error) => {
                  const errorPath = getControlPath(error)
                  return errorPath.startsWith(childPath)
                })

                return (
                  <TableRow key={childPath}>
                    {Object.keys(properties)
                      .filter((prop) => properties[prop].type !== "array")
                      .map((prop) => {
                        const childPropPath = Paths.compose(
                          childPath,
                          prop.toString()
                        )
                        return (
                          <TableCell key={childPropPath}>
                            <DispatchCell
                              schema={Resolve.schema(
                                schema,
                                `#/properties/${encode(prop)}`,
                                rootSchema
                              )}
                              uischema={createControlElement(encode(prop))}
                              path={childPath + "." + prop}
                            />
                          </TableCell>
                        )
                      })}
                    <TableCell>
                      {errorsPerEntry.length > 0 ? (
                        <span className="text-sm text-red-500">
                          {errorsPerEntry.map((e) => e.message).join(" and ")}
                        </span>
                      ) : (
                        <span className="text-sm text-green-500">OK</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={!enabled}
                        onClick={() => {
                          if (
                            window.confirm(translations.deleteDialogMessage)
                          ) {
                            confirmDelete(childPath, index)
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">
                          {translations.removeAriaLabel}
                        </span>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const TableArrayControlWithTranslations = withArrayTranslationProps(
  TableArrayControl as React.ComponentType<ArrayControlProps>
)
const TableArrayControlWithTranslate = withTranslateProps(
  TableArrayControlWithTranslations
)
export default withJsonFormsArrayControlProps(TableArrayControlWithTranslate)
