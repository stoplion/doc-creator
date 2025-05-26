"use server"

import { createClient } from "../../utils/supabase/server"

// Resume Data Operations
export async function updateResume(resumeId: number, data: any) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("resumes")
    .update({ data })
    .eq("id", resumeId)

  if (error) {
    throw error
  }

  return { success: true }
}

// Resume Management Operations
export async function deleteResume(resumeId: number) {
  const supabase = await createClient()

  const { error } = await supabase.from("resumes").delete().eq("id", resumeId)

  if (error) {
    throw error
  }

  return { success: true }
}

export async function cloneResume(resumeId: number) {
  const supabase = await createClient()

  const { data: originalResume, error: fetchError } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", resumeId)
    .single()

  if (fetchError || !originalResume) {
    throw fetchError || new Error("Resume not found")
  }

  const { error: insertError } = await supabase.from("resumes").insert({
    title: `${originalResume.title} (Copy)`,
    data: originalResume.data,
    template: originalResume.template,
    user_id: originalResume.user_id,
  })

  if (insertError) {
    throw insertError
  }

  return { success: true }
}
