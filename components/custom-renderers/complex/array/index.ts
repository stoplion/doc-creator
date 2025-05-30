import {
  isObjectArrayWithNesting,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import ArrayControlRenderer, { ArrayControl } from "./ArrayControlRenderer"

export { ArrayControl, ArrayControlRenderer }

export const arrayControlTester: RankedTester = rankWith(
  4,
  isObjectArrayWithNesting
)

export default ArrayControlRenderer
