import { formatDistanceToNow } from "date-fns"
import { Calendar, FileText, MoreHorizontal, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { NavbarIndex } from "../../components/Navbar"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader } from "../../components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { createClient } from "../../utils/supabase/server"
import { cloneResumeAction, deleteResumeAction } from "../actions/resume"

export default async function ResumesPage() {
  const supabase = await createClient()

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    notFound()
  }

  // Fetch user's resumes
  const { data: resumes, error: resumesError } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })

  if (resumesError) {
    console.error("Error fetching resumes:", resumesError)
    notFound()
  }

  // Calculate stats
  const totalResumes = resumes?.length || 0
  const updatedThisWeek =
    resumes?.filter((resume) => {
      const updatedAt = new Date(resume.updated_at)
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return updatedAt >= oneWeekAgo
    }).length || 0
  const uniqueTemplates = new Set(resumes?.map((r) => r.template) || []).size

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <NavbarIndex />
      <div className="container mx-auto px-4 py-8">
        {/* Header + Create Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Resumes</h1>
            <p className="text-zinc-400 text-lg">
              Manage and organize your professional documents
            </p>
          </div>
          <Link href="/resumes/new">
            <Button
              variant="default"
              size="lg"
              className="bg-zinc-800 text-white hover:bg-zinc-700 font-bold px-6 py-3 text-lg flex items-center gap-2 border border-zinc-700 shadow-md"
              aria-label="Create New Resume"
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
                    {totalResumes}
                  </p>
                  <p className="text-zinc-400 text-sm">Total Resumes</p>
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

        {/* Resume Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {resumes?.map((resume) => (
            <Link
              key={resume.id}
              href={`/resumes/${resume.id}`}
              className="h-full"
            >
              <Card className="bg-zinc-800 border-zinc-700 hover:bg-zinc-750 transition-colors group h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white truncate">
                        {resume.title}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1">
                        {resume.template} Template
                      </p>
                    </div>
                    <form
                      action={async () => {
                        "use server"
                        const supabase = await createClient()
                        await supabase
                          .from("resumes")
                          .delete()
                          .eq("id", resume.id)
                      }}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-700"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-zinc-800 border-zinc-700"
                        >
                          <DropdownMenuItem asChild>
                            <Link href={`/resumes/${resume.id}`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <form
                              action={async () => {
                                await cloneResumeAction(resume.id)
                              }}
                            >
                              <button className="w-full text-left">
                                Clone
                              </button>
                            </form>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <form
                              action={async () => {
                                await deleteResumeAction(resume.id)
                              }}
                            >
                              <button
                                type="submit"
                                className="w-full text-left text-red-400 hover:text-red-300"
                              >
                                Delete
                              </button>
                            </form>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </form>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Resume Preview */}
                  <div className="aspect-[3/4] bg-zinc-700 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={resume.preview || "/placeholder.svg"}
                      alt={`${resume.title} preview`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Last Modified */}
                  <div className="flex items-center text-sm text-zinc-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      Modified{" "}
                      {formatDistanceToNow(new Date(resume.updated_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Add New Resume Card */}
          <Link href="/resumes/new" className="h-full">
            <Card className="bg-zinc-800 border-zinc-700 border-dashed hover:bg-zinc-750 transition-colors cursor-pointer group h-full flex flex-col">
              <CardContent className="flex flex-col items-center justify-center h-full text-zinc-400 group-hover:text-white">
                <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center mb-4 group-hover:bg-zinc-600">
                  <span className="text-2xl">+</span>
                </div>
                <h3 className="font-semibold mb-2">Create New Resume</h3>
                <p className="text-sm text-center">
                  Start building your professional resume
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
