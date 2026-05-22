"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, XCircle, Brain, Trophy } from "lucide-react"
import { ActivityReview } from "@/components/activity-review"
import { ProtectedRoute } from "@/components/protected-route"

const questions = [
  {
    question: "¿Qué sucede en tu corteza prefrontal cuando le pides a la IA que piense por ti?",
    options: ["Se activa más", "Se desactiva parcialmente", "No cambia", "Se fortalece"],
    correct: 1
  },
  {
    question: "¿Qué es la hipoactividad cerebral?",
    options: ["Exceso de actividad neuronal", "Reducción de actividad en áreas del cerebro", "Un tipo de meditación", "Aumento de la memoria"],
    correct: 1
  },
  {
    question: "¿Cuál es el principio de 'Use it or lose it'?",
    options: ["Usar más la IA", "Las sinapsis no usadas se debilitan y desaparecen", "Guardar energía cerebral", "Dormir más para recordar"],
    correct: 1
  },
  {
    question: "¿Qué son las funciones ejecutivas?",
    options: ["Solo la memoria", "Planificación, control de impulsos y memoria de trabajo", "La velocidad de lectura", "La capacidad de usar apps"],
    correct: 1
  },
  {
    question: "¿Por qué la adolescencia es una etapa crítica para el cerebro?",
    options: ["Porque duermes más", "Porque ocurre la poda sináptica que moldea el cerebro adulto", "Porque comes más", "Porque creces de estatura"],
    correct: 1
  },
  {
    question: "¿Qué es la neuroplasticidad?",
    options: ["Un plástico para neuronas", "La capacidad del cerebro de reorganizarse y crear nuevas conexiones", "Un medicamento", "Un tipo de cirugía"],
    correct: 1
  },
  {
    question: "¿Qué neurotransmisor se relaciona con la sensación de logro?",
    options: ["Serotonina", "GABA", "Dopamina", "Acetilcolina"],
    correct: 2
  },
  {
    question: "¿Qué es la apoptosis neuronal?",
    options: ["Nacimiento de neuronas", "Muerte programada de neuronas no utilizadas", "Duplicación celular", "Inflamación cerebral"],
    correct: 1
  },
  {
    question: "¿Cuál es el riesgo principal del uso pasivo de la IA?",
    options: ["Gastar batería", "Reemplazar tu proceso cognitivo debilitando tu cerebro", "Perder el wifi", "Que la IA aprenda tus datos"],
    correct: 1
  },
  {
    question: "¿Qué ODS se relaciona directamente con la salud mental?",
    options: ["ODS 1", "ODS 7", "ODS 3", "ODS 12"],
    correct: 2
  }
]

function shuffleQuestion(q: typeof questions[0]) {
  const indices = [0, 1, 2, 3]
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]]
  }
  
  const shuffledOptions = indices.map(i => q.options[i])
  const newCorrectIndex = indices.indexOf(q.correct)
  
  return {
    question: q.question,
    options: shuffledOptions,
    correct: newCorrectIndex
  }
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof questions>([])
  const [showReview, setShowReview] = useState(false)

  useEffect(() => {
    const shuffled = questions.map(q => shuffleQuestion(q))
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setShuffledQuestions(shuffled)
  }, [])

  const handleAnswer = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
    
    if (index === shuffledQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setIsFinished(true)
    }
  }

  const restart = () => {
    const shuffled = questions.map(q => shuffleQuestion(q))
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setShuffledQuestions(shuffled)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsFinished(false)
  }

  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#E0D0FF] border-t-transparent rounded-full" />
      </div>
    )
  }

  const question = shuffledQuestions[currentQuestion]

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
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#E0D0FF] font-[var(--font-heading)] font-bold">
                    Quiz de Conciencia Metacognitiva
                  </span>
                  <span className="text-white/70">
                    Pregunta {currentQuestion + 1}/{shuffledQuestions.length}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#4980C0] to-[#E0D0FF]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <motion.div 
                className="bg-white/5 border border-[#E0D0FF]/20 rounded-2xl p-8 mb-8"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#E0D0FF]/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-[#E0D0FF]" />
                  </div>
                  <h2 className="text-xl font-[var(--font-heading)] font-bold text-white">
                    {question.question}
                  </h2>
                </div>

                <div className="grid gap-4">
                  {question.options.map((option, index) => {
                    let buttonClass = "w-full p-4 rounded-xl border-2 text-left transition-all duration-300 "
                    
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
                        whileHover={!showResult ? { scale: 1.02 } : {}}
                        whileTap={!showResult ? { scale: 0.98 } : {}}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span>{option}</span>
                          {showResult && index === question.correct && (
                            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                          )}
                          {showResult && index === selectedAnswer && index !== question.correct && (
                            <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                          )}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>

              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-center"
                  >
                    <Button
                      onClick={nextQuestion}
                      className="bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 px-8 py-3 font-bold"
                    >
                      {currentQuestion < shuffledQuestions.length - 1 ? "Siguiente pregunta" : "Ver resultados"}
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
                ¡Quiz completado!
              </h2>
              
              <p className="text-white/70 mb-8">
                Has respondido correctamente
              </p>
              
              <motion.div 
                className="text-6xl font-bold text-white mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {score}/{shuffledQuestions.length}
              </motion.div>
              
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={restart}
                  className="bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 px-8 py-3 font-bold"
                >
                  Intentar de nuevo
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
            activityName="quiz"
            score={score}
            maxScore={shuffledQuestions.length}
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
