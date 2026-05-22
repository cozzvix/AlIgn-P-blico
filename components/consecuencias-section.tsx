"use client"

import { TrendingDown, FileWarning, Puzzle, Ban, ShieldAlert } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function ConsecuenciasSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="consecuencias" className="py-20 border-t border-[#E0D0FF]/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <TrendingDown className="w-8 h-8 text-[#E0D0FF]" />
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white">
            Consecuencias del Déficit Metacognitivo
          </h2>
        </motion.div>
        <motion.p 
          className="text-white/70 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Cómo la pérdida de autoconsciencia cognitiva degrada tu aprendizaje
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-[#E0D0FF] rounded-lg flex items-center justify-center mb-4">
              <FileWarning className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              1. Incapacidad de Reconocer Errores
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Sin reflexión metacognitiva, no puedes identificar dónde te
              equivocaste. Esto significa que repites los mismos errores una
              y otra vez, sin oportunidad de aprender de ellos.
            </p>
            <p className="text-xs text-white/50 italic">
              [Ref: Kluger, A.N. & DeNisi, A. (1996). {'"'}The effects of feedback
              interventions{'"'}]
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#4980C0]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-[#4980C0] rounded-lg flex items-center justify-center mb-4">
              <Puzzle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              2. Pérdida de Pensamiento Estratégico
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              La metacognición incluye elegir <strong className="text-[#4980C0]">estrategias cognitivas</strong> — cómo
              abordar un problema, qué pasos seguir. Sin ella, pierdes la
              capacidad de planificar tu propio aprendizaje.
            </p>
            <p className="text-xs text-white/50 italic">
              [Ref: Zimmerman, B.J. (2002). {'"'}Becoming a Self-Regulated Learner{'"'}]
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Ban className="w-8 h-8 text-[#E0D0FF] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              3. Dependencia Total de Fuentes Externas
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Sin capacidad de evaluar tu propio conocimiento, <strong className="text-white">siempre
              necesitas que alguien (o algo) te diga si estás bien</strong>. Pierdes
              autonomía intelectual y te vuelves eternamente dependiente.
            </p>
            <p className="text-xs text-white/50 italic">
              [Ref: Ryan, R.M. & Deci, E.L. (2000). {'"'}Self-Determination Theory{'"'}]
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#4980C0]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <ShieldAlert className="w-8 h-8 text-[#4980C0] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              4. Deterioro del Pensamiento Crítico
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              La capacidad crítica depende de cuestionarse
              constantemente. Si tu metacognición está atrofiada, <strong className="text-white">aceptas
              cualquier información sin evaluarla</strong> — eres vulnerable a la
              desinformación.
            </p>
            <p className="text-xs text-white/50 italic">
              [Ref: Ennis, R.H. (2011). {'"'}The Nature of Critical Thinking{'"'}]
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
