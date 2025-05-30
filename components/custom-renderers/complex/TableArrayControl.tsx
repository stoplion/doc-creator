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

type TableArrayControlProps = ArrayControlProps & {
  translations: ArrayTranslations
}

const TableArrayControlBase = ({
  data,
  path,
  schema,
  uischema,
  errors,
  label,
  enabled,
  visible,
  addItem,
  removeItems,
  translations,
  rootSchema,
}: TableArrayControlProps) => {
  if (!visible) {
    return null
  }

  const controlElement = uischema as ControlElement
  const isValid = errors.length === 0
  const createControlElement = (key?: string): ControlElement => ({
    type: "Control",
    label: false,
    scope: schema.type === "object" ? `#/properties/${key}` : "#",
  })

  return (
    <div className="w-full space-y-4">
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
      {!isValid && <div className="text-sm text-red-500">{errors}</div>}
      <Table>
        <TableHeader>
          <TableRow>
            {schema.properties ? (
              Object.entries(schema.properties)
                .filter(([_, prop]) => prop.type !== "array")
                .map(([key, prop]) => (
                  <TableHead key={key}>{prop.title ?? key}</TableHead>
                ))
            ) : (
              <TableHead>Items</TableHead>
            )}
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!data || !Array.isArray(data) || data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={
                  schema.properties
                    ? Object.keys(schema.properties).length + 1
                    : 2
                }
              >
                {translations.noDataMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((_item: unknown, index: number) => {
              const childPath = Paths.compose(path, `${index}`)

              return (
                <TableRow key={childPath}>
                  {schema.properties ? (
                    Object.entries(schema.properties)
                      .filter(([_, prop]) => prop.type !== "array")
                      .map(([key, prop]) => (
                        <TableCell key={key}>
                          <DispatchCell
                            schema={Resolve.schema(
                              schema,
                              `#/properties/${encode(key)}`,
                              rootSchema
                            )}
                            uischema={createControlElement(encode(key))}
                            path={Paths.compose(childPath, key)}
                            enabled={enabled}
                            visible={true}
                          />
                        </TableCell>
                      ))
                  ) : (
                    <TableCell>
                      <DispatchCell
                        schema={schema}
                        uischema={createControlElement()}
                        path={childPath}
                        enabled={enabled}
                        visible={true}
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={!enabled}
                      onClick={() => {
                        if (window.confirm(translations.deleteDialogMessage)) {
                          removeItems?.(path, [index])()
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}

const TableArrayControlWithTranslations = withArrayTranslationProps(
  TableArrayControlBase
)
const TableArrayControlWithTranslate = withTranslateProps(
  TableArrayControlWithTranslations
)
export const TableArrayControl = withJsonFormsArrayControlProps(
  TableArrayControlWithTranslate
)
