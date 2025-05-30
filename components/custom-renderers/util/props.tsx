import { cn } from "@/utils/cn"
import type {
  ControlElement,
  JsonFormsState,
  OwnPropsOfCell,
  OwnPropsOfControl,
  OwnPropsOfRenderer,
  RendererProps,
  StatePropsOfCell,
  StatePropsOfControl,
} from "@jsonforms/core"
import { convertToValidClassName, getAjv, getConfig } from "@jsonforms/core"
import { useJsonForms } from "@jsonforms/react"
import type { Ajv } from "ajv"
import isEmpty from "lodash/isEmpty"
import { ComponentType, useMemo } from "react"

export interface WithClassname {
  className?: string
}

export interface AjvProps {
  ajv: Ajv
}

export interface WithChildren {
  children: any
}

/**
 * Additional renderer props specific to shadcn/ui renderers.
 */
export interface ShadcnRendererProps extends WithClassname {
  classNames?: { [className: string]: string }
}

/**
 * Add shadcn/ui props to the return value of calling the given
 * mapStateToProps function.
 */
export const addShadcnControlProps =
  <P extends StatePropsOfControl>(
    mapStateToProps: (s: JsonFormsState, p: OwnPropsOfControl) => P
  ) =>
  (
    state: JsonFormsState,
    ownProps: OwnPropsOfControl
  ): StatePropsOfControl & ShadcnRendererProps => {
    const props: StatePropsOfControl = mapStateToProps(state, ownProps)
    const config = getConfig(state)
    const trim = config.trim
    const controlElement = props.uischema as ControlElement
    const isValid = isEmpty(props.errors)
    const scope = !isEmpty(controlElement.scope)
      ? convertToValidClassName(controlElement.scope)
      : ""

    return {
      ...props,
      classNames: {
        wrapper: cn("space-y-2", scope, trim && "trim"),
        input: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          !isValid && "border-destructive"
        ),
        label:
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        description: "text-sm text-muted-foreground",
        validation: "text-sm",
        validationError: "text-sm text-destructive",
      },
    }
  }

export const withShadcnControlProps = (Component: ComponentType<any>) =>
  function WithShadcnControlProps(props: any) {
    const ctx = useJsonForms()
    const controlElement = props.uischema as ControlElement
    const config = ctx.config
    const trim = config && config.trim
    const scope = !isEmpty(controlElement.scope)
      ? convertToValidClassName(controlElement.scope)
      : ""
    const isValid = isEmpty(props.errors)

    const classNamesProp = useMemo(
      () => ({
        wrapper: cn("space-y-2", scope, trim && "trim"),
        input: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          !isValid && "border-destructive"
        ),
        label:
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        description: "text-sm text-muted-foreground",
        validation: "text-sm",
        validationError: "text-sm text-destructive",
      }),
      [scope, trim, isValid]
    )

    return <Component {...props} classNames={classNamesProp} />
  }

/**
 * Add shadcn/ui props to the return value of calling the given
 * mapStateToProps function for layouts.
 */
export const addShadcnLayoutProps =
  (
    mapStateToProps: (s: JsonFormsState, p: OwnPropsOfRenderer) => RendererProps
  ) =>
  (
    state: JsonFormsState,
    ownProps: OwnPropsOfRenderer
  ): RendererProps & ShadcnRendererProps => {
    const props = mapStateToProps(state, ownProps)

    return {
      ...props,
      classNames: {
        wrapper: "space-y-4",
      },
    }
  }

/**
 * Add shadcn/ui props to the return value of calling the given
 * mapStateToProps function for cells.
 */
export const addShadcnCellProps =
  (
    mapStateToCellsProps: (
      s: JsonFormsState,
      p: OwnPropsOfCell
    ) => StatePropsOfCell
  ) =>
  (
    state: JsonFormsState,
    ownProps: OwnPropsOfCell
  ): StatePropsOfCell & ShadcnRendererProps => {
    const props = mapStateToCellsProps(state, ownProps)
    const isValid = props.isValid

    return {
      ...props,
      className: cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        !isValid && "border-destructive"
      ),
    }
  }

export const withShadcnCellPropsForType =
  (type: string) => (Component: ComponentType<any>) =>
    function WithShadcnCellPropsForType(props: any) {
      const isValid = isEmpty(props.errors)

      return (
        <Component
          {...props}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            !isValid && "border-destructive"
          )}
        />
      )
    }

export const withAjvProps = <P extends object>(
  Component: ComponentType<AjvProps & P>
) =>
  function WithAjvProps(props: P) {
    const ctx = useJsonForms()
    const ajv = getAjv(ctx.jsonforms)
    return <Component {...props} ajv={ajv} />
  }
