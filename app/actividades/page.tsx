"use client"

import Link from "next/link"
import { ArrowLeft, Brain, Grid3X3, Zap, Network, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"

export default function ActividadesPage() {
  const { user, isLoading } = useAuth()

  return (
    <main className="min-h-screen bg-black">
      <motion.header 
        className="p-6 border-b border-[#E0D0FF]/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver al inicio</span>
          </Link>
          <Link href="/" className="text-xl font-[var(--font-heading)] font-bold">
            <span className="text-[#4980C0]">A</span>
            <span className="text-[#E0D0FF]">l</span>
            <span className="text-[#4980C0]">I</span>
            <span className="text-[#E0D0FF]">g</span>
            <span className="text-[#E0D0FF]">n</span>
          </Link>
          {!user && !isLoading && (
            <Link
              href="/login"
              className="text-sm text-[#E0D0FF] hover:underline"
            >
              Iniciar sesion
            </Link>
          )}
          {user && (
            <Link
              href="/actividades/historial"
              className="text-sm text-[#E0D0FF] hover:underline"
            >
              Mi historial
            </Link>
          )}
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white mb-4">
            Actividades Recomendadas
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Ejercita tu cerebro con estas actividades diseñadas para fortalecer tu metacognición 
            y prevenir la pereza cognitiva causada por el uso pasivo de la IA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            className="col-span-1 md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/actividades/quiz">
              <div className="p-6 rounded-xl bg-black border-2 border-[#E0D0FF] hover:border-[#4980C0] hover:shadow-[0_0_30px_rgba(224,208,255,0.2)] transition-all duration-300 group cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Brain className="w-10 h-10 text-[#E0D0FF] mb-4 group-hover:text-[#4980C0] transition-colors" />
                  </motion.div>
                  <h3 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-2">
                    Quiz de Conciencia Metacognitiva
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    10 preguntas para evaluar tu comprensión sobre IA y salud cerebral
                  </p>
                  <Button className="bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 px-6 animate-pulse-glow">
                    Empezar
                  </Button>
                </div>
              </div>
            </Link>
          </motion.div>

          {[
            { id: "memoria", title: "Memoria", description: "Memoriza y encuentra los pares idénticos", icon: Grid3X3, href: "/actividades/memoria" },
            { id: "patrones", title: "Reconocimiento de Patrones", description: "Identifica qué función cerebral se ejecuta — ¡tienes 10 segundos!", icon: Zap, href: "/actividades/patrones" },
            { id: "neurotransmisores", title: "Neurotransmisores", description: "Empareja cada neurotransmisor con su función", icon: Brain, href: "/actividades/neurotransmisores" },
          ].map((activity, index) => (
            <motion.div
              key={activity.id}
              className="col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Link href={activity.href}>
                <div className="p-6 rounded-xl bg-black border-2 border-[#E0D0FF] hover:border-[#4980C0] hover:shadow-[0_0_30px_rgba(224,208,255,0.2)] transition-all duration-300 h-full flex flex-col items-center text-center group cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <activity.icon className="w-8 h-8 text-[#E0D0FF] mb-4 group-hover:text-[#4980C0] transition-colors" />
                  </motion.div>
                  <h3 className="text-lg font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 flex-grow">
                    {activity.description}
                  </p>
                  <Button className="bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 px-6 animate-pulse-glow">
                    Empezar
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}

          <motion.div
            className="col-span-1 md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                { id: "red-neuronal", title: "Red Neuronal", description: "Conecta las neuronas dibujando sinapsis entre los nodos", icon: Network, href: "/actividades/red-neuronal" },
                { id: "desafio-cognitivo", title: "Desafío Cognitivo", description: "Resuelve ecuaciones + recuerda secuencias simultáneamente durante 30 segundos", icon: Calculator, href: "/actividades/desafio-cognitivo" },
              ].map((activity, index) => (
                <Link key={activity.id} href={activity.href}>
                  <div className="p-6 rounded-xl bg-black border-2 border-[#E0D0FF] hover:border-[#4980C0] hover:shadow-[0_0_30px_rgba(224,208,255,0.2)] transition-all duration-300 h-full flex flex-col items-center text-center group cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <activity.icon className="w-8 h-8 text-[#E0D0FF] mb-4 group-hover:text-[#4980C0] transition-colors" />
                    </motion.div>
                    <h3 className="text-lg font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 flex-grow">
                      {activity.description}
                    </p>
                    <Button className="bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 px-6">
                      Empezar
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {!user && !isLoading && (
          <motion.div 
            className="mt-12 p-6 rounded-xl bg-black border border-[#E0D0FF]/20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <p className="text-white/70 mb-4">
              Para guardar tu progreso y acceder a todas las actividades, necesitas una cuenta.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/login">
                <Button variant="outline" className="border-[#E0D0FF] text-[#E0D0FF] hover:bg-[#E0D0FF]/10">
                  Iniciar sesion
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90">
                  Crear cuenta
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
