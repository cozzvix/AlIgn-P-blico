"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Loader2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const { resetPasswordRequest, isConfigured } = useAuth()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    if (!isConfigured) {
      setError("El sistema de autenticación no está configurado todavía.")
      setIsSubmitting(false)
      return
    }

    const { error } = await resetPasswordRequest(email)
    
    if (error) {
      setError(error.message)
      setIsSubmitting(false)
    } else {
      setIsSuccess(true)
      setIsSubmitting(false)
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
          href="/login"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver al inicio de sesión</span>
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
              Recuperar Contraseña
            </h2>
            <p className="text-white/70 text-sm">
              Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>

          {isSuccess ? (
            <motion.div 
              className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-[#E0D0FF]/20 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 bg-[#E0D0FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#E0D0FF]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Revisa tu correo
              </h3>
              <p className="text-white/70 text-sm mb-4">
                Hemos enviado un enlace de recuperación a <span className="text-[#E0D0FF]">{email}</span>
              </p>
              <p className="text-white/50 text-xs">
                Si no ves el correo, revisa tu carpeta de spam
              </p>
              <Link href="/login">
                <Button className="mt-6 bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90">
                  Volver al inicio de sesión
                </Button>
              </Link>
            </motion.div>
          ) : (
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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar enlace de recuperación"
                )}
              </Button>
            </form>
          )}

          {!isSuccess && (
            <p className="text-center text-sm text-white/70 mt-6">
              ¿Recordaste tu contraseña?{" "}
              <Link href="/login" className="text-[#E0D0FF] hover:underline">
                Iniciar sesión
              </Link>
            </p>
          )}
        </motion.div>
      </div>
    </main>
  )
}
