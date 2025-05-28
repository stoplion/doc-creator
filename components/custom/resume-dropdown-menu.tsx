"use client"

import { Copy, MoreHorizontal, Pencil, Trash } from "lucide-react"
import Link from "next/link"
import { cloneResumeAction, deleteResumeAction } from "../../app/actions/resume"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface ResumeDropdownMenuProps {
  resume: {
    id: number
    title: string | null
  }
  exclude?: ("edit" | "clone" | "delete")[]
}

export function ResumeDropdownMenu({
  resume,
  exclude = [],
}: ResumeDropdownMenuProps) {
  return (
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
        className="bg-zinc-800 border-zinc-700 p-2"
      >
        {!exclude.includes("edit") && (
          <DropdownMenuItem asChild>
            <Link
              href={`/resumes/${resume.id}`}
              className="focus:bg-zinc-600/40"
            >
              <button className="w-full text-left text-white flex items-center">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </button>
            </Link>
          </DropdownMenuItem>
        )}
        {!exclude.includes("clone") && (
          <DropdownMenuItem asChild>
            <button
              className="w-full text-left text-white flex items-center focus:text-white focus:bg-zinc-600/40 group"
              onClick={async () => {
                await cloneResumeAction(resume.id)
              }}
            >
              <Copy className="h-4 w-4 mr-2" />
              Clone
            </button>
          </DropdownMenuItem>
        )}
        {!exclude.includes("delete") && (
          <DropdownMenuItem asChild>
            <button
              className="w-full text-left text-red-400 flex items-center focus:text-red-400 focus:bg-red-800/20 group"
              onClick={async () => {
                await deleteResumeAction(resume.id)
              }}
            >
              <Trash className="h-4 w-4 mr-2 text-red-400" />
              Delete
            </button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
