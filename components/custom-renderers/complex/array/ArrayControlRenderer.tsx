import {
  ArrayControlProps,
  ArrayTranslations,
  composePaths,
  ControlElement,
  createDefaultValue,
  findUISchema,
  Helpers,
} from "@jsonforms/core"
import {
  JsonFormsDispatch,
  withArrayTranslationProps,
  withJsonFormsArrayControlProps,
  withTranslateProps,
} from "@jsonforms/react"
import range from "lodash/range"
import { useMemo } from "react"
import { Button } from "../../../ui/button"
import { Card } from "../../../ui/card"
import { Separator } from "../../../ui/separator"

export const ArrayControl = ({
  data,
  label,
  path,
  schema,
  errors,
  addItem,
  removeItems,
  moveUp,
  moveDown,
  uischema,
  uischemas,
  rootSchema,
  translations,
  enabled,
}: ArrayControlProps & { translations: ArrayTranslations }) => {
  const controlElement = uischema as ControlElement
  const childUiSchema = useMemo(
    () =>
      findUISchema(
        uischemas || [],
        schema,
        uischema.scope,
        path,
        undefined,
        uischema,
        rootSchema
      ),
    [uischemas, schema, uischema.scope, path, uischema, rootSchema]
  )

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-200">
          {label}
        </h3>
        <Button
          variant="outline"
          size="sm"
          disabled={!enabled}
          onClick={() => addItem(path, createDefaultValue(schema, rootSchema))}
        >
          Add to {label}
        </Button>
      </div>

      {errors && (
        <div className="text-sm text-red-500 dark:text-red-400">{errors}</div>
      )}

      <div className="space-y-4">
        {data ? (
          range(0, data.length).map((index: number) => {
            const childPath = composePaths(path, `${index}`)
            return (
              <div key={index} className="space-y-2">
                <Card className="p-4">
                  <JsonFormsDispatch
                    schema={schema}
                    uischema={childUiSchema || uischema}
                    path={childPath}
                    key={childPath}
                  />
                </Card>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!enabled || index === 0}
                    onClick={() => moveUp && moveUp(path, index)()}
                  >
                    {translations.up}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!enabled || index === data.length - 1}
                    onClick={() => moveDown && moveDown(path, index)()}
                  >
                    {translations.down}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={!enabled}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?"
                        )
                      ) {
                        removeItems && removeItems(path, [index])()
                      }
                    }}
                  >
                    {translations.removeTooltip}
                  </Button>
                </div>
                {index < data.length - 1 && <Separator className="my-4" />}
              </div>
            )
          })
        ) : (
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            {translations.noDataMessage}
          </p>
        )}
      </div>
    </Card>
  )
}

export const ArrayControlRenderer = ({
  schema,
  uischema,
  data,
  path,
  rootSchema,
  uischemas,
  addItem,
  removeItems,
  moveUp,
  moveDown,
  id,
  visible,
  enabled,
  errors,
  translations,
  arraySchema,
}: ArrayControlProps & { translations: ArrayTranslations }) => {
  const controlElement = uischema as ControlElement
  const labelDescription = Helpers.createLabelDescriptionFrom(
    controlElement,
    schema
  )
  const label = labelDescription.show ? labelDescription.text || "" : ""

  if (!visible) {
    return null
  }

  return (
    <ArrayControl
      data={data}
      label={label}
      path={path}
      schema={schema}
      arraySchema={arraySchema}
      errors={errors}
      addItem={addItem}
      removeItems={removeItems}
      moveUp={moveUp}
      moveDown={moveDown}
      uischema={uischema}
      uischemas={uischemas}
      rootSchema={rootSchema}
      id={id}
      visible={visible}
      enabled={enabled}
      translations={translations}
    />
  )
}

export default withJsonFormsArrayControlProps(
  withTranslateProps(withArrayTranslationProps(ArrayControlRenderer))
)
