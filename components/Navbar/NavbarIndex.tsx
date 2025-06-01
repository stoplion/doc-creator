"use client"

import { User as SupabaseUser } from "@supabase/supabase-js"
import { LogOut, User } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "../../utils/supabase/client"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export function NavbarIndex() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

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
