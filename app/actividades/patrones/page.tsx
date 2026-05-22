"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, Lock, RotateCcw, CheckCircle, XCircle } from "lucide-react"
import { ActivityReview } from "@/components/activity-review"
import { ProtectedRoute } from "@/components/protected-route"

interface PatternQuestion {
  scenario: string
  icon: string
  options: string[]
  correct: number
}

const allQuestions: PatternQuestion[] = [
  {
    scenario: "Resuelves 7×8=?",
    icon: "🧮",
    options: ["Memoria visual", "Cálculo (Corteza parietal)", "Lenguaje", "Emoción"],
    correct: 1
  },
  {
    scenario: "Hueles un aroma familiar",
    icon: "👃",
    options: ["Visión", "Memoria olfativa (Bulbo olfatorio)", "Motricidad", "Audición"],
    correct: 1
  },
  {
    scenario: "Reconoces tu canción favorita",
    icon: "🎵",
    options: ["Procesamiento auditivo (Lóbulo temporal)", "Cálculo", "Lenguaje", "Equilibrio"],
    correct: 0
  },
  {
    scenario: "Sientes miedo ante un peligro",
    icon: "😱",
    options: ["Creatividad", "Memoria", "Respuesta emocional (Amígdala)", "Lógica"],
    correct: 2
  },
  {
    scenario: "Hablas con un amigo",
    icon: "🗣️",
    options: ["Visión", "Producción del habla (Área de Broca)", "Equilibrio", "Olfato"],
    correct: 1
  },
  {
    scenario: "Corres para atrapar el bus",
    icon: "🏃",
    options: ["Memoria", "Emoción", "Control motor (Corteza motora)", "Cálculo"],
    correct: 2
  },
  {
    scenario: "Lees este texto",
    icon: "📖",
    options: ["Comprensión visual (Corteza occipital)", "Audición", "Olfato", "Equilibrio"],
    correct: 0
  },
  {
    scenario: "Planificas tu semana",
    icon: "🤔",
    options: ["Emoción", "Planificación (Corteza prefrontal)", "Visión", "Audición"],
    correct: 1
  },
  {
    scenario: "Mantienes el equilibrio en un pie",
    icon: "⚖️",
    options: ["Memoria", "Cálculo", "Lenguaje", "Equilibrio (Cerebelo)"],
    correct: 3
  },
  {
    scenario: "Recuerdas tu último cumpleaños",
    icon: "💭",
    options: ["Memoria episódica (Hipocampo)", "Control motor", "Olfato", "Cálculo"],
    correct: 0
  }
]

export default function PatronesPage() {
  const [currentRound, setCurrentRound] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [questions, setQuestions] = useState<PatternQuestion[]>([])
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [showReview, setShowReview] = useState(false)

  const shuffleQuestions = useCallback(() => {
    const shuffled = [...allQuestions]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [])

  useEffect(() => {
    setQuestions(shuffleQuestions())
  }, [shuffleQuestions])

  useEffect(() => {
    if (questions.length === 0 || showResult || isFinished) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setShowResult(true)
          setShowCorrectAnswer(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentRound, showResult, isFinished, questions.length])

  const handleAnswer = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
    
    if (index === questions[currentRound].correct) {
      setScore(score + 1)
      setShowCorrectAnswer(false)
    } else {
      setShowCorrectAnswer(true)
    }
  }

  const nextRound = () => {
    if (currentRound < questions.length - 1) {
      setCurrentRound(currentRound + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowCorrectAnswer(false)
      setTimeLeft(10)
    } else {
      setIsFinished(true)
    }
  }

  const restart = () => {
    setQuestions(shuffleQuestions())
    setCurrentRound(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setShowCorrectAnswer(false)
    setIsFinished(false)
    setTimeLeft(10)
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#E0D0FF] border-t-transparent rounded-full" />
      </div>
    )
  }

  const question = questions[currentRound]

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
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentRound}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="mb-6">
                <h1 className="text-2xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-2">
                  Reconocimiento de Patrones
                </h1>
                <p className="text-white/70">Identifica qué función cerebral se ejecuta — ¡tienes 10 segundos!</p>
              </div>

              <div className="flex gap-6 mb-8 text-white/70">
                <span>Ronda: {currentRound + 1}/{questions.length}</span>
                <span>Aciertos: {score}</span>
                <motion.span 
                  className={timeLeft <= 3 ? "text-red-400" : ""}
                  animate={timeLeft <= 3 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: timeLeft <= 3 ? Infinity : 0 }}
                >
                  Tiempo: {timeLeft}s
                </motion.span>
              </div>

              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-8">
                <motion.div 
                  className={`h-full ${timeLeft <= 3 ? "bg-red-500" : "bg-gradient-to-r from-[#4980C0] to-[#E0D0FF]"}`}
                  initial={{ width: "100%" }}
                  animate={{ width: `${(timeLeft / 10) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <motion.div 
                className="bg-white/5 border border-[#E0D0FF]/20 rounded-2xl p-8 mb-8"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
              >
                <motion.div 
                  className="text-7xl text-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  {question.icon}
                </motion.div>

                <h2 className="text-2xl font-[var(--font-heading)] font-bold text-white text-center mb-8">
                  {question.scenario}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  {question.options.map((option, index) => {
                    let buttonClass = "p-4 rounded-xl border-2 text-center transition-all duration-300 "
                    
                    if (showResult) {
                      if (index === question.correct) {
                        buttonClass += "border-green-500 bg-green-500/20 text-white"
                      } else if (index === selectedAnswer && index !== question.correct) {
                        buttonClass += "border-red-500 bg-red-500/20 text-white"
                      } else {
                        buttonClass += "border-white/10 bg-white/5 text-white/50"
                      }
                    } else {
                      buttonClass += "border-[#E0D0FF]/30 bg-white/5 text-white hover:border-[#E0D0FF] hover:bg-[#E0D0FF]/10"
                    }

                    return (
                      <motion.button
                        key={index}
                        className={buttonClass}
                        onClick={() => handleAnswer(index)}
                        disabled={showResult}
                        whileHover={!showResult ? { scale: 1.03 } : {}}
                        whileTap={!showResult ? { scale: 0.97 } : {}}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-sm md:text-base">{option}</span>
                        {showResult && index === question.correct && (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto mt-2" />
                        )}
                        {showResult && index === selectedAnswer && index !== question.correct && (
                          <XCircle className="w-5 h-5 text-red-500 mx-auto mt-2" />
                        )}
                      </motion.button>
                    )
                  })}
                </div>

                <AnimatePresence>
                  {showCorrectAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 p-4 rounded-xl bg-[#4980C0]/20 border border-[#4980C0]"
                    >
                      <p className="text-center text-white">
                        <span className="text-[#E0D0FF] font-bold">Respuesta correcta: </span>
                        {question.options[question.correct]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center"
                  >
                    <Button
                      onClick={nextRound}
                      className="bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 px-8 py-3 font-bold"
                    >
                      {currentRound < questions.length - 1 ? "Siguiente" : "Ver resultados"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4980C0] to-[#E0D0FF] flex items-center justify-center mx-auto mb-6"
              >
                <Trophy className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                ¡Juego completado!
              </h2>
              
              <p className="text-white/70 mb-8">
                Aciertos totales
              </p>
              
              <motion.div 
                className="text-6xl font-bold text-white mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {score}/{questions.length}
              </motion.div>
              
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={restart}
                  className="bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 px-8 py-3 font-bold"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Jugar de nuevo
                </Button>
                <Button
                  onClick={() => setShowReview(true)}
                  variant="outline"
                  className="border-[#E0D0FF] text-[#E0D0FF] hover:bg-[#E0D0FF]/10 px-8 py-3"
                >
                  Finalizar
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showReview && (
          <ActivityReview
            activityName="patrones"
            score={score}
            maxScore={questions.length}
            onClose={() => setShowReview(false)}
            onSubmit={(rating, comment) => {
              console.log("Review submitted:", { rating, comment })
            }}
          />
        )}
      </main>
    </div>
    </ProtectedRoute>
  )
}
