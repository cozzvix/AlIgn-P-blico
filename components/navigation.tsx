"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Menu, X, User, LogOut, BookOpen, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

const navItems = [
  { href: "#cerebro", label: "Cerebro" },
  { href: "#impacto", label: "Impacto" },
  { href: "#psicologia", label: "Psicología" },
  { href: "#metacognicion", label: "Metacognición" },
  { href: "#quienes-somos", label: "¿Quiénes somos?" },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const { user, profile, signOut, isConfigured } = useAuth()
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    setUserMenuOpen(false)
    await signOut()
    router.push("/")
  }

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Usuario"
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#E0D0FF]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-[var(--font-heading)] font-bold">
            <span className="text-[#4980C0]">A</span>
            <span className="text-[#E0D0FF]">l</span>
            <span className="text-[#4980C0]">I</span>
            <span className="text-[#E0D0FF]">g</span>
            <span className="text-[#E0D0FF]">n</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  className="text-sm transition-colors text-white/70 hover:text-white"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {isConfigured && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E0D0FF]/30 hover:border-[#E0D0FF] hover:bg-[#E0D0FF]/10 transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#4980C0] flex items-center justify-center text-white text-xs font-bold">
                      {initials}
                    </div>
                    <span className="text-white text-sm max-w-[120px] truncate">{displayName}</span>
                    <ChevronDown className={`w-3 h-3 text-white/70 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-52 bg-black/95 border border-[#E0D0FF]/20 rounded-xl shadow-xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-[#E0D0FF]/10">
                          <p className="text-white text-sm font-medium truncate">{displayName}</p>
                          <p className="text-white/50 text-xs truncate">{user.email}</p>
                        </div>
                        <Link
                          href="/actividades/historial"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-[#E0D0FF]/10 transition-colors"
                        >
                          <BookOpen className="w-4 h-4" />
                          Mi historial
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Cerrar sesión
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E0D0FF]/30 hover:border-[#E0D0FF] hover:bg-[#E0D0FF]/10 transition-all"
                  aria-label="Iniciar sesión"
                >
                  <User className="w-5 h-5 text-white flex-shrink-0" />
                </Link>
              )}
            </motion.div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            {isConfigured && user ? (
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-9 h-9 rounded-full bg-[#4980C0] flex items-center justify-center text-white text-sm font-bold border border-[#E0D0FF]/30"
              >
                {initials}
              </button>
            ) : (
              <Link
                href="/login"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E0D0FF]/30 hover:border-[#E0D0FF] hover:bg-[#E0D0FF]/10 transition-all"
                aria-label="Iniciar sesión"
              >
                <User className="w-5 h-5 text-white flex-shrink-0" />
              </Link>
            )}
            <button
              className="text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black border-b border-[#E0D0FF]/20 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {isConfigured && user && (
                <div className="pb-3 mb-3 border-b border-[#E0D0FF]/10">
                  <p className="text-white text-sm font-medium">{displayName}</p>
                  <p className="text-white/50 text-xs">{user.email}</p>
                </div>
              )}
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Link
                    href={item.href}
                    className="block text-sm transition-colors text-white/70 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              {isConfigured && user && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-3 border-t border-[#E0D0FF]/10 space-y-2"
                >
                  <Link
                    href="/actividades/historial"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BookOpen className="w-4 h-4" />
                    Mi historial
                  </Link>
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleSignOut() }}
                    className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
