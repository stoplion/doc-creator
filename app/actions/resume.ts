"use server"

import { createClient } from "../../utils/supabase/server"

// Resume Data Operations
export async function updateResumeAction(resumeId: number, data: any) {
  const supabase = await createClient()

  // Log the incoming data and resumeId
  console.log("Updating resumeId:", resumeId)
  console.log("Updating resume with:", JSON.stringify(data, null, 2))

  // Log the current authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.log("Error fetching user:", userError)
  } else {
    console.log("Current user UID:", userData?.user?.id)
  }

  // Fetch the target row to log its user_id
  const { data: targetRows, error: fetchError } = await supabase
    .from("resumes")
    .select("id, user_id, title")
    .eq("id", resumeId)
  if (fetchError) {
    console.log("Error fetching target row:", fetchError)
  } else {
    console.log("Target row(s):", JSON.stringify(targetRows, null, 2))
  }

  const { data: updatedData, error } = await supabase
    .from("resumes")
    .update(data)
    .eq("id", resumeId)
    .select()

  console.log("Updated data:", JSON.stringify(updatedData, null, 2))
  if (error) {
    console.log("Supabase error:", error)
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
