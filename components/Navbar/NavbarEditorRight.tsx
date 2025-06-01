"use client"

import { User as SupabaseUser } from "@supabase/supabase-js"
import {
  Download,
  LogOut,
  //Settings,
  User,
} from "lucide-react"
import { useEffect, useState } from "react"
import { updateDocumentAction } from "../../app/actions/documentActions"
import { Tables } from "../../database.types"
import { createClient } from "../../utils/supabase/client"
import { DocumentDropdownMenu } from "../misc/DocumentDropdownMenu"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export function NavbarEditorRight({
  document,
  onTitleChange,
}: {
  document: Tables<"documents">
  onTitleChange?: (newTitle: string) => void
}) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const supabase = createClient()
  const [isRenameOpen, setIsRenameOpen] = useState(false)
  const [newTitle, setNewTitle] = useState(document.title || "")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-4 py-3">
      <div className="mx-auto flex items-center justify-between">
        {/* Left Side */}
        <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
          <DialogTrigger asChild>
            <div
              className="text-sm text-white hover:underline cursor-pointer"
              title="Rename Document"
              onClick={() => setNewTitle(document.title || "")}
            >
              {document.title}
            </div>
          </DialogTrigger>

          <DialogContent className="bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-white">Rename Document</DialogTitle>
            </DialogHeader>
            <div className="pb-3">
              <input
                className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-zinc-700 text-base text-zinc-300 placeholder:text-zinc-500"
                value={newTitle || ""}
                placeholder="Enter new title"
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
                disabled={loading}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  disabled={loading}
                  className="bg-transparent border border-zinc-700 text-white hover:bg-zinc-800/60"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="default"
                className="bg-emerald-700 text-white hover:bg-emerald-600"
                disabled={
                  loading || !newTitle.trim() || newTitle === document.title
                }
                onClick={async () => {
                  setLoading(true)
                  try {
                    await updateDocumentAction(document.id, { title: newTitle })
                    onTitleChange?.(newTitle)
                    setIsRenameOpen(false)
                  } finally {
                    setLoading(false)
                  }
                }}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Right Side */}
        <div className="flex items-center space-x-2">
          {/* More Options */}
          <DocumentDropdownMenu document={document} exclude={["edit"]} />

          {/* Download PDF */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-white hover:text-zinc-300 hover:bg-zinc-800"
            title="Download PDF"
          >
            <Download className="h-6 w-6" strokeWidth={2.5} />
            <span className="sr-only">Download PDF</span>
          </Button>

          {/* Settings */}
          {/* <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-white hover:text-zinc-300 hover:bg-zinc-800"
            title="Settings"
          >
            <Settings className="h-6 w-6" strokeWidth={2.5} />
            <span className="sr-only">Settings</span>
          </Button> */}

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full"
                title="User Profile"
              >
                <div className="h-6 w-6 rounded-full bg-zinc-700 flex items-center justify-center">
                  <User className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <span className="sr-only">User Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-zinc-800 border-zinc-700 w-56"
            >
              {/* User Info Section */}
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-white">
                  {user?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-xs text-zinc-400">
                  {user?.email || "Loading..."}
                </p>
              </div>
              <DropdownMenuSeparator className="bg-zinc-700" />

              {/* Sign Out */}
              <DropdownMenuItem
                className="text-white hover:bg-zinc-700 focus:bg-zinc-700 cursor-pointer"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
