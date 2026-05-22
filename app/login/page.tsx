"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Suspense } from "react"
import { useAuth } from "@/hooks/use-auth"

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

function LoginPageContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, user, isConfigured } = useAuth()
  const redirectParam = searchParams.get("redirect")
  const redirectTo = redirectParam?.startsWith("/") ? redirectParam : "/actividades"
  const callbackError = searchParams.get("error")

  useEffect(() => {
    if (user) {
      router.push(redirectTo)
    }
  }, [user, router, redirectTo])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let stars: Star[] = []
    const numStars = 80
    const connectionDistance = 150

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initStars = () => {
      stars = []
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
        })
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.x += star.vx
        star.y += star.vy

        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(224, 208, 255, 0.8)"
        ctx.fill()
      })

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3
            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.strokeStyle = `rgba(73, 128, 192, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initStars()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      initStars()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  useEffect(() => {
    if (!callbackError) return

    if (callbackError === "auth_error") {
      setError("No pudimos confirmar tu correo. Intenta abrir el enlace otra vez o pide uno nuevo.")
      return
    }

    if (callbackError.toLowerCase().includes("expired")) {
      setError("El enlace de confirmación expiró. Inicia sesión y pide reenviar el correo.")
      return
    }

    setError(callbackError)
  }, [callbackError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    if (!isConfigured) {
      setError("El sistema de autenticación no está configurado todavía.")
      setIsSubmitting(false)
      return
    }

    const { error } = await signIn(email, password)
    
    if (error) {
      if (error.message === "Invalid login credentials") {
        setError("Credenciales inválidas. Verifica tu correo y contraseña.")
      } else if (error.message.toLowerCase().includes("email not confirmed")) {
        setError("Tu correo aún no está confirmado. Revisa tu bandeja de entrada y abre el enlace de verificación.")
      } else {
        setError(error.message)
      }
      setIsSubmitting(false)
    } else {
      router.push(redirectTo)
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      <motion.header 
        className="relative z-10 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver al inicio</span>
        </Link>
      </motion.header>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <h1 className="text-4xl font-[var(--font-heading)] font-bold">
                <span className="text-[#4980C0]">A</span>
                <span className="text-[#E0D0FF]">l</span>
                <span className="text-[#4980C0]">I</span>
                <span className="text-[#E0D0FF]">g</span>
                <span className="text-[#E0D0FF]">n</span>
              </h1>
            </Link>
            <h2 className="text-2xl font-[var(--font-heading)] font-bold text-white mb-2">
              Iniciar Sesión
            </h2>
            <p className="text-white/70 text-sm">
              Ingresa a tu cuenta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-[#E0D0FF]/20">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-white font-medium">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-[#E0D0FF]/30 text-white placeholder:text-white/50 focus:border-[#E0D0FF]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-white font-medium">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black border-[#E0D0FF]/30 text-white placeholder:text-white/50 focus:border-[#E0D0FF] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-[#E0D0FF]/30 bg-black" />
                <span className="text-white/70">Recordarme</span>
              </label>
              <Link href="/forgot-password" className="text-[#E0D0FF] hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-white/70 mt-6">
            ¿No tienes cuenta?{" "}
            <Link href="/signup" className="text-[#E0D0FF] hover:underline">
              Regístrate
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <LoginPageContent />
    </Suspense>
  )
}
