import { describe, it, expect } from "vitest"

import { cn } from "../lib/utils"

describe("cn utility", () => {
  it("merges class names without duplication", () => {
    const classes = cn("text-red-500", "bg-blue-500")
    expect(classes).toBe("text-red-500 bg-blue-500")
  })

  it("deduplicates conflicting classes, keeping the latter", () => {
    const classes = cn("text-red-500", "text-blue-500")
    expect(classes).toBe("text-blue-500")
  })
})