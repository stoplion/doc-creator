"use client"

import { User as SupabaseUser } from "@supabase/supabase-js"
import { Home, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { updateResume } from "../../app/actions/resume"
import { Tables } from "../../database.types"
import { createClient } from "../../utils/supabase/client"

export function NavbarEditorLeft({ resume }: { resume: Tables<"resumes"> }) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-4 py-3">
      <div className="mx-auto flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <button
            onClick={() => router.push("/resumes")}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 rounded text-sm text-white transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </button>
        </div>

        {/* Right Side */}
        <button
          onClick={async () => {
            await updateResume(resume.id, resume.data)
          }}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 rounded text-sm text-white transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>Save</span>
        </button>
      </div>
    </nav>
  )
}
