export * from "./complex"

import {
  BooleanCell,
  DateCell,
  DateTimeCell,
  EnumCell,
  IntegerCell,
  NumberCell,
  NumberFormatCell,
  OneOfEnumCell,
  SliderCell,
  TextAreaCell,
  TextCell,
  TimeCell,
  booleanCellTester,
  dateCellTester,
  dateTimeCellTester,
  enumCellTester,
  integerCellTester,
  numberCellTester,
  numberFormatCellTester,
  oneOfEnumCellTester,
  sliderCellTester,
  textAreaCellTester,
  textCellTester,
  timeCellTester,
} from "./cell"
import {
  CategorizationRenderer,
  LabelRenderer,
  TableArrayControl,
  categorizationTester,
  labelRendererTester,
  tableArrayControlTester,
} from "./complex"
import { AllOfRenderer, allOfControlTester } from "./complex/AllOfRenderer"
import { ArrayControlRenderer, arrayControlTester } from "./complex/array"
import { ObjectRenderer, objectControlTester } from "./complex/ObjectRenderer"
import {
  OneOfRadioGroupControl,
  RadioGroupControl,
  oneOfRadioGroupControlTester,
  radioGroupControlTester,
} from "./controls"
import ButtonControl from "./controls/ButtonControl"
import { buttonControlTester } from "./controls/ButtonControlTester"
import { TextInputControl } from "./controls/TextInputControl"
import { textInputControlTester } from "./controls/TextInputControlTester"
import {
  GroupLayoutRenderer,
  HorizontalLayoutRenderer,
  VerticalLayoutRenderer,
  groupTester,
  horizontalLayoutTester,
  verticalLayoutTester,
} from "./layouts"

export interface CustomRendererProps {
  classNames?: {
    wrapper?: string
    label?: string
    description?: string
    validation?: string
    validationError?: string
  }
}

export const renderers = [
  { tester: textInputControlTester, renderer: TextInputControl },
  { tester: radioGroupControlTester, renderer: RadioGroupControl },
  { tester: oneOfRadioGroupControlTester, renderer: OneOfRadioGroupControl },
  { tester: arrayControlTester, renderer: ArrayControlRenderer },
  { tester: labelRendererTester, renderer: LabelRenderer },
  { tester: categorizationTester, renderer: CategorizationRenderer },
  { tester: tableArrayControlTester, renderer: TableArrayControl },
  { tester: objectControlTester, renderer: ObjectRenderer },
  { tester: groupTester, renderer: GroupLayoutRenderer },
  { tester: verticalLayoutTester, renderer: VerticalLayoutRenderer },
  { tester: horizontalLayoutTester, renderer: HorizontalLayoutRenderer },
  { tester: buttonControlTester, renderer: ButtonControl },
  { tester: allOfControlTester, renderer: AllOfRenderer },
]

export const cells = [
  { tester: booleanCellTester, cell: BooleanCell },
  { tester: dateCellTester, cell: DateCell },
  { tester: dateTimeCellTester, cell: DateTimeCell },
  { tester: enumCellTester, cell: EnumCell },
  { tester: integerCellTester, cell: IntegerCell },
  { tester: numberCellTester, cell: NumberCell },
  { tester: numberFormatCellTester, cell: NumberFormatCell },
  { tester: oneOfEnumCellTester, cell: OneOfEnumCell },
  { tester: sliderCellTester, cell: SliderCell },
  { tester: textAreaCellTester, cell: TextAreaCell },
  { tester: textCellTester, cell: TextCell },
  { tester: timeCellTester, cell: TimeCell },
]
