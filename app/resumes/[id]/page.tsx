import { notFound, redirect } from "next/navigation"
import { ResumeEditorLayout } from "../../../components/ResumeEditorLayout"
import { createClient } from "../../../utils/supabase/server"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ResumePage({ params }: PageProps) {
  const { id } = await params
  const resumeId = parseInt(id)

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch the resume data
  const { data: resume, error: resumeError } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", resumeId)
    .eq("user_id", user.id)
    .single()

  if (resumeError || !resume) {
    notFound()
  }

  return <ResumeEditorLayout resume={resume} resumeId={resume.id} />
}
