import { describe, it, expect, vi, afterEach } from "vitest"

// Mock Supabase client
const supabaseMock: any = {
  auth: {
    signInWithPassword: vi.fn(),
  },
}

vi.mock("../utils/supabase/server", () => {
  return {
    createClient: () => supabaseMock,
  }
})

// Mock next/navigation functions used in the action
const redirectMock = vi.fn()
vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}))

import { login } from "../app/actions/auth"

afterEach(() => {
  vi.clearAllMocks()
})

describe("login action", () => {
  it("signs the user in and redirects to the homepage on success", async () => {
    // Prepare fake form data
    const formData = new FormData()
    formData.set("email", "test@example.com")
    formData.set("password", "secret")

    // Mock the Supabase response
    supabaseMock.auth.signInWithPassword.mockResolvedValue({ error: null })

    await login(formData)

    expect(supabaseMock.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "secret",
    })

    expect(redirectMock).toHaveBeenCalledWith("/")
  })
})