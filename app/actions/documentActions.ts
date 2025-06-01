"use server"

import { redirect } from "next/navigation"
import { defaultResumeData } from "../../utils/default-data"
import { createClient } from "../../utils/supabase/server"

// Document Data Operations
export async function updateDocumentAction(documentId: number, data: any) {
  const supabase = await createClient()

  // Log the incoming data and documentId
  console.log("Updating documentId:", documentId)
  console.log("Updating document with:", JSON.stringify(data, null, 2))

  // Log the current authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.log("Error fetching user:", userError)
  } else {
    console.log("Current user UID:", userData?.user?.id)
  }

  // Fetch the target row to log its user_id
  const { data: targetRows, error: fetchError } = await supabase
    .from("documents")
    .select("id, user_id, title")
    .eq("id", documentId)
  if (fetchError) {
    console.log("Error fetching target row:", fetchError)
  } else {
    console.log("Target row(s):", JSON.stringify(targetRows, null, 2))
  }

  const { data: updatedData, error } = await supabase
    .from("documents")
    .update(data)
    .eq("id", documentId)
    .select()

  console.log("Updated data:", JSON.stringify(updatedData, null, 2))
  if (error) {
    console.log("Supabase error:", error)
    throw error
  }

  return { success: true, data: updatedData }
}

// Document Management Operations
export async function deleteDocumentAction(documentId: number) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", documentId)

  if (error) {
    throw error
  }

  redirect("/documents")
}

export async function cloneDocumentAction(documentId: number) {
  const supabase = await createClient()
  console.log("Starting document clone for ID:", documentId)

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    console.error("Clone failed: User not authenticated")
    throw new Error("User not authenticated")
  }
  console.log("Cloning document for user:", user.id)

  const { data: originalDocument, error: fetchError } = await supabase
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .single()

  if (fetchError || !originalDocument) {
    console.error("Clone failed: Error fetching original document:", fetchError)
    throw fetchError || new Error("Document not found")
  }
  console.log("Successfully fetched original document:", {
    id: originalDocument.id,
    title: originalDocument.title,
    template: originalDocument.template,
  })

  // Create a new object without id and timestamps
  const { id, created_at, updated_at, ...documentToClone } = originalDocument

  const { error: insertError } = await supabase.from("documents").insert({
    ...documentToClone,
    title: `${originalDocument.title} (Copy)`,
    user_id: user.id,
  })

  if (insertError) {
    console.error("Clone failed: Error inserting cloned document:", insertError)
    throw insertError
  }

  console.log("Successfully cloned document:", {
    originalId: documentId,
    newTitle: `${originalDocument.title} (Copy)`,
    userId: user.id,
  })

  redirect("/documents")
}

export async function createDocumentAction(docType: { name: string }) {
  const supabase = await createClient()

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error("User not authenticated")
  }

  // Create a new document with the selected type
  const { data: document, error: createError } = await supabase
    .from("documents")
    .insert({
      title: `Untitled ${docType.name}`,
      data: defaultResumeData,
      template: "default",
      user_id: user.id,
      type: docType.name.toLowerCase().replace(/\s+/g, "_"),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (createError) {
    console.error("Error creating document:", createError)
    throw createError
  }

  return document
}
