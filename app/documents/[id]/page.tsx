import { notFound, redirect } from "next/navigation"
import { DocumentEditorLayout } from "../../../components/DocumentEditorLayout"
import { createClient } from "../../../utils/supabase/server"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function DocumentPage({ params }: PageProps) {
  const { id } = await params
  const documentId = parseInt(id)

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch the document data
  const { data: document, error: documentError } = await supabase
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .eq("user_id", user.id)
    .single()

  if (documentError || !document) {
    notFound()
  }

  return <DocumentEditorLayout document={document} documentId={document.id} />
}
