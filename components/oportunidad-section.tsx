"use client"

import { Sparkles, Dumbbell, AlertTriangle, Unlink } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function OportunidadSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="oportunidad" className="py-20 border-t border-[#E0D0FF]/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-8 h-8 text-[#E0D0FF]" />
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white">
            La Oportunidad
          </h2>
        </motion.div>
        <motion.p 
          className="text-white/70 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Tu cerebro tiene un superpoder: la neuroplasticidad
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Dumbbell className="w-6 h-6 text-[#E0D0FF] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Neuroplasticidad
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              Tu cerebro puede <strong className="text-[#4980C0]">reorganizarse y
              crear nuevas conexiones</strong>
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              a lo largo
              de toda tu vida. Cada vez que
              aprendes algo nuevo, resuelves un
              problema o practicas una habilidad,
              estás fortaleciendo tu red neuronal.
            </p>
            <p className="text-white/70 text-sm leading-relaxed mt-3">
              La neuroplasticidad es tu mayor
              aliada — pero necesita que <em className="text-white">tú</em>
              {" "}hagas el trabajo.
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#4980C0]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <AlertTriangle className="w-6 h-6 text-[#4980C0] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Vulnerabilidad Adolescente
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              Entre los 12 y 25 años, tu cerebro está
              en una fase crítica de <strong className="text-white">poda sináptica</strong>:
              elimina las conexiones que no usas y
              fortalece las que sí. Es la etapa donde
              más importa qué decides hacer con
              tu mente.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Lo que haces ahora <strong className="text-[#4980C0]">literalmente
              moldea</strong> la arquitectura de tu cerebro
              adulto.
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Unlink className="w-6 h-6 text-[#E0D0FF] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Riesgo del Desuso Sináptico
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              Principio neurocientífico: <strong className="text-[#E0D0FF]">{'"'}Use it or
              lose it{'"'}</strong> (úsalo o piérdelo). Las sinapsis
              que no se activan regularmente se
              debilitan y eventualmente
              desaparecen.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Si delegas tu pensamiento crítico a la
              IA, esas conexiones sinápticas <strong className="text-[#4980C0]">se
              perderán</strong>. Pero si las ejercitas
              activamente, se fortalecerán.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
