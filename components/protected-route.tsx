"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { motion } from "framer-motion"
import { Brain, Lock, Mail, Loader2 } from "lucide-react"
import Link from "next/link"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireEmailVerification?: boolean
}

export function ProtectedRoute({ children, requireEmailVerification = true }: ProtectedRouteProps) {
  const { user, isLoading, isConfigured, isEmailVerified, resendVerificationEmail } = useAuth()
  const router = useRouter()
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading) {
      if (!isConfigured) {
        router.push("/login?redirect=" + encodeURIComponent(window.location.pathname))
      } else if (!user) {
        router.push("/login?redirect=" + encodeURIComponent(window.location.pathname))
      }
    }
  }, [user, isLoading, isConfigured, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="w-12 h-12 text-[#E0D0FF]" />
          </motion.div>
          <p className="text-[#E0D0FF]/70">Verificando sesión...</p>
        </motion.div>
      </div>
    )
  }

  if (!isConfigured || !user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6 text-center max-w-sm"
        >
          <div className="w-16 h-16 rounded-full bg-[#E0D0FF]/10 border border-[#E0D0FF]/20 flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#E0D0FF]" />
          </div>
          <div>
            <h2 className="text-white text-xl font-bold mb-2">Acceso restringido</h2>
            <p className="text-white/60 text-sm">
              Necesitas una cuenta para acceder a las actividades.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 bg-[#E0D0FF] text-black text-sm font-medium rounded-lg hover:bg-[#E0D0FF]/90 transition-colors"
            >
              Iniciar sesion
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 border border-[#E0D0FF]/30 text-white text-sm font-medium rounded-lg hover:border-[#E0D0FF] hover:bg-[#E0D0FF]/10 transition-colors"
            >
              Registrarse
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (requireEmailVerification && !isEmailVerified) {
    const handleResend = async () => {
      setResending(true)
      setResendMessage(null)
      const { error } = await resendVerificationEmail()
      setResending(false)
      if (error) {
        setResendMessage("Error al enviar el correo. Intenta de nuevo.")
      } else {
        setResendMessage("Correo enviado. Revisa tu bandeja de entrada.")
      }
    }

    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6 text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-[#E0D0FF]/10 border border-[#E0D0FF]/20 flex items-center justify-center">
            <Mail className="w-8 h-8 text-[#E0D0FF]" />
          </div>
          <div>
            <h2 className="text-white text-xl font-bold mb-2">Verifica tu correo electronico</h2>
            <p className="text-white/60 text-sm">
              Para acceder a las actividades, necesitas verificar tu correo electronico.
              Revisa tu bandeja de entrada y haz clic en el enlace de verificacion.
            </p>
          </div>
          {resendMessage && (
            <p className={`text-sm ${resendMessage.includes("Error") ? "text-red-400" : "text-green-400"}`}>
              {resendMessage}
            </p>
          )}
          <div className="flex gap-3">
            <button
              onClick={handleResend}
              disabled={resending}
              className="px-5 py-2.5 bg-[#E0D0FF] text-black text-sm font-medium rounded-lg hover:bg-[#E0D0FF]/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {resending && <Loader2 className="w-4 h-4 animate-spin" />}
              Reenviar correo
            </button>
            <Link
              href="/actividades"
              className="px-5 py-2.5 border border-[#E0D0FF]/30 text-white text-sm font-medium rounded-lg hover:border-[#E0D0FF] hover:bg-[#E0D0FF]/10 transition-colors"
            >
              Volver
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}
