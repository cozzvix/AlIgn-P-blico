"use client"

import { Heart, UserMinus, Frown, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function PsicologiaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="psicologia" className="py-20 border-t border-[#E0D0FF]/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Heart className="w-8 h-8 text-[#E0D0FF]" />
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white">
            Psicología y Conducta
          </h2>
        </motion.div>
        <motion.p 
          className="text-white/70 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Cómo afecta tu comportamiento y bienestar emocional
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <UserMinus className="w-10 h-10 text-[#E0D0FF] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Comportamiento Pasivo
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Cuando la IA toma las decisiones, tú
              pierdes la práctica de decidir. Esto
              genera una <strong className="text-white">dependencia cognitiva</strong>
              {" "}que te vuelve más pasivo frente a los
              desafíos reales de la vida.
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#4980C0]/20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Frown className="w-10 h-10 text-[#4980C0] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Desmotivación
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              El sistema de recompensa del
              cerebro (dopamina) se activa cuando
              <strong className="text-white"> logras algo por ti mismo</strong>. Si la IA lo
              hace todo, tu cerebro pierde esa
              sensación de logro y la motivación
              cae.
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Users className="w-10 h-10 text-[#E0D0FF] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Retraimiento Social
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              La sobredependencia digital reduce
              las interacciones humanas reales. La
              empatía, la comunicación y la
              resolución de conflictos son
              habilidades que <strong className="text-white">solo se desarrollan
              en persona</strong>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
