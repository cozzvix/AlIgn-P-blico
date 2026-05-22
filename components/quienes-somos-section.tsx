"use client"

import { Users } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function QuienesSomosSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="quienes-somos" className="py-20 border-t border-[#E0D0FF]/20" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Users className="w-8 h-8 text-[#E0D0FF]" />
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white">
            ¿Quiénes somos?
          </h2>
        </motion.div>
        <motion.p 
          className="text-white/70 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          El equipo detrás de AlIgn
        </motion.p>

        <motion.div 
          className="p-8 rounded-xl bg-black border border-[#E0D0FF]/20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ borderColor: "rgba(224, 208, 255, 0.5)" }}
        >
          <p className="text-white/70 leading-relaxed mb-6">
            Somos un equipo apasionado por la intersección entre la tecnología y la salud mental.
            Creemos que la inteligencia artificial puede ser una herramienta poderosa, pero solo
            si aprendemos a usarla de manera consciente y responsable.
          </p>
          <p className="text-white/70 leading-relaxed mb-6">
            Nuestra misión es educar a jóvenes y adultos sobre los efectos del uso pasivo de la IA
            en el cerebro, y proporcionar estrategias prácticas para mantener la autonomía
            intelectual en la era digital.
          </p>
          <p className="text-white/70 leading-relaxed">
            Este proyecto está alineado con los <strong className="text-[#4980C0]">Objetivos de Desarrollo Sostenible (ODS)</strong> de las
            Naciones Unidas, específicamente el ODS 3 (Salud y Bienestar) y ODS 4 (Educación de Calidad).
          </p>
        </motion.div>
      </div>
    </section>
  )
}
