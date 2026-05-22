"use client"

import { AlertCircle, BarChart3, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function BrechaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="brecha" className="py-20 border-t border-[#E0D0FF]/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <AlertCircle className="w-8 h-8 text-[#E0D0FF]" />
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white">
            La Brecha de Autopercepción
          </h2>
        </motion.div>
        <motion.p 
          className="text-white/70 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Evidencia del problema: cuando crees que entiendes pero no es así
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <AlertCircle className="w-10 h-10 text-[#E0D0FF] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Ilusión de Competencia
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Muchos adolescentes que usan IA
              intensamente reportan sentirse
              {'"'}inteligentes{'"'} — porque la IA hace el
              trabajo por ellos. Pero cuando se les
              plantea un problema similar sin IA, <strong className="text-white">no
              pueden resolverlo</strong>.
            </p>
            <p className="text-xs text-white/50 italic mt-4">
              [Ref: Dunning-Kruger Effect en contexto
              digital]
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#4980C0]/20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <BarChart3 className="w-10 h-10 text-[#4980C0] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Desconexión entre Percepción y Realidad
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Estudios muestran una <strong className="text-white">brecha
              creciente</strong> entre lo que los estudiantes
              creen haber aprendido (usando IA) y
              lo que realmente pueden hacer sin
              ayuda.
            </p>
            <p className="text-xs text-white/50 italic mt-4">
              [Ref: Panadero, E. & Alonso-Tapia, J.
              (2014). {'"'}Self-regulated learning{'"'}]
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <AlertTriangle className="w-10 h-10 text-[#E0D0FF] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Falta de Conciencia del Problema
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Lo más peligroso: <strong className="text-white">no sabes que no
              sabes</strong>. Sin metacognición activa, no
              puedes evaluar si realmente
              entiendes algo o solo parece que
              entiendes porque la IA te lo explicó.
            </p>
            <p className="text-xs text-white/50 italic mt-4">
              [Ref: Schraw, G. & Dennison, R.S. (1994).
              {'"'}Assessing Metacognitive Awareness{'"'}]
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
