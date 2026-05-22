"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
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

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [academicLevel, setAcademicLevel] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const router = useRouter()
  const { signUp, user, isConfigured } = useAuth()

useEffect(() => {
  if (user && user.email_confirmed_at) {
    router.push("/actividades")
  }
}, [user, router])

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

    if (!isConfigured) {
      setError("El sistema de autenticación no está configurado todavía.")
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.")
      return
    }

    setIsSubmitting(true)

    const { error } = await signUp(email, password, {
      full_name: fullName,
      birth_date: birthDate,
      academic_level: academicLevel,
    })

    if (error) {
      const msg = error.message
      if (msg.includes("already registered") || msg.includes("already exists")) {
        setError("Ya existe una cuenta con ese correo electrónico.")
      } else if (msg.includes("invalid email")) {
        setError("El correo electrónico no es válido.")
      } else {
        setError(msg)
      }
      setIsSubmitting(false)
    } else {
      setSuccess(true)
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
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver al inicio</span>
        </Link>
      </motion.header>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
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
              Crear Cuenta
            </h2>
            <p className="text-white/70 text-sm">
              Únete a nuestra comunidad de aprendizaje consciente
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-[#E0D0FF]/20">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm text-white font-medium">
                Nombre completo
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Tu nombre completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-black border-[#E0D0FF]/30 text-white placeholder:text-white/50 focus:border-[#E0D0FF]"
                required
              />
            </div>

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
              <label htmlFor="birthDate" className="text-sm text-white font-medium">
                Fecha de nacimiento
              </label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="bg-black border-[#E0D0FF]/30 text-white placeholder:text-white/50 focus:border-[#E0D0FF]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="academicLevel" className="text-sm text-white font-medium">
                Nivel académico
              </label>
              <select
                id="academicLevel"
                value={academicLevel}
                onChange={(e) => setAcademicLevel(e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-black border border-[#E0D0FF]/30 text-white focus:border-[#E0D0FF] focus:outline-none"
                required
              >
                <option value="" disabled className="text-white/50">Selecciona tu nivel</option>
                <option value="primaria" className="bg-black">Primaria</option>
                <option value="secundaria" className="bg-black">Secundaria</option>
                <option value="preparatoria" className="bg-black">Preparatoria</option>
                <option value="universidad" className="bg-black">Universidad</option>
              </select>
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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm text-white font-medium">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-black border-[#E0D0FF]/30 text-white placeholder:text-white/50 focus:border-[#E0D0FF] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="rounded border-[#E0D0FF]/30 bg-black mt-1" required />
              <label htmlFor="terms" className="text-sm text-white/70 cursor-pointer">
                Acepto los{" "}
                <Link href="#" className="text-[#E0D0FF] hover:underline">
                  términos y condiciones
                </Link>{" "}
                y la{" "}
                <Link href="#" className="text-[#E0D0FF] hover:underline">
                  política de privacidad
                </Link>
              </label>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm">
                ¡Cuenta creada! Te enviamos un correo de verificación. Revisa tu bandeja de entrada y también spam o correo no deseado para confirmar tu cuenta antes de iniciar sesión.
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || success}
              className="w-full bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creando cuenta...
                </>
              ) : success ? (
                "¡Cuenta creada!"
              ) : (
                "Crear Cuenta"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-white/70 mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-[#E0D0FF] hover:underline">
              Inicia sesión
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  )
}
