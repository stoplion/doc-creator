export function safeParse<T = any>(
  value: string | object
): { success: boolean; data?: T; error?: any } {
  if (typeof value === "object" && value !== null) {
    return { success: true, data: value as T }
  }
  try {
    const parsed = JSON.parse(value as string)
    return { success: true, data: parsed }
  } catch (error) {
    return { success: false, error }
  }
}
