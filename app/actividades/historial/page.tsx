"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Trophy, Clock, Brain, Grid3X3, Zap, Network, Calculator } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/hooks/use-auth"
import { getActivityHistory, type ActivityHistoryItem } from "@/lib/activity-service"

const activityIcons: Record<string, typeof Brain> = {
  "memoria": Grid3X3,
  "quiz": Brain,
  "patrones": Zap,
  "neurotransmisores": Brain,
  "red-neuronal": Network,
  "desafio-cognitivo": Calculator,
}

const activityNames: Record<string, string> = {
  "memoria": "Memoria",
  "quiz": "Quiz de Conciencia Metacognitiva",
  "patrones": "Reconocimiento de Patrones",
  "neurotransmisores": "Neurotransmisores",
  "red-neuronal": "Red Neuronal",
  "desafio-cognitivo": "Desafio Cognitivo",
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "Hace un momento"
  if (diffMins < 60) return `Hace ${diffMins} min`
  if (diffHours < 24) return `Hace ${diffHours}h`
  if (diffDays < 7) return `Hace ${diffDays} dias`
  return formatDate(dateStr)
}

export default function HistorialPage() {
  const { user } = useAuth()
  const [history, setHistory] = useState<ActivityHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadHistory() {
      if (!user?.id) return
      setIsLoading(true)
      const data = await getActivityHistory(user.id)
      setHistory(data)
      setIsLoading(false)
    }
    loadHistory()
  }, [user?.id])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        <header className="p-6 border-b border-white/10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/actividades" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </Link>
            <Link href="/" className="text-xl font-[var(--font-heading)] font-bold">
              <span className="text-[#4980C0]">A</span>
              <span className="text-[#E0D0FF]">l</span>
              <span className="text-[#4980C0]">I</span>
              <span className="text-[#E0D0FF]">g</span>
              <span className="text-[#E0D0FF]">n</span>
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-2">
              Mi Historial
            </h1>
            <p className="text-white/70">Revisa tus actividades completadas y tu progreso</p>
          </motion.div>

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-8 h-8 border-2 border-[#E0D0FF] border-t-transparent rounded-full" />
            </div>
          )}

          {!isLoading && history.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full bg-[#E0D0FF]/10 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-[#E0D0FF]/50" />
              </div>
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-white mb-2">
                Sin actividades aun
              </h2>
              <p className="text-white/50 mb-6">
                Completa actividades para ver tu historial aqui
              </p>
              <Link 
                href="/actividades"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E0D0FF] text-black font-medium rounded-lg hover:bg-[#E0D0FF]/90 transition-colors"
              >
                Ver actividades
              </Link>
            </motion.div>
          )}

          {!isLoading && history.length > 0 && (
            <div className="space-y-4">
              {history.map((item, index) => {
                const Icon = activityIcons[item.activity_name] || Brain
                const displayName = activityNames[item.activity_name] || item.activity_name
                const scorePercent = item.max_score ? Math.round((item.score / item.max_score) * 100) : null

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 rounded-xl border border-[#E0D0FF]/20 bg-white/5 hover:border-[#E0D0FF]/40 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#E0D0FF]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#E0D0FF]" />
                      </div>

                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-white truncate">{displayName}</h3>
                        <div className="flex items-center gap-3 text-sm text-white/50">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatRelativeTime(item.completed_at)}
                          </span>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-[#E0D0FF]" />
                          <span className="font-bold text-[#E0D0FF]">
                            {item.score}
                            {item.max_score && <span className="text-white/50 font-normal">/{item.max_score}</span>}
                          </span>
                        </div>
                        {scorePercent !== null && (
                          <div className="mt-1 w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#4980C0] to-[#E0D0FF] rounded-full"
                              style={{ width: `${scorePercent}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {!isLoading && history.length > 0 && (
            <motion.div 
              className="mt-8 p-6 rounded-xl border border-[#4980C0]/30 bg-[#4980C0]/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-[var(--font-heading)] font-bold text-white mb-4">Resumen</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#E0D0FF]">{history.length}</p>
                  <p className="text-sm text-white/50">Actividades completadas</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#E0D0FF]">
                    {new Set(history.map(h => h.activity_name)).size}
                  </p>
                  <p className="text-sm text-white/50">Tipos diferentes</p>
                </div>
                <div className="text-center col-span-2 md:col-span-1">
                  <p className="text-3xl font-bold text-[#E0D0FF]">
                    {history.reduce((sum, h) => sum + h.score, 0)}
                  </p>
                  <p className="text-sm text-white/50">Puntos totales</p>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
