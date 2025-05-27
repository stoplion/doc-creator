"use server"

import { Tables } from "../../database.types"
import { createClient } from "../../utils/supabase/client"

type ResumeUpdate = Partial<
  Pick<Tables<"resumes">, "data" | "title" | "template" | "preview">
>

// Resume Data Operations
export async function updateResumeAction(resumeId: number, data: any) {
  const supabase = await createClient()

  debugger
  const { data: updatedData, error } = await supabase
    .from("resumes")
    .update({ data })
    .eq("id", resumeId)
    .select()

  console.log("Updated data:", updatedData)
  debugger

  if (error) {
    debugger
    throw error
  }

  return { success: true, data: updatedData }
}

// Resume Management Operations
export async function deleteResumeAction(resumeId: number) {
  const supabase = await createClient()

  const { error } = await supabase.from("resumes").delete().eq("id", resumeId)

  if (error) {
    throw error
  }

  return { success: true }
}

export async function cloneResumeAction(resumeId: number) {
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
