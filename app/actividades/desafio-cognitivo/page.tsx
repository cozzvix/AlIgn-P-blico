"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, RotateCcw, Play, Brain, Calculator } from "lucide-react"
import { ActivityReview } from "@/components/activity-review"
import { ProtectedRoute } from "@/components/protected-route"

interface MathProblem {
  a: number
  b: number
  operator: string
  answer: number
}

const generateMathProblem = (): MathProblem => {
  const operators = ['+', '-', '×']
  const operator = operators[Math.floor(Math.random() * operators.length)]
  let a, b, answer

  switch (operator) {
    case '+':
      a = Math.floor(Math.random() * 50) + 10
      b = Math.floor(Math.random() * 50) + 10
      answer = a + b
      break
    case '-':
      a = Math.floor(Math.random() * 50) + 30
      b = Math.floor(Math.random() * 30) + 1
      answer = a - b
      break
    case '×':
      a = Math.floor(Math.random() * 12) + 2
      b = Math.floor(Math.random() * 12) + 2
      answer = a * b
      break
    default:
      a = 0
      b = 0
      answer = 0
  }

  return { a, b, operator, answer }
}

const generateSequence = (length: number): string[] => {
  const items = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠']
  const sequence: string[] = []
  for (let i = 0; i < length; i++) {
    sequence.push(items[Math.floor(Math.random() * items.length)])
  }
  return sequence
}

export default function DesafioCognitivoPage() {
  const [gameState, setGameState] = useState<'intro' | 'memorize' | 'play' | 'recall' | 'result'>('intro')
  const [timeLeft, setTimeLeft] = useState(30)
  const [sequence, setSequence] = useState<string[]>([])
  const [mathProblem, setMathProblem] = useState<MathProblem | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [mathScore, setMathScore] = useState(0)
  const [mathAttempts, setMathAttempts] = useState(0)
  const [userSequence, setUserSequence] = useState<string[]>([])
  const [sequenceLength, setSequenceLength] = useState(4)
  const [memorizeTime, setMemorizeTime] = useState(5)
  const [showReview, setShowReview] = useState(false)

  const startGame = useCallback(() => {
    const newSequence = generateSequence(sequenceLength)
    setSequence(newSequence)
    setGameState('memorize')
    setMemorizeTime(5)
    setMathScore(0)
    setMathAttempts(0)
    setTimeLeft(30)
    setUserSequence([])
    setUserAnswer('')
  }, [sequenceLength])

  useEffect(() => {
    if (gameState !== 'memorize') return

    const timer = setInterval(() => {
      setMemorizeTime(prev => {
        if (prev <= 1) {
          setGameState('play')
          setMathProblem(generateMathProblem())
          return 5
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState])

  useEffect(() => {
    if (gameState !== 'play') return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('recall')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState])

  const checkMathAnswer = () => {
    if (!mathProblem) return

    setMathAttempts(prev => prev + 1)
    
    if (parseInt(userAnswer) === mathProblem.answer) {
      setMathScore(prev => prev + 1)
    }
    
    setUserAnswer('')
    setMathProblem(generateMathProblem())
  }

  const handleSequenceClick = (item: string) => {
    if (userSequence.length < sequence.length) {
      setUserSequence(prev => [...prev, item])
    }
  }

  const checkSequence = () => {
    setGameState('result')
  }

  const getSequenceScore = () => {
    let correct = 0
    for (let i = 0; i < Math.min(userSequence.length, sequence.length); i++) {
      if (userSequence[i] === sequence[i]) {
        correct++
      }
    }
    return correct
  }

  const restart = () => {
    setGameState('intro')
    setSequenceLength(4)
  }

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
          {gameState === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4980C0] to-[#E0D0FF] flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                Desafío Cognitivo
              </h1>
              
              <p className="text-white/70 mb-8 max-w-lg mx-auto">
                Pon a prueba tu multitarea cognitiva. Primero memoriza una secuencia de colores,
                luego resuelve ecuaciones matemáticas durante 30 segundos, y finalmente recuerda la secuencia.
              </p>

              <div className="mb-8">
                <p className="text-sm text-white/50 mb-3">Dificultad de secuencia:</p>
                <div className="flex justify-center gap-3">
                  {[4, 5, 6].map(len => (
                    <button
                      key={len}
                      onClick={() => setSequenceLength(len)}
                      className={`px-4 py-2 rounded-full font-bold transition-all ${
                        sequenceLength === len
                          ? "bg-[#E0D0FF] text-black"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {len} colores
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={startGame}
                className="bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 px-8 py-3 font-bold text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Comenzar
              </Button>
            </motion.div>
          )}

          {gameState === 'memorize' && (
            <motion.div
              key="memorize"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <h2 className="text-2xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                ¡Memoriza esta secuencia!
              </h2>
              
              <motion.div 
                className="text-6xl font-bold text-white mb-8"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {memorizeTime}
              </motion.div>

              <div className="flex justify-center gap-4 mb-8">
                {sequence.map((item, index) => (
                  <motion.span
                    key={index}
                    className="text-5xl"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.2, type: "spring" }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <p className="text-white/50">
                Recuerda el orden de los colores...
              </p>
            </motion.div>
          )}

          {gameState === 'play' && (
            <motion.div
              key="play"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF]">
                  ¡Resuelve las ecuaciones!
                </h2>
                <motion.div 
                  className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}
                  animate={timeLeft <= 10 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
                >
                  {timeLeft}s
                </motion.div>
              </div>

              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-8">
                <motion.div 
                  className={`h-full ${timeLeft <= 10 ? "bg-red-500" : "bg-gradient-to-r from-[#4980C0] to-[#E0D0FF]"}`}
                  initial={{ width: "100%" }}
                  animate={{ width: `${(timeLeft / 30) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="flex justify-between text-sm text-white/70 mb-8">
                <span>Correctas: {mathScore}</span>
                <span>Intentos: {mathAttempts}</span>
              </div>

              {mathProblem && (
                <motion.div 
                  className="bg-white/5 border border-[#E0D0FF]/20 rounded-2xl p-8 text-center mb-8"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  key={mathAttempts}
                >
                  <Calculator className="w-12 h-12 text-[#E0D0FF] mx-auto mb-4" />
                  
                  <div className="text-4xl font-bold text-white mb-6">
                    {mathProblem.a} {mathProblem.operator} {mathProblem.b} = ?
                  </div>

                  <div className="flex justify-center gap-4">
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && checkMathAnswer()}
                      className="w-32 px-4 py-3 rounded-xl bg-black border-2 border-[#E0D0FF]/30 text-white text-center text-2xl focus:border-[#E0D0FF] outline-none"
                      placeholder="?"
                      autoFocus
                    />
                    <Button
                      onClick={checkMathAnswer}
                      className="bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 px-6"
                    >
                      Verificar
                    </Button>
                  </div>
                </motion.div>
              )}

              <p className="text-center text-white/50 text-sm">
                Recuerda: después de esto tendrás que recordar la secuencia de colores
              </p>
            </motion.div>
          )}

          {gameState === 'recall' && (
            <motion.div
              key="recall"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="text-2xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                ¿Cuál era la secuencia?
              </h2>
              
              <p className="text-white/70 mb-8">
                Selecciona los colores en el orden correcto
              </p>

              <div className="flex justify-center gap-4 mb-8 min-h-[60px]">
                {userSequence.map((item, index) => (
                  <motion.span
                    key={index}
                    className="text-4xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    {item}
                  </motion.span>
                ))}
                {Array(sequence.length - userSequence.length).fill(null).map((_, index) => (
                  <span key={`empty-${index}`} className="w-12 h-12 rounded-full border-2 border-dashed border-white/30" />
                ))}
              </div>

              <div className="flex justify-center gap-4 mb-8">
                {['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'].map(item => (
                  <motion.button
                    key={item}
                    onClick={() => handleSequenceClick(item)}
                    disabled={userSequence.length >= sequence.length}
                    className="text-4xl p-2 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setUserSequence([])}
                  variant="outline"
                  className="border-[#E0D0FF] text-[#E0D0FF] hover:bg-[#E0D0FF]/10"
                >
                  Reiniciar
                </Button>
                <Button
                  onClick={checkSequence}
                  disabled={userSequence.length !== sequence.length}
                  className="bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 px-8 font-bold disabled:opacity-50"
                >
                  Comprobar
                </Button>
              </div>
            </motion.div>
          )}

          {gameState === 'result' && (
            <motion.div
              key="result"
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
              
              <h2 className="text-3xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-8">
                ¡Resultados!
              </h2>
              
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-8">
                <div className="bg-white/5 rounded-xl p-6">
                  <Calculator className="w-8 h-8 text-[#4980C0] mx-auto mb-2" />
                  <p className="text-sm text-white/70 mb-1">Matemáticas</p>
                  <p className="text-3xl font-bold text-white">
                    {mathScore}/{mathAttempts}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <Brain className="w-8 h-8 text-[#E0D0FF] mx-auto mb-2" />
                  <p className="text-sm text-white/70 mb-1">Memoria</p>
                  <p className="text-3xl font-bold text-white">
                    {getSequenceScore()}/{sequence.length}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm text-white/50 mb-2">Secuencia correcta:</p>
                <div className="flex justify-center gap-2 mb-4">
                  {sequence.map((item, index) => (
                    <span key={index} className="text-3xl">{item}</span>
                  ))}
                </div>
                <p className="text-sm text-white/50 mb-2">Tu respuesta:</p>
                <div className="flex justify-center gap-2">
                  {userSequence.map((item, index) => (
                    <span 
                      key={index} 
                      className={`text-3xl ${item === sequence[index] ? '' : 'opacity-50'}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
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
            activityName="desafio-cognitivo"
            score={mathScore + getSequenceScore()}
            maxScore={mathAttempts + sequence.length}
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
