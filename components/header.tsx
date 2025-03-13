"use client"

import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@/providers/mock-auth-provider"

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Mostrar avatar em todas as páginas se o usuário estiver logado
  const showAvatar = user !== null && user !== undefined
  
  const isValidPage = pathname !== undefined && pathname !== null

  // Determinar a cor do botão e fundo com base no tema
  const isConsultaOrRelatorio = pathname === "/consulta" || pathname === "/relatorio"
  const buttonBgClass = isConsultaOrRelatorio 
    ? "bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20" 
    : "bg-background border border-input hover:bg-accent"
  
  const iconColorClass = isConsultaOrRelatorio
    ? theme === "dark" ? "text-white" : "text-gray-800"
    : "text-foreground"

  return (
    <header className="absolute top-0 right-0 p-4 flex items-center gap-4 z-50">
      {isValidPage && (
        <>
          {showAvatar && <UserAvatar />}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`rounded-full h-10 w-10 ${buttonBgClass}`}
          >
            {theme === "dark" ? (
              <Moon className={`h-5 w-5 ${iconColorClass}`} />
            ) : (
              <Sun className={`h-5 w-5 ${iconColorClass}`} />
            )}
          </Button>
        </>
      )}
    </header>
  )
} 