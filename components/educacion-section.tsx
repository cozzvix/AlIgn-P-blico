"use client"

import { BookOpen, CheckSquare, Brain, Target } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function EducacionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="educacion" className="py-20 border-t border-[#E0D0FF]/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <BookOpen className="w-8 h-8 text-[#E0D0FF]" />
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white">
            Educación: La Intervención Viable
          </h2>
        </motion.div>
        <motion.p 
          className="text-white/70 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Cómo la educación metacognitiva puede revertir el daño y fortalecer tu mente
        </motion.p>

        <motion.div 
          className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-[#E0D0FF]" />
            <h3 className="text-lg font-semibold text-[#E0D0FF]">
              El Camino Hacia la Solución
            </h3>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            La educación metacognitiva no es solo importante — es <strong className="text-[#4980C0]">el único camino viable para recuperar tu autonomía intelectual</strong> en la era de la
            IA.
          </p>
          
          <div className="pl-4 border-l-2 border-[#E0D0FF]/50 mb-6">
            <h4 className="text-white font-medium mb-3">
              ¿Qué significa educación metacognitiva?
            </h4>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              Significa aprender a <strong className="text-white">pensar sobre tu pensamiento</strong>. Implica hacerse preguntas constantemente:
            </p>
            <ul className="text-white/70 text-sm space-y-2">
              <li>• ¿Realmente entiendo esto o solo parece fácil porque la IA me lo explicó?</li>
              <li>• ¿Puedo resolver esto sin ayuda?</li>
              <li>• ¿Dónde se quiebra mi comprensión?</li>
              <li>• ¿Qué estrategia debo usar aquí?</li>
              <li>• ¿Cómo verifico si mi respuesta es correcta?</li>
            </ul>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#4980C0]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckSquare className="w-5 h-5 text-[#4980C0]" />
              <h3 className="text-lg font-semibold text-white">
                Cómo Usar la IA Correctamente
              </h3>
            </div>
            <div className="space-y-4 text-white/70 text-sm">
              <p>
                <strong className="text-white">1. Hazlo primero tú:</strong> Intenta resolver el problema ANTES de
                pedirle ayuda a la IA.
              </p>
              <p>
                <strong className="text-white">2. Cuestiona sus respuestas:</strong> No aceptes lo que dice sin
                pensarlo. ¿Tiene sentido? ¿Falta algo?
              </p>
              <p>
                <strong className="text-white">3. Aprende del proceso:</strong> Pídele que te explique paso a paso, no
                solo la respuesta.
              </p>
              <p>
                <strong className="text-white">4. Verifica por tu cuenta:</strong> Prueba la solución, compruébala,
                identifica errores.
              </p>
              <p>
                <strong className="text-white">5. Reflexiona:</strong> ¿Qué aprendí? ¿Qué haría diferente la próxima
                vez?
              </p>
            </div>
            <p className="text-xs text-white/50 italic mt-4">
              [Ref: Hattie, J. & Timperley, H. (2007). {'"'}The Power of Feedback{'"'}]
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-black border border-[#E0D0FF]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-[#E0D0FF]" />
              <h3 className="text-lg font-semibold text-white">
                La Neuroplasticidad al Rescate
              </h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Aquí viene la buena noticia: tu cerebro puede <strong className="text-[#4980C0]">recuperarse</strong>. A
              través de educación metacognitiva consistente, puedes:
            </p>
            <ul className="text-white/70 text-sm space-y-3">
              <li>
                → <strong className="text-[#E0D0FF]">Refortalecer tus conexiones neuronales</strong> en áreas de
                pensamiento crítico
              </li>
              <li>
                → <strong className="text-[#E0D0FF]">Reconstruir tu autonomía intelectual</strong> paso a paso
              </li>
              <li>
                → <strong className="text-[#E0D0FF]">Desarrollar resiliencia cognitiva</strong> frente a la dependencia
                tecnológica
              </li>
              <li>
                → <strong className="text-[#E0D0FF]">Convertir la IA en una herramienta</strong>, no en tu cerebro
              </li>
            </ul>
            <p className="text-xs text-white/50 italic mt-4">
              [Ref: Doidge, N. (2015). {'"'}The Brain{`'`}s Way of Healing{'"'}]
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
