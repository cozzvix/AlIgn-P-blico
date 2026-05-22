"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Brain, Activity, Heart, Sparkles, EyeOff, AlertCircle, TrendingDown, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const topCards = [
  {
    icon: Brain,
    title: "Cerebro & IA",
    description: "Conceptos científicos",
    href: "#cerebro"
  },
  {
    icon: Activity,
    title: "Impacto",
    description: "Efectos biológicos",
    href: "#impacto"
  },
  {
    icon: Heart,
    title: "Psicología",
    description: "Entender conducta",
    href: "#psicologia"
  },
  {
    icon: Sparkles,
    title: "Oportunidad",
    description: "Descubrir potencial",
    href: "#oportunidad"
  },
]

const bottomCards = [
  {
    icon: EyeOff,
    title: "Pereza Metacognitiva",
    description: "Cómo la IA afecta tu autoconsciencia",
    href: "#metacognicion",
  },
  {
    icon: AlertCircle,
    title: "Brecha de Autopercepción",
    description: "Evidencia del problema",
    href: "#brecha",
  },
  {
    icon: TrendingDown,
    title: "Consecuencias Cognitivas",
    description: "Del déficit metacognitivo",
    href: "#consecuencias",
  },
  {
    icon: BookOpen,
    title: "Educación & Intervención",
    description: "Camino hacia la solución",
    href: "#educacion",
  },
]

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let stars: Star[] = []
    const numStars = isMobile ? 30 : 80
    const connectionDistance = isMobile ? 100 : 150
    let lastTime = 0
    const targetFPS = isMobile ? 30 : 60
    const frameInterval = 1000 / targetFPS

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    const initStars = () => {
      stars = []
      const width = window.innerWidth
      const height = window.innerHeight
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
          vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
          radius: Math.random() * 1.5 + 0.5,
        })
      }
    }

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate)
      
      const deltaTime = currentTime - lastTime
      if (deltaTime < frameInterval) return
      lastTime = currentTime - (deltaTime % frameInterval)

      const width = window.innerWidth
      const height = window.innerHeight

      ctx.fillStyle = "rgba(0, 0, 0, 1)"
      ctx.fillRect(0, 0, width, height)

      stars.forEach((star) => {
        star.x += star.vx
        star.y += star.vy

        if (star.x < 0) star.x = width
        if (star.x > width) star.x = 0
        if (star.y < 0) star.y = height
        if (star.y > height) star.y = 0

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(224, 208, 255, 0.8)"
        ctx.fill()
      })

      const maxConnectionChecks = isMobile ? 15 : stars.length
      for (let i = 0; i < Math.min(stars.length, maxConnectionChecks); i++) {
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
    }

    resizeCanvas()
    initStars()
    animationFrameId = requestAnimationFrame(animate)

    const handleResize = () => {
      resizeCanvas()
      initStars()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [isMobile])

  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-[var(--font-heading)] font-bold mb-4">
            <span className="text-[#4980C0]">A</span>
            <span className="text-[#E0D0FF]">l</span>
            <span className="text-[#4980C0]">I</span>
            <span className="text-[#E0D0FF]">g</span>
            <span className="text-[#E0D0FF]">n</span>
          </h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/70 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            inteligencia artificial & salud cerebral
          </motion.p>
          <motion.p 
            className="max-w-3xl mx-auto text-white/70 text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            El uso pasivo de la inteligencia artificial afecta tu neuroplasticidad, conoce los mecanismos
            neurobiológicos detrás de esta interacción y estrategias para un uso metacognitivo consciente
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link href="/actividades">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="rounded-full"
              style={{
                boxShadow: "0 0 20px rgba(73, 128, 192, 0.4), 0 0 40px rgba(73, 128, 192, 0.2)"
              }}
            >
              <Button 
                className="bg-[#E0D0FF] text-[#4980C0] font-bold hover:bg-[#E0D0FF]/90 px-8 py-3 text-base"
              >
                Actividades recomendadas
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          {topCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            >
              <Link
                href={card.href}
                className="group p-4 rounded-xl border border-[#E0D0FF]/30 bg-black/50 backdrop-blur-sm hover:border-[#E0D0FF] transition-all duration-300 hover:scale-105 block"
              >
                <card.icon className="w-6 h-6 mb-3 mx-auto text-[#E0D0FF]" />
                <h3 className="text-sm font-semibold text-center mb-1 text-white">
                  {card.title}
                </h3>
                <p className="text-xs text-white/70 text-center">
                  {card.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
          {bottomCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
            >
              <Link
                href={card.href}
                className="group p-4 rounded-xl bg-black/50 backdrop-blur-sm border border-[#4980C0]/30 transition-all duration-300 hover:border-[#4980C0] hover:scale-[1.02] block"
              >
                <card.icon className="w-5 h-5 mb-2 text-[#4980C0]" />
                <h3 className="text-sm font-semibold text-white mb-1">
                  {card.title}
                </h3>
                <p className="text-xs text-white/70">
                  {card.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <div 
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#4980C0]/20 border border-[#4980C0]"
            style={{
              boxShadow: "0 0 15px rgba(73, 128, 192, 0.4), 0 0 30px rgba(73, 128, 192, 0.2)"
            }}
          >
            <span className="text-2xl font-bold text-[#4980C0]">ODS 3</span>
            <span className="text-xs text-white/70">Salud y<br />Bienestar</span>
          </div>
          <div 
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#E0D0FF]/10 border border-[#E0D0FF]"
            style={{
              boxShadow: "0 0 15px rgba(224, 208, 255, 0.3), 0 0 30px rgba(224, 208, 255, 0.15)"
            }}
          >
            <span className="text-2xl font-bold text-[#E0D0FF]">ODS 4</span>
            <span className="text-xs text-white/70">Educación<br />de Calidad</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
