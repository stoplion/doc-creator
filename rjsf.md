TITLE: Customizing ObjectFieldTemplate in React JSON Schema Form (TSX)
DESCRIPTION: This example customizes the rendering of object fields within a form using ObjectFieldTemplate. It provides control over the display of the object's title, description, and properties. The required dependency is @rjsf/utils and @rjsf/validator-ajv8. The output of this function is a custom display of the object with customized presentation.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/advanced-customization/custom-templates.md#_snippet_21

LANGUAGE: tsx
CODE:

```
import { ObjectFieldTemplateProps, RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'object',
  title: 'Object title',
  description: 'Object description',
  properties: {
    name: {
      type: 'string',
    },
    age: {
      type: 'number',
    },
  },
};

function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
  return (
    <div>
      {props.title}
      {props.description}
      {props.properties.map((element) => (
        <div className='property-wrapper'>{element.content}</div>
      ))}
    </div>
  );
}

render(
  <Form schema={schema} validator={validator} templates={{ ObjectFieldTemplate }} />,
  document.getElementById('app')
);
```

---

TITLE: Customizing TitleFieldTemplate in react-jsonschema-form
DESCRIPTION: This code snippet demonstrates how to customize the TitleFieldTemplate in react-jsonschema-form. It imports necessary components from `@rjsf/utils` and defines a custom TitleFieldTemplate function that renders the title and a required indicator. It then renders a Form component using the custom template.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/advanced-customization/custom-templates.md#_snippet_23

LANGUAGE: tsx
CODE:

```
import { RJSFSchema, TitleFieldProps } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'string',
  title: 'My input',
  description: 'input description',
};

function TitleFieldTemplate(props: TitleFieldProps) {
  const { id, required, title } = props;
  return (
    <header id={id}>
      {title}
      {required && <mark>*</mark>}
    </header>
  );
}

render(
  <Form schema={schema} validator={validator} templates={{ TitleFieldTemplate }} />,
  document.getElementById('app')
);
```

---

TITLE: Importing react-jsonschema-form dependencies
DESCRIPTION: These import statements bring in the necessary modules from the installed react-jsonschema-form packages into your TypeScript file. `Form` is the main component for rendering forms, and `validator` is the validator implementation. These imports are necessary to use the library's functionalities.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/00-introduction.mdx#_snippet_1

LANGUAGE: typescript
CODE:

```
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
```

---

TITLE: Defining Conditional Schema Dependency in React JSON Schema Form (JSX)
DESCRIPTION: This code snippet demonstrates defining a conditional schema dependency in react-jsonschema-form. The `billing_address` field will be displayed if the `credit_card` field is present. The schema defines types for `name` and `credit_card`, marks `name` as required, and then uses the `dependencies` keyword to define a subschema that includes `billing_address` when `credit_card` is present. The Form component renders the schema.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/versioned_docs/version-4.2.3/usage/dependencies.md#_snippet_2

LANGUAGE: jsx
CODE:

```
const schema = {
  "type": "object",

  "properties": {
    "name": { "type": "string" },
    "credit_card": { "type": "number" }
  },

  "required": ["name"],

  "dependencies": {
    "credit_card": {
      "properties": {
        "billing_address": { "type": "string" }
      },
      "required": ["billing_address"]
    }
  }
};

render((
  <Form schema={schema} />
), document.getElementById("app"));
```

---

TITLE: Implementing ArrayFieldItemTemplate in React-jsonschema-form
DESCRIPTION: This code demonstrates how to implement a custom `ArrayFieldItemTemplate` in react-jsonschema-form. It uses the `ArrayFieldTemplateItemType` from `@rjsf/utils`. The template renders a div element containing the children of the array item. This template allows for customization of individual array items.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/advanced-customization/custom-templates.md#_snippet_10

LANGUAGE: tsx
CODE:

```
import { ArrayFieldTemplateItemType, RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'array',
  items: {
    type: 'string',
  },
};

function ArrayFieldItemTemplate(props: ArrayFieldTemplateItemType) {
  const { children, className } = props;
  return <div className={className}>{children}</div>;
}

render(
  <Form schema={schema} validator={validator} templates={{ ArrayFieldItemTemplate }} />,
  document.getElementById('app')
);
```

---

TITLE: Defining and Referencing Schemas in react-jsonschema-form (JSX)
DESCRIPTION: This code snippet demonstrates how to define a reusable schema for an address and then reference it in other parts of the main schema using the `$ref` keyword. It utilizes the `definitions` property to store the address schema and then references it for both billing and shipping addresses. This helps avoid code duplication and promotes maintainability. The snippet also includes rendering the form using the schema.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/versioned_docs/version-4.2.3/usage/definitions.md#_snippet_0

LANGUAGE: jsx
CODE:

```
const schema = {
  "definitions": {
    "address": {
      "type": "object",
      "properties": {
        "street_address": { "type": "string" },
        "city":           { "type": "string" },
        "state":          { "type": "string" }
      },
      "required": ["street_address", "city", "state"]
    }
  },
  "type": "object",
  "properties": {
    "billing_address": { "$ref": "#/definitions/address" },
    "shipping_address": { "$ref": "#/definitions/address" }
  }
};

render((
  <Form schema={schema} />
), document.getElementById("app"));
```

---

TITLE: Customizing ArrayFieldTitleTemplate in RJSF (TSX)
DESCRIPTION: This example demonstrates how to customize the ArrayFieldTitleTemplate in react-jsonschema-form. It defines a custom component that renders the title of an array field within an <h1> tag. The component receives the title and idSchema as props and uses the titleId utility to generate a unique ID.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/advanced-customization/custom-templates.md#_snippet_11

LANGUAGE: tsx
CODE:

```
import { ArrayFieldTitleTemplateProps, RJSFSchema, titleId } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'array',
  items: {
    type: 'string',
  },
};

function ArrayFieldTitleTemplate(props: ArrayFieldTitleProps) {
  const { title, idSchema } = props;
  const id = titleId(idSchema);
  return <h1 id={id}>{title}</h1>;
}

render(
  <Form schema={schema} validator={validator} templates={{ ArrayFieldTitleTemplate }} />,
  document.getElementById('app')
);
```

---

TITLE: Defining Custom Templates for React JSON Schema Form
DESCRIPTION: This code snippet demonstrates how to define custom templates for an `ArrayField` and an `ErrorList` within react-jsonschema-form. It defines `MyArrayFieldTemplate` to customize the array field rendering, including adding and removing items. It also defines `MyErrorListTemplate` to render form errors in a custom unordered list. It exports a `ThemeObject` including these templates and the widgets.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/versioned_docs/version-4.2.3/advanced-customization/custom-themes.md#_snippet_2

LANGUAGE: jsx
CODE:

```
function MyArrayFieldTemplate(props) {
  return (
    <div>
      {props.items.map(element => element.children)}
      {props.canAdd && <button type="button" onClick={props.onAddClick}></button>}
    </div>
  );
}

function MyErrorListTemplate(props) {
  const {errors} = props;
  return (
    <ul>
      {errors.map(error => (
          <li key={error.stack}>
            {error.stack}
          </li>
        ))}
    </ul>
  );
}

const ThemeObject = {
    ArrayFieldTemplate: MyArrayFieldTemplate,
    ErrorList: MyErrorListTemplate,
    widgets: myWidgets
};

export default ThemeObject;
```

---

TITLE: Focus On First Error
DESCRIPTION: Demonstrates how to use the `focusOnFirstError` prop to focus on the first field with an error after form submission. It also shows how to provide a custom callback function to handle the focusing logic. The example shows importing Form, RJSFSchema, RJSFValidationError, validator, defining a simple schema and a custom focus function, then rendering the Form component with the `focusOnFirstError` prop set to this function.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/api-reference/form-props.md#_snippet_7

LANGUAGE: tsx
CODE:

```
import { Form } from '@rjsf/core';
import { RJSFSchema, RJSFValidationError } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'string',
};

const focusOnError = (error: RJSFValidationError) => {
  console.log('I need to handle focusing this error');
};

render(<Form schema={schema} validator={validator} focusOnFirstError={focusOnError} />, document.getElementById('app'));
```

---

TITLE: Using react-jsonschema-form to render a form
DESCRIPTION: This code demonstrates how to use the react-jsonschema-form component to render a form based on a JSON schema. It defines a schema for a 'Todo' object, specifies a validator, and configures event handlers for changes, submissions, and errors. The form is then rendered into the DOM element with the ID 'app'.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/00-introduction.mdx#_snippet_2

LANGUAGE: tsx
CODE:

```
import Form from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  title: 'Todo',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    done: { type: 'boolean', title: 'Done?', default: false },
  },
};

const log = (type) => console.log.bind(console, type);

render(
  <Form
    schema={schema}
    validator={validator}
    onChange={log('changed')}
    onSubmit={log('submitted')}
    onError={log('errors')}
  />,
  document.getElementById('app')
);
```

---

TITLE: Customizing AddButton in react-jsonschema-form
DESCRIPTION: This snippet shows how to customize the AddButton template in react-jsonschema-form. It imports necessary components, defines a custom AddButton function that renders a button with an icon and the text 'Add' from `react-intl`. It then renders a Form component using the custom AddButton as part of the ButtonTemplates.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/advanced-customization/custom-templates.md#_snippet_26

LANGUAGE: tsx
CODE:

```
import React from 'react';
import { IconButtonProps, RJSFSchema } from '@rjsf/utils';
import { FormattedMessage } from 'react-intl';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'string',
};

function AddButton(props: IconButtonProps) {
  const { icon, iconType, ...btnProps } = props;
  return (
    <button {...btnProps}>
      {icon} <FormattedMessage defaultMessage='Add' />
    </button>
  );
}

render(
  <Form schema={schema} validator={validator} templates={{ ButtonTemplates: { AddButton } }} />,
  document.getElementById('app')
);
```

---

TITLE: Disable the Form
DESCRIPTION: Illustrates how to disable the entire form using the `disabled` prop. This prop is then passed down to each field within the form, effectively preventing user interaction. The example shows importing Form, RJSFSchema, validator, defining a simple schema, and then rendering the Form component with the `disabled` prop set to `true`.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/api-reference/form-props.md#_snippet_5

LANGUAGE: tsx
CODE:

```
import { Form } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'string',
};

render(<Form schema={schema} validator={validator} disabled />, document.getElementById('app'));
```

---

TITLE: Defining Unidirectional Property Dependency in react-jsonschema-form (TSX)
DESCRIPTION: This code snippet demonstrates how to define a unidirectional property dependency in react-jsonschema-form. If the `credit_card` field is defined, the `billing_address` field becomes required. The code imports necessary modules, defines a schema, and renders the form using the schema and validator.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/json-schema/dependencies.md#_snippet_0

LANGUAGE: tsx
CODE:

```
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'object',

  properties: {
    name: { type: 'string' },
    credit_card: { type: 'number' },
    billing_address: { type: 'string' },
  },

  required: ['name'],

  dependencies: {
    credit_card: ['billing_address'],
  },
};

render(<Form schema={schema} validator={validator} />, document.getElementById('app'));
```

---

TITLE: Adding Custom Validation Rules to React JSONSchema Form (JSX)
DESCRIPTION: This snippet shows how to define custom validation rules using the `validate` prop. The `validate` function receives the form data and an `errors` object, and it must return the `errors` object after adding any custom validation errors. This example checks if two password fields match.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/versioned_docs/version-4.2.3/usage/validation.md#_snippet_2

LANGUAGE: jsx
CODE:

```
function validate(formData, errors) {
  if (formData.pass1 !== formData.pass2) {
    errors.pass2.addError("Passwords don't match");
  }
  return errors;
}

const schema = {
  type: "object",
  properties: {
    pass1: {type: "string", minLength: 3},
    pass2: {type: "string", minLength: 3},
  }
};

render((
  <Form schema={schema}
        validate={validate} />
), document.getElementById("app"));
```

---

TITLE: Applying ArrayFieldTemplate through uiSchema in React-jsonschema-form
DESCRIPTION: This code shows how to apply a custom `ArrayFieldTemplate` through the `uiSchema` in react-jsonschema-form. The `ui:ArrayFieldTemplate` property within the `uiSchema` is set to the custom `ArrayFieldTemplate` function. This allows for a more declarative way of specifying the template.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/advanced-customization/custom-templates.md#_snippet_7

LANGUAGE: tsx
CODE:

```
import { UiSchema } from '@rjsf/utils';

const uiSchema: UiSchema = {
  'ui:ArrayFieldTemplate': ArrayFieldTemplate,
};
```

---

TITLE: Adding Custom Validation Rules (JSX)
DESCRIPTION: This example shows how to add custom validation rules to a React JSONSchema Form. It defines a `validate` function that receives form data and an error object, then adds errors to the object based on custom logic before returning it. This is useful for interdependent fields.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/versioned_docs/version-3.2.1/usage/validation.md#_snippet_2

LANGUAGE: jsx
CODE:

```
function validate(formData, errors) {
  if (formData.pass1 !== formData.pass2) {
    errors.pass2.addError("Passwords don't match");
  }
  return errors;
}

const schema = {
  type: "object",
  properties: {
    pass1: {type: "string", minLength: 3},
    pass2: {type: "string", minLength: 3},
  }
};

render((
  <Form schema={schema}
        validate={validate} />
), document.getElementById("app"));
```

---

TITLE: Customizing Validator with AJV Format Options
DESCRIPTION: Shows how to customize the AJV8 validator using `ajv-formats` with custom format options. It enables keywords and specifies the `date` and `time` formats. The custom validator is then used in a form.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/validator-ajv8/README.md#_snippet_6

LANGUAGE: tsx
CODE:

```
import { RJSFSchema } from '@rjsf/utils';
import Form from '@rjsf/core';
import { customizeValidator } from '@rjsf/validator-ajv8';

const validator = customizeValidator({
  ajvFormatOptions: {
    keywords: true,
    formats: ['date', 'time'],
  },
});

const schema: RJSFSchema = {
  type: 'string',
};

<Form schema={schema} validator={validator} />;
```

---

TITLE: Globally Hiding Field Labels in RJSF
DESCRIPTION: This code snippet demonstrates how to globally hide field labels in react-jsonschema-form (RJSF) by setting the `label` option to `false` within the `ui:globalOptions` directive in the uiSchema. It imports necessary components from `@rjsf/core` and `@rjsf/utils` and defines a simple string schema. The `validator` from `@rjsf/validator-ajv8` is used for validation.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/api-reference/uiSchema.md#_snippet_17

LANGUAGE: tsx
CODE:

```
import { Form } from '@rjsf/core';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = { type: 'string' };
const uiSchema: UiSchema = {
  'ui:globalOptions': {
    label: false,
  },
};

render(<Form schema={schema} uiSchema={uiSchema} validator={validator} />, document.getElementById('app'));
```

---

TITLE: Implementing Custom Validation Rules in TSX
DESCRIPTION: This snippet shows how to define custom validation rules using the `customValidate` prop on the `Form` component. The `customValidate` function receives the form data, errors object, and uiSchema, and can add custom error messages to the errors object based on complex validation logic. The errors object is then returned. This validation occurs in addition to the schema validation.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/usage/validation.md#_snippet_9

LANGUAGE: tsx
CODE:

```
import { Form } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

function customValidate(formData, errors, uiSchema) {
  if (formData.pass1 !== formData.pass2) {
    errors.pass2.addError("Passwords don't match");
  }
  return errors;
}

const schema: RJSFSchema = {
  type: 'object',
  properties: {
    pass1: { type: 'string', minLength: 3 },
    pass2: { type: 'string', minLength: 3 },
  },
};

render(<Form schema={schema} validator={validator} customValidate={customValidate} />, document.getElementById('app'));
```

---

TITLE: Initializing a form with formData
DESCRIPTION: This snippet demonstrates how to pre-fill a form with existing data using the `formData` prop. The `formData` object should match the schema's structure. The form component is rendered with the defined schema and initial data.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/versioned_docs/version-4.2.3/00-quickstart.md#_snippet_4

LANGUAGE: jsx
CODE:

```
const schema = {
  type: "object",
  properties: {
    title: {
      type: "string"
    },
    done: {
      type: "boolean"
    }
  }
};

const formData = {
  title: "First task",
  done: true
};

render((
  <Form schema={schema}
        formData={formData} />
), document.getElementById("app"));
```

---

TITLE: Implementing ArrayFieldDescriptionTemplate in React-jsonschema-form
DESCRIPTION: This code demonstrates how to implement a custom `ArrayFieldDescriptionTemplate` in react-jsonschema-form. It utilizes `ArrayFieldDescriptionProps` from `@rjsf/utils`. The template renders a details element containing a summary "Description" and the description of the array field. It uses `descriptionId` helper to generate the id of the element.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/advanced-customization/custom-templates.md#_snippet_8

LANGUAGE: tsx
CODE:

```
import { ArrayFieldDescriptionProps, RJSFSchema, descriptionId } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'array',
  items: {
    type: 'string',
  },
};

function ArrayFieldDescriptionTemplate(props: ArrayFieldDescriptionProps) {
  const { description, idSchema } = props;
  const id = descriptionId(idSchema);
  return (
    <details id={id}>
      <summary>Description</summary>
      {description}
    </details>
  );
}

render(
  <Form schema={schema} validator={validator} templates={{ ArrayFieldDescriptionTemplate }} />,
  document.getElementById('app')
);
```

---

TITLE: Enabling Live Validation in TSX
DESCRIPTION: This snippet demonstrates how to enable live validation in a `Form` component by passing the `liveValidate` prop set to `true`. This triggers validation on every change within the form data, providing real-time feedback to the user. The example also specifies the schema, form data, and the validator being used.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/usage/validation.md#_snippet_6

LANGUAGE: tsx
CODE:

```
import { Form } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: ['string'],
  const: 'test',
};

const formData = 'a';

render(<Form schema={schema} formData={formData} validator={validator} liveValidate />, document.getElementById('app'));
```

---

TITLE: Defining Unidirectional Property Dependencies in react-jsonschema-form
DESCRIPTION: This code snippet demonstrates how to define a unidirectional property dependency in react-jsonschema-form. The `billing_address` field becomes required if the `credit_card` field is present. The snippet utilizes the `dependencies` keyword within the schema definition. Requires react-jsonschema-form and react for rendering the form.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/versioned_docs/version-3.2.1/usage/dependencies.md#_snippet_0

LANGUAGE: jsx
CODE:

```
const schema = {
  "type": "object",

  "properties": {
    "name": { "type": "string" },
    "credit_card": { "type": "number" },
    "billing_address": { "type": "string" }
  },

  "required": ["name"],

  "dependencies": {
    "credit_card": ["billing_address"]
  }
};

render((
  <Form schema={schema} />
), document.getElementById("app"));
```

---

TITLE: Wrapping ObjectField to Customize onChange Handler in TypeScript
DESCRIPTION: This code snippet demonstrates how to wrap the `ObjectField` component from `@rjsf/core` to customize its `onChange` handler. It utilizes `useCallback` to create a memoized `onChangeHandler` that performs additional data validation using a `checkBadData` function. If bad data is detected, the handler can format the error and fix the data before calling the original `onChange` handler provided by the `FieldProps`. This allows for custom data processing and validation logic to be integrated into the form's data handling pipeline. Dependencies include `@rjsf/utils`, `@rjsf/core` and the custom `checkBadData` function.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/advanced-customization/custom-widgets-fields.md#_snippet_11

LANGUAGE: TypeScript
CODE:

```
import { useCallback } from 'react';
import { FieldProps } from '@rjsf/utils';
import { getDefaultRegistry } from '@rjsf/core';

import checkBadData from './checkBadData';

const {
  fields: { ObjectField },
} = getDefaultRegistry();

function MyObjectField(props: FieldProps) {
  const { onChange } = props;
  const onChangeHandler = useCallback(
    (newFormData: T | undefined, es?: ErrorSchema<T>, id?: string) => {
      let data = newFormData;
      let error = es;
      if (checkBadData(newFormData)) {
        // Format the `error` and fix the `data` here
      }
      onChange(data, error, id);
    },
    [onChange]
  );
  return <ObjectField {...props} onChange={onChangeHandler} />;
}
```

---

TITLE: Applying uiSchema to array items in React JSONSchema Form
DESCRIPTION: This snippet demonstrates how to apply a uiSchema to array items. It sets the `ui:widget` property to "textarea" for each item in the array using `uiSchema: { items: { "ui:widget": "textarea" } }`. This will render each string array item as a textarea input.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/versioned_docs/version-4.2.3/usage/arrays.md#_snippet_2

LANGUAGE: jsx
CODE:

```
const schema = {
  type: "array",
  items: {
    type: "string"
  }
};

const uiSchema = {
  items: {
    "ui:widget": "textarea"
  }
};

render((
  <Form schema={schema} uiSchema={uiSchema} />
), document.getElementById("app"));
```

---

TITLE: Transforming Validation Errors in React JSON Schema Form (TSX)
DESCRIPTION: This code snippet demonstrates how to customize validation error messages in React JSON Schema Form by defining a `transformErrors` function. The function receives a list of JSON Schema errors and returns a new list with modified error messages. It specifically targets 'pattern' errors and changes the message to 'Only digits are allowed'. Requires `@rjsf/core`, `@rjsf/utils`, and `@rjsf/validator-ajv8`.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/usage/validation.md#_snippet_10

LANGUAGE: tsx
CODE:

```
import { Form } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

function transformErrors(errors, uiSchema) {
  return errors.map((error) => {
    if (error.name === 'pattern') {
      error.message = 'Only digits are allowed';
    }
    return error;
  });
}

const schema: RJSFSchema = {
  type: 'object',
  properties: {
    onlyNumbersString: { type: 'string', pattern: '^\\d*$' },
  },
};

render(
  <Form schema={schema} validator={validator} transformErrors={transformErrors} />,
  document.getElementById('app')
);

```

---

TITLE: Custom Formats Validation in React JSON Schema Form (TSX)
DESCRIPTION: This code demonstrates how to add custom formats for validation in React JSON Schema Form. It defines a `customFormats` object with a regular expression for a 'phone-us' format and configures the validator using `customizeValidator`. The schema specifies that the string should match the 'phone-us' format. Requires `@rjsf/core`, `@rjsf/utils`, and `@rjsf/validator-ajv8`.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/usage/validation.md#_snippet_15

LANGUAGE: tsx
CODE:

```
import { Form } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import { customizeValidator } from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'string',
  format: 'phone-us',
};

const customFormats = {
  'phone-us': /\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/,
};

const validator = customizeValidator({ customFormats });

render(<Form schema={schema} validator={validator} />, document.getElementById('app'));

```

---

TITLE: Defining Conditional Schema Dependency in react-jsonschema-form (TSX)
DESCRIPTION: This code snippet shows how to define a conditional schema dependency in react-jsonschema-form. If the `credit_card` field is defined, the `billing_address` field is displayed and becomes required. The code imports necessary modules, defines a schema, and renders the form using the schema and validator.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/json-schema/dependencies.md#_snippet_2

LANGUAGE: tsx
CODE:

```
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'object',

  properties: {
    name: { type: 'string' },
    credit_card: { type: 'number' },
  },

  required: ['name'],

  dependencies: {
    credit_card: {
      properties: {
        billing_address: { type: 'string' },
      },
      required: ['billing_address'],
    },
  },
};

render(<Form schema={schema} validator={validator} />, document.getElementById('app'));
```

---

TITLE: Implementing ArrayFieldTemplate in React-jsonschema-form
DESCRIPTION: This code demonstrates how to implement a custom `ArrayFieldTemplate` in react-jsonschema-form. It utilizes the `ArrayFieldTemplateProps` type and the `RJSFSchema` type from `@rjsf/utils`. The template maps through the array items, rendering their children, and includes a button to add new items to the array. This template can be passed to the Form component.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/advanced-customization/custom-templates.md#_snippet_6

LANGUAGE: tsx
CODE:

```
import { ArrayFieldTemplateProps, RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'array',
  items: {
    type: 'string',
  },
};

function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
  return (
    <div>
      {props.items.map((element) => element.children)}
      {props.canAdd && <button type='button' onClick={props.onAddClick}></button>}
    </div>
  );
}

render(
  <Form schema={schema} validator={validator} templates={{ ArrayFieldTemplate }} />,
  document.getElementById('app')
);
```

---

TITLE: Enabling Additional Properties with Schema in ReactJS
DESCRIPTION: This code snippet demonstrates how to allow users to add additional properties to an object. The `additionalProperties` keyword is set to a schema that defines the type and constraints of the additional properties.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/versioned_docs/version-4.2.3/usage/objects.md#_snippet_4

LANGUAGE: jsx
CODE:

```
const schema = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "additionalProperties": {
    "type": "number",
    "enum": [1, 2, 3]
  }
};

render((
  <Form schema={schema} />
), document.getElementById("app"));
```

---

TITLE: Defining Unidirectional Property Dependency in React JSON Schema Form (JSX)
DESCRIPTION: This code snippet demonstrates how to define a unidirectional property dependency in react-jsonschema-form. The `billing_address` field becomes required if the `credit_card` field is present. The schema defines the types for `name`, `credit_card`, and `billing_address`, marks `name` as required, and then uses the `dependencies` keyword to link the presence of `credit_card` to the requirement of `billing_address`. A Form component then renders the schema.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/versioned_docs/version-4.2.3/usage/dependencies.md#_snippet_0

LANGUAGE: jsx
CODE:

```
const schema = {
  "type": "object",

  "properties": {
    "name": { "type": "string" },
    "credit_card": { "type": "number" },
    "billing_address": { "type": "string" }
  },

  "required": ["name"],

  "dependencies": {
    "credit_card": ["billing_address"]
  }
};

render((
  <Form schema={schema} />
), document.getElementById("app"));
```

---

TITLE: Defining Dynamic Schema Dependency with oneOf in React JSON Schema Form (JSX)
DESCRIPTION: This code snippet demonstrates a dynamic schema dependency using `oneOf` in react-jsonschema-form. Based on the user's answer to "Do you have any pets?", different questions are dynamically displayed. The `dependencies` keyword, coupled with `oneOf`, allows for defining multiple schema variations. The Form component renders the schema.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/versioned_docs/version-4.2.3/usage/dependencies.md#_snippet_3

LANGUAGE: jsx
CODE:

```
const schema = {
  "title": "Person",
  "type": "object",
  "properties": {
    "Do you have any pets?": {
      "type": "string",
      "enum": [
        "No",
        "Yes: One",
        "Yes: More than one"
      ],
      "default": "No"
    }
  },
  "required": [
    "Do you have any pets?"
  ],
  "dependencies": {
    "Do you have any pets?": {
      "oneOf": [
        {
          "properties": {
            "Do you have any pets?": {
              "enum": [
                "No"
              ]
            }
          }
        },
        {
          "properties": {
            "Do you have any pets?": {
              "enum": [
                "Yes: One"
              ]
            },
            "How old is your pet?": {
              "type": "number"
            }
          },
          "required": [
            "How old is your pet?"
          ]
        },
        {
          "properties": {
            "Do you have any pets?": {
              "enum": [
                "Yes: More than one"
              ]
            },
            "Do you want to get rid of any?": {
              "type": "boolean"
            }
          },
          "required": [
            "Do you want to get rid of any?"
          ]
        }
      ]
    }
  }
};

render((
  <Form schema={schema} />
), document.getElementById("app"));
```

---

TITLE: Customizing FieldErrorTemplate in React JSON Schema Form (TSX)
DESCRIPTION: This snippet demonstrates how to customize the rendering of field errors in react-jsonschema-form using the FieldErrorTemplate. It overrides the default error display with a details/summary element. It depends on @rjsf/utils and @rjsf/validator-ajv8. The output is a custom error display.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/advanced-customization/custom-templates.md#_snippet_17

LANGUAGE: tsx
CODE:

```
import { FieldErrorProps, RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'string',
  title: 'My input',
  description: 'input description',
};

function FieldErrorTemplate(props: FieldErrorProps) {
  const { errors } = props;
  return (
    <details id={id}>
      <summary>Errors</summary>
      <ul>
        {errors.map((error: string, i: number) => {
          return (
            <li key={i} className='error'>
              {error.stack}
            </li>
          );
        })}
      </ul>
    </details>
  );
}

render(
  <Form schema={schema} validator={validator} templates={{ FieldErrorTemplate }} />,
  document.getElementById('app')
);
```

---

TITLE: Defining Dynamic Schema Dependency with `oneOf` in react-jsonschema-form (TSX)
DESCRIPTION: This code snippet demonstrates how to create dynamic questions in react-jsonschema-form based on the answer to a previous question using the `oneOf` keyword in the `dependencies` section. It presents follow-up questions based on the user's answer to the question, 'Do you have any pets?'. The code imports necessary modules, defines a schema, and renders the form using the schema and validator.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/json-schema/dependencies.md#_snippet_3

LANGUAGE: tsx
CODE:

```
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  title: 'Person',
  type: 'object',
  properties: {
    'Do you have any pets?': {
      type: 'string',
      enum: ['No', 'Yes: One', 'Yes: More than one'],
      default: 'No',
    },
  },
  required: ['Do you have any pets?'],
  dependencies: {
    'Do you have any pets?': {
      oneOf: [
        {
          properties: {
            'Do you have any pets?': {
              enum: ['No'],
            },
          },
        },
        {
          properties: {
            'Do you have any pets?': {
              enum: ['Yes: One'],
            },
            'How old is your pet?': {
              type: 'number',
            },
          },
          required: ['How old is your pet?'],
        },
        {
          properties: {
            'Do you have any pets?': {
              enum: ['Yes: More than one'],
            },
            'Do you want to get rid of any?': {
              type: 'boolean',
            },
          },
          required: ['Do you want to get rid of any?'],
        },
      ],
    },
  },
};

render(<Form schema={schema} validator={validator} />, document.getElementById('app'));
```

---

TITLE: Setting Field Title in RJSF
DESCRIPTION: This code snippet demonstrates how to change a field's title in react-jsonschema-form (RJSF) using the `ui:title` directive in the uiSchema. The `ui:widget` is set to password, and the title is customized to "Your password".
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/api-reference/uiSchema.md#_snippet_21

LANGUAGE: tsx
CODE:

```
import { RJSFSchema, UiSchema } from '@rjsf/utils';

const schema: RJSFSchema = { type: 'string' };
const uiSchema: UiSchema = {
  'ui:widget': 'password',
  'ui:title': 'Your password',
};

```

---

TITLE: Creating a Reusable Form Component with Custom Fields/Widgets - TSX
DESCRIPTION: This code shows how to create a reusable form component in React JSON Schema Form (RJSF) with custom fields and widgets. It defines a `MyForm` component that accepts `FormProps` and renders an RJSF `Form` component. The custom fields and widgets (`customFields` and `customWidgets` respectively) are passed to the `fields` and `widgets` props of the `Form` component, allowing for consistent use of these custom components across multiple forms.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/advanced-customization/custom-widgets-fields.md#_snippet_1

LANGUAGE: tsx
CODE:

```
import { RegistryFieldsType, RegistryWidgetsType } from '@rjsf/utils';
import { FormProps } from '@rjsf/core';

const customFields: RegistryFieldsType = { StringField: CustomString };
const customWidgets: RegistryWidgetsType = { CheckboxWidget: CustomCheckbox };

function MyForm(props: FormProps) {
  return <Form fields={customFields} widgets={customWidgets} {...props} />;
}

```

---

TITLE: Specifying Required Object Properties in ReactJS
DESCRIPTION: This code snippet extends the previous example by specifying the "name" property as required. This will cause the React JSON Schema Form to enforce that the "name" field is filled out before the form can be submitted.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/versioned_docs/version-4.2.3/usage/objects.md#_snippet_1

LANGUAGE: jsx
CODE:

```
const schema = {
  "title": "My title",
  "description": "My description",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    }
  },
  "required": ["name"]
};

render((
  <Form schema={schema} />
), document.getElementById("app"));
```

---

TITLE: Using Custom Templates Per-Field in RJSF
DESCRIPTION: This example demonstrates how to override a template, specifically the `ArrayFieldTemplate`, on a per-field basis in react-jsonschema-form using the `uiSchema`. The `ui:ArrayFieldTemplate` property is used to specify the custom template. `MyArrayTemplate` is a placeholder for the custom template implementation.
SOURCE: https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/advanced-customization/custom-templates.md#_snippet_4

LANGUAGE: json
CODE:

```
"ui:ArrayFieldTemplate": MyArrayTemplate
```
