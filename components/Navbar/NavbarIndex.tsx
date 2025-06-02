"use client"

import { User as SupabaseUser } from "@supabase/supabase-js"
import { useCallback, useEffect, useMemo, useState } from "react"
import { createClient } from "../../utils/supabase/client"
import { UserProfileMenu } from "./NavbarEditorRight"

export function NavbarIndex() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase])

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }, [supabase])

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-4 py-3">
      <div className="mx-auto flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="text-xl font-bold text-white">Doc Builder</div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2">
          <UserProfileMenu user={user} onSignOut={handleSignOut} />
        </div>
      </div>
    </nav>
  )
}
