"use client"

import { User as SupabaseUser } from "@supabase/supabase-js"
import { Home, Loader2, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { updateDocumentAction } from "../../app/actions/documentActions"
import { Tables } from "../../database.types"
import { createClient } from "../../utils/supabase/client"
import SwitchGroup from "../misc/SwitchGroup"

export function NavbarEditorLeft({
  document,
  selectedTab,
  setSelectedTab,
  hasUnsavedChanges,
  onSaveComplete,
}: {
  document: Tables<"documents">
  selectedTab: string
  setSelectedTab: (tab: string) => void
  hasUnsavedChanges: boolean
  onSaveComplete: () => void
}) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isSaving, setIsSaving] = useState(false)
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
            onClick={() => router.push("/documents")}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 rounded text-sm text-white transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </button>
        </div>
        {/* Center SwitchGroup */}
        <div className="flex-1 flex justify-center">
          <SwitchGroup
            options={["form", "upload", "json", "yaml", "jsonschema"]}
            value={selectedTab}
            onChange={setSelectedTab}
          />
        </div>
        {/* Right Side */}
        <button
          onClick={async () => {
            if (!hasUnsavedChanges || isSaving) return
            setIsSaving(true)
            try {
              await updateDocumentAction(document.id, { data: document.data })
              onSaveComplete()
            } finally {
              setIsSaving(false)
            }
          }}
          className={`relative px-3 py-1.5 rounded text-sm transition-colors min-w-[88px] justify-center ${
            hasUnsavedChanges && !isSaving
              ? "bg-zinc-700 hover:bg-zinc-600 text-white"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
          disabled={!hasUnsavedChanges || isSaving}
        >
          <span className={isSaving ? "invisible" : "visible"}>
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              <span>Save</span>
            </span>
          </span>
          {isSaving && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </button>
      </div>
    </nav>
  )
}
