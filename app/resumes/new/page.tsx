import { notFound, redirect } from "next/navigation"
import { defaultResumeData } from "../../../utils/default-data"
import { createClient } from "../../../utils/supabase/server"

export default async function NewResumePage() {
  const supabase = await createClient()

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    notFound()
  }

  // Create a new resume with default data
  const { data: resume, error: createError } = await supabase
    .from("resumes")
    .insert({
      title: "Untitled Resume",
      data: defaultResumeData,
      template: "default",
      user_id: user.id,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (createError) {
    console.error("Error creating resume:", createError)
    notFound()
  }

  // Redirect to the edit page for the new resume
  redirect(`/resumes/${resume.id}`)
}
