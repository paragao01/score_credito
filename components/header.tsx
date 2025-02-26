"use client"

import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const showAvatar = pathname === "/consulta" || pathname === "/relatorio"

  return (
    <header className="absolute top-0 right-0 p-4 flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="rounded-full h-10 w-10 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20"
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5 text-white" />
        ) : (
          <Sun className="h-5 w-5 text-white" />
        )}
      </Button>
    </header>
  )
} 