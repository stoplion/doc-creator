"use server"

import { redirect } from "next/navigation"
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

  redirect("/resumes")
}

export async function cloneResumeAction(resumeId: number) {
  const supabase = await createClient()
  console.log("Starting resume clone for ID:", resumeId)

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    console.error("Clone failed: User not authenticated")
    throw new Error("User not authenticated")
  }
  console.log("Cloning resume for user:", user.id)

  const { data: originalResume, error: fetchError } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", resumeId)
    .single()

  if (fetchError || !originalResume) {
    console.error("Clone failed: Error fetching original resume:", fetchError)
    throw fetchError || new Error("Resume not found")
  }
  console.log("Successfully fetched original resume:", {
    id: originalResume.id,
    title: originalResume.title,
    template: originalResume.template,
  })

  // Create a new object without id and timestamps
  const { id, created_at, updated_at, ...resumeToClone } = originalResume

  const { error: insertError } = await supabase.from("resumes").insert({
    ...resumeToClone,
    title: `${originalResume.title} (Copy)`,
    user_id: user.id,
  })

  if (insertError) {
    console.error("Clone failed: Error inserting cloned resume:", insertError)
    throw insertError
  }

  console.log("Successfully cloned resume:", {
    originalId: resumeId,
    newTitle: `${originalResume.title} (Copy)`,
    userId: user.id,
  })

  redirect("/resumes")
}
