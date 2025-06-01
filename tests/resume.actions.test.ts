import { describe, it, expect, vi, afterEach } from "vitest"

// Mock the Supabase client returned by `createClient`
const supabaseMock: any = {
  auth: {
    getUser: vi.fn(),
  },
  from: vi.fn(),
}

vi.mock("../utils/supabase/server", () => {
  return {
    createClient: () => supabaseMock,
  }
})

// Mock `next/navigation` to avoid issues when server actions import it
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}))

import { updateResumeAction } from "../app/actions/resume"

afterEach(() => {
  vi.clearAllMocks()
})

describe("updateResumeAction", () => {
  it("updates a resume row and returns a success flag and the updated data", async () => {
    const resumeId = 1
    const payload = {
      title: "My updated resume",
      template: "modern",
    }

    // Mock authenticated user
    supabaseMock.auth.getUser.mockResolvedValue({
      data: { user: { id: "user123" } },
      error: null,
    })

    // Build chainable mocks for the Supabase query
    const selectMock = vi
      .fn()
      .mockResolvedValue({ data: [{ id: resumeId, ...payload }], error: null })
    const eqMock = vi.fn().mockReturnValue({ select: selectMock })
    const updateMock = vi.fn().mockReturnValue({ eq: eqMock })

    supabaseMock.from.mockReturnValue({ update: updateMock })

    // Run the action
    const result = await updateResumeAction(resumeId, payload)

    // Verify query building
    expect(supabaseMock.from).toHaveBeenCalledWith("resumes")
    expect(updateMock).toHaveBeenCalledWith(payload)
    expect(eqMock).toHaveBeenCalledWith("id", resumeId)
    expect(selectMock).toHaveBeenCalled()

    // Verify the returned payload
    expect(result).toEqual({ success: true, data: [{ id: resumeId, ...payload }] })
  })
})