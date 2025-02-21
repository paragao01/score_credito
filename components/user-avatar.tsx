"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/providers/mock-auth-provider"
import { motion } from "framer-motion"

export function UserAvatar() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full h-10 w-10 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20"
          >
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="dark:bg-white/5 backdrop-blur-xl border-white/20">
          <DropdownMenuItem
            onClick={logout}
            className="cursor-pointer focus:bg-white/10"
          >
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
} 