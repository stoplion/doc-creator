import { formatDistanceToNow } from "date-fns"
import { Calendar, FileText, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { DocumentDropdownMenu } from "../../components/misc/DocumentDropdownMenu"
import { NavbarIndex } from "../../components/navbar"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { createClient } from "../../utils/supabase/server"

export default async function DocumentsPage() {
  const supabase = await createClient()

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    notFound()
  }

  // Fetch user's documents
  const { data: documents, error: documentsError } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })

  if (documentsError) {
    console.error("Error fetching documents:", documentsError)
    notFound()
  }

  // Calculate stats
  const totalDocuments = documents?.length || 0
  const updatedThisWeek =
    documents?.filter((document) => {
      const updatedAt = new Date(document.updated_at)
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return updatedAt >= oneWeekAgo
    }).length || 0
  const uniqueTemplates = new Set(documents?.map((d) => d.template) || []).size

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <NavbarIndex />
      <div className="container mx-auto px-4 py-8">
        {/* Header + Create Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Documents</h1>
            <p className="text-zinc-400 text-lg">
              Manage and organize your professional documents
            </p>
          </div>
          <Link href="/documents/new">
            <Button
              variant="default"
              size="lg"
              className="bg-zinc-800 text-white hover:bg-zinc-700 font-bold px-6 py-3 text-lg flex items-center gap-2 border border-zinc-700 shadow-md"
              aria-label="Create New Document"
            >
              Create <span className="text-2xl leading-none">+</span>
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {totalDocuments}
                  </p>
                  <p className="text-zinc-400 text-sm">Total Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-800 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {updatedThisWeek}
                  </p>
                  <p className="text-zinc-400 text-sm">Updated This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-800 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {uniqueTemplates}
                  </p>
                  <p className="text-zinc-400 text-sm">Templates Used</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {documents?.map((document) => (
            <Link
              key={document.id}
              href={`/documents/${document.id}`}
              className="h-full"
            >
              <Card className="bg-zinc-800 border-zinc-700 hover:bg-zinc-750 transition-colors group h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white truncate">
                        {document.title}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1">
                        {document.template} Template
                      </p>
                    </div>
                    <DocumentDropdownMenu document={document} />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Document Preview */}
                  <div className="aspect-[3/4] bg-zinc-700 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={document.preview || "/placeholder.svg"}
                      alt={`${document.title} preview`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Last Modified */}
                  <div className="flex items-center text-sm text-zinc-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      Modified{" "}
                      {formatDistanceToNow(new Date(document.updated_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Add New Document Card */}
          <Link href="/documents/new" className="h-full">
            <Card className="bg-zinc-800 border-zinc-700 border-dashed hover:bg-zinc-750 transition-colors cursor-pointer group h-full flex flex-col">
              <CardContent className="flex flex-col items-center justify-center h-full text-zinc-400 group-hover:text-white">
                <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center mb-4 group-hover:bg-zinc-600">
                  <span className="text-2xl">+</span>
                </div>
                <h3 className="font-semibold mb-2">Create New Document</h3>
                <p className="text-sm text-center">
                  Start building your professional document
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
