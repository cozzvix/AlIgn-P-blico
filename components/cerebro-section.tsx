"use client"

import { Brain, BrainCircuit } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function CerebroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="cerebro" className="py-20 border-t border-[#E0D0FF]/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Brain className="w-8 h-8 text-[#E0D0FF]" />
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white">
            El Cerebro y la IA
          </h2>
        </motion.div>
        <motion.p 
          className="text-white/70 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Cómo la tecnología interactúa con tu sistema nervioso
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02, borderColor: "rgba(224, 208, 255, 0.5)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-[#E0D0FF]" />
              <h3 className="text-lg font-semibold text-[#E0D0FF]">
                Reemplazo del Proceso Cognitivo
              </h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Cuando le pides a la IA que piense por ti — que resuma, analice
              o resuelva — tu corteza prefrontal <strong className="text-white">deja de activarse</strong>. Es como
              tener un músculo que nunca ejercitas: tu cerebro entra en
              {'"'}modo pasivo{'"'}.
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Cada vez que delegas una tarea cognitiva, las redes
              neuronales asociadas a esa función <strong className="text-white">reducen su actividad</strong>. Con
              el tiempo, estas conexiones se debilitan.
            </p>
            <p className="text-xs text-white/50 italic">
              [Ref: Loh & Kanai, 2016 — {'"'}How Has the Internet Reshaped Human
              Cognition?{'"'}]
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#4980C0]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02, borderColor: "rgba(73, 128, 192, 0.5)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="w-6 h-6 text-[#4980C0]" />
              <h3 className="text-lg font-semibold text-[#4980C0]">
                Hipoactividad Cerebral
              </h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Estudios de neuroimagen muestran que el uso excesivo de
              herramientas digitales sin esfuerzo cognitivo propio genera
              <strong className="text-white"> hipoactividad</strong> en áreas clave del cerebro: la corteza
              prefrontal dorsolateral (toma de decisiones) y el hipocampo
              (memoria).
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Tu cerebro literalmente se {'"'}apaga{'"'} en las zonas que más
              necesitas para aprender, crear y pensar críticamente.
            </p>
            <p className="text-xs text-white/50 italic">
              [Ref: Carr, N. (2020) — {'"'}The Shallows: What the Internet Is Doing to Our
              Brains{'"'}]
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
