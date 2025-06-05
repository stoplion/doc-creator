export const testSchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/basics",
      options: {
        elementLabelProp: "basic information",
        detail: {
          type: "VerticalLayout",
          elements: [
            {
              type: "Control",
              scope: "#/basics/name",
            },
            {
              type: "Control",
              scope: "#/basics/label",
            },
          ],
        },
      },
    },
  ],
}
