"use client"

import { Calendar, FileText, MoreHorizontal, User } from "lucide-react"
import Link from "next/link"
import { Button } from "../../src/components/ui/button"
import { Card, CardContent, CardHeader } from "../../src/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../src/components/ui/dropdown-menu"

// Sample resume data
const resumes = [
  {
    id: 1,
    title: "Software Engineer Resume",
    lastModified: "2 days ago",
    template: "Modern",
    preview: "/placeholder.svg?height=200&width=150&text=Resume+Preview",
  },
  {
    id: 2,
    title: "Product Manager CV",
    lastModified: "1 week ago",
    template: "Professional",
    preview: "/placeholder.svg?height=200&width=150&text=Resume+Preview",
  },
  {
    id: 3,
    title: "UX Designer Portfolio",
    lastModified: "3 days ago",
    template: "Creative",
    preview: "/placeholder.svg?height=200&width=150&text=Resume+Preview",
  },
  {
    id: 4,
    title: "Marketing Specialist Resume",
    lastModified: "5 days ago",
    template: "Clean",
    preview: "/placeholder.svg?height=200&width=150&text=Resume+Preview",
  },
  {
    id: 5,
    title: "Data Scientist CV",
    lastModified: "1 day ago",
    template: "Technical",
    preview: "/placeholder.svg?height=200&width=150&text=Resume+Preview",
  },
  {
    id: 6,
    title: "Frontend Developer Resume",
    lastModified: "4 days ago",
    template: "Modern",
    preview: "/placeholder.svg?height=200&width=150&text=Resume+Preview",
  },
]

export default function ResumesPage() {
  const handleEdit = (id: number) => {
    console.log("Edit resume:", id)
  }

  const handleClone = (id: number) => {
    console.log("Clone resume:", id)
  }

  const handleDelete = (id: number) => {
    console.log("Delete resume:", id)
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Resumes</h1>
          <p className="text-zinc-400 text-lg">
            Manage and organize your professional documents
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {resumes.length}
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
                  <p className="text-2xl font-bold text-white">3</p>
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
                  <p className="text-2xl font-bold text-white">5</p>
                  <p className="text-zinc-400 text-sm">Templates Used</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resume Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {resumes.map((resume) => (
            <Link key={resume.id} href={`/resumes/${resume.id}`}>
              <Card className="bg-zinc-800 border-zinc-700 hover:bg-zinc-750 transition-colors group">
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
                        <DropdownMenuItem
                          onClick={() => handleEdit(resume.id)}
                          className="text-white hover:bg-zinc-700 focus:bg-zinc-700"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleClone(resume.id)}
                          className="text-white hover:bg-zinc-700 focus:bg-zinc-700"
                        >
                          Clone
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(resume.id)}
                          className="text-red-400 hover:bg-zinc-700 focus:bg-zinc-700 hover:text-red-300"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                    <span>Modified {resume.lastModified}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Add New Resume Card */}
          <Card className="bg-zinc-800 border-zinc-700 border-dashed hover:bg-zinc-750 transition-colors cursor-pointer group">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px] text-zinc-400 group-hover:text-white">
              <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center mb-4 group-hover:bg-zinc-600">
                <span className="text-2xl">+</span>
              </div>
              <h3 className="font-semibold mb-2">Create New Resume</h3>
              <p className="text-sm text-center">
                Start building your professional resume
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
