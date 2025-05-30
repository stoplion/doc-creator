import {
  isObjectArrayControl,
  isPrimitiveArrayControl,
  or,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import ArrayControlRenderer, { ArrayControl } from "./ArrayControlRenderer"

export { ArrayControl, ArrayControlRenderer }

export const arrayControlTester: RankedTester = rankWith(
  3,
  or(isObjectArrayControl, isPrimitiveArrayControl)
)

export default ArrayControlRenderer
