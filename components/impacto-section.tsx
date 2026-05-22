"use client"

import { Activity, TrendingDown, Skull, ArrowDownCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function ImpactoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="impacto" className="py-20 border-t border-[#E0D0FF]/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Activity className="w-8 h-8 text-[#E0D0FF]" />
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white">
            Impacto Biológico
          </h2>
        </motion.div>
        <motion.p 
          className="text-white/70 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Lo que la ciencia dice sobre los efectos en tu cerebro
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <TrendingDown className="w-8 h-8 text-[#E0D0FF] mb-4" />
            <h3 className="text-lg font-semibold text-[#E0D0FF] mb-3">
              Disminución de Funciones Ejecutivas
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Las funciones ejecutivas — planificación, control de impulsos,
              memoria de trabajo — dependen de la corteza prefrontal. Al
              no ejercitarlas, estas capacidades <strong className="text-white">se deterioran
              progresivamente</strong>.
            </p>
            <p className="text-xs text-white/50 italic">
              [Ref: Diamond, A. (2013). {'"'}Executive Functions.{'"'} Annual Review of
              Psychology]
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#4980C0]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Skull className="w-8 h-8 text-[#4980C0] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Atrofia Cerebral
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              La falta de estimulación cognitiva activa puede llevar a una
              <strong className="text-white"> reducción del volumen de materia gris</strong>, especialmente en
              adolescentes cuyo cerebro aún está en desarrollo.
            </p>
            <p className="text-xs text-white/50 italic">
              [Ref: Kühn & Gallinat (2015). {'"'}Brains Online: Structural and Functional
              Correlates of Habitual Internet Use{'"'}]
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#4980C0]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Skull className="w-8 h-8 text-[#E0D0FF] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Muerte Neuronal (Apoptosis)
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Las neuronas que no se utilizan entran en un proceso natural
              de eliminación llamado <strong className="text-white">apoptosis</strong>. Si consistentemente evitas
              pensar por ti mismo, estás enviando señales a tu cerebro de
              que esas neuronas {'"'}no se necesitan{'"'}.
            </p>
            <p className="text-xs text-white/50 italic">
              [Ref: Huttenlocher, P.R. (2002). {'"'}Neural Plasticity: The Effects of
              Environment on the Development of the Cerebral Cortex{'"'}]
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-[#4980C0] rounded-lg flex items-center justify-center mb-4">
              <ArrowDownCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Involución Intelectual
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              La combinación de hipoactividad, pérdida neuronal y
              funciones ejecutivas debilitadas puede generar una <strong className="text-white">involución
              intelectual</strong>: tu capacidad de razonar, resolver problemas y ser
              creativo disminuye con el tiempo.
            </p>
            <p className="text-xs text-white/50 italic">
              [Ref: Greenfield, S. (2015). {'"'}Mind Change: How Digital Technologies Are
              Leaving Their Mark on Our Brains{'"'}]
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
