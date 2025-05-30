import type { JsonSchema, UISchemaElement } from "@jsonforms/core"

export const UPDATE_DATA = "UPDATE_DATA"
export const UPDATE_UI_SCHEMA = "UPDATE_UI_SCHEMA"
export const UPDATE_SCHEMA = "UPDATE_SCHEMA"
export const UPDATE_VALIDATION = "UPDATE_VALIDATION"

export interface UpdateDataAction {
  type: typeof UPDATE_DATA
  path: string
  data: any
}

export interface UpdateUISchemaAction {
  type: typeof UPDATE_UI_SCHEMA
  path: string
  uischema: UISchemaElement
}

export interface UpdateSchemaAction {
  type: typeof UPDATE_SCHEMA
  path: string
  schema: JsonSchema
}

export interface UpdateValidationAction {
  type: typeof UPDATE_VALIDATION
  path: string
  errors: any[]
}

export const updateData = (path: string, data: any): UpdateDataAction => ({
  type: UPDATE_DATA,
  path,
  data,
})

export const updateUISchema = (
  path: string,
  uischema: UISchemaElement
): UpdateUISchemaAction => ({
  type: UPDATE_UI_SCHEMA,
  path,
  uischema,
})

export const updateSchema = (
  path: string,
  schema: JsonSchema
): UpdateSchemaAction => ({
  type: UPDATE_SCHEMA,
  path,
  schema,
})

export const updateValidation = (
  path: string,
  errors: any[]
): UpdateValidationAction => ({
  type: UPDATE_VALIDATION,
  path,
  errors,
})

export type JsonFormsAction =
  | UpdateDataAction
  | UpdateUISchemaAction
  | UpdateSchemaAction
  | UpdateValidationAction
