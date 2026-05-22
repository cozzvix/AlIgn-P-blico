"use client"

import { EyeOff, Search, BrainCog } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function MetacognicionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="metacognicion" className="py-20 border-t border-[#E0D0FF]/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <EyeOff className="w-8 h-8 text-[#E0D0FF]" />
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white">
            Pereza Metacognitiva
          </h2>
        </motion.div>
        <motion.p 
          className="text-white/70 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Cómo la IA afecta tu autoconsciencia y pensamiento crítico
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#4980C0]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-6 h-6 text-[#4980C0]" />
              <h3 className="text-lg font-semibold text-[#4980C0]">
                ¿Qué es la Metacognición?
              </h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              La metacognición es la capacidad de <strong className="text-white">pensar sobre tu propio
              pensamiento</strong>. Es tu habilidad para preguntarte: {'"'}¿Cómo estoy
              resolviendo esto? ¿Tiene sentido mi razonamiento? ¿Qué
              errores podría estar cometiendo?{'"'}
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Es como tener un observador dentro de tu mente que evalúa
              constantemente tus procesos cognitivos. Los adolescentes que
              desarrollan metacognición tienen mayor independencia
              intelectual y conciencia de sus limitaciones.
            </p>
            <p className="text-xs text-white/50 italic">
              [Ref: Flavell, J.H. (1979). {'"'}Metacognition and Cognitive Monitoring{'"'}]
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BrainCog className="w-6 h-6 text-[#E0D0FF]" />
              <h3 className="text-lg font-semibold text-white">
                La Trampa: Pereza Metacognitiva
              </h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Cuando usas la IA pasivamente — pidiéndole respuestas sin
              cuestionarlas — tu mente nunca ejerce la metacognición. <strong className="text-[#E0D0FF]">Tu
              cerebro se vuelve perezoso</strong> para reflexionar sobre sus propios
              procesos.
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Eventualmente, pierdes la capacidad de cuestionarte a ti
              mismo, de evaluar tu propia comprensión, y de reconocer
              cuándo no entiendes algo. Es como un músculo que atrofia por
              falta de uso.
            </p>
            <p className="text-xs text-white/50 italic">
              [Ref: Deunk, M.I. et al. (2021). {'"'}The effectiveness of explicit instruction in
              metacognitive strategies{'"'}]
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
