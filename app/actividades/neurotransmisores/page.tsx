"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, Lock, RotateCcw, CheckCircle } from "lucide-react"
import { ActivityReview } from "@/components/activity-review"
import { ProtectedRoute } from "@/components/protected-route"

interface NeurotransmitterPair {
  neurotransmitter: string
  function: string
}

const allPairs: NeurotransmitterPair[] = [
  { neurotransmitter: "Dopamina", function: "Motivación y recompensa" },
  { neurotransmitter: "Serotonina", function: "Regulación del ánimo" },
  { neurotransmitter: "GABA", function: "Inhibición y calma" },
  { neurotransmitter: "Glutamato", function: "Excitación neuronal" },
  { neurotransmitter: "Acetilcolina", function: "Memoria y aprendizaje" },
  { neurotransmitter: "Noradrenalina", function: "Alerta y atención" },
  { neurotransmitter: "Endorfinas", function: "Alivio del dolor y placer" }
]

interface Level {
  pairs: number
  name: string
}

const levels: Level[] = [
  { pairs: 3, name: "Nivel 1 (3 parejas)" },
  { pairs: 5, name: "Nivel 2 (5 parejas)" },
  { pairs: 7, name: "Nivel 3 (7 parejas)" }
]

export default function NeurotransmisoresPage() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [unlockedLevels, setUnlockedLevels] = useState([true, false, false])
  const [leftColumn, setLeftColumn] = useState<string[]>([])
  const [rightColumn, setRightColumn] = useState<string[]>([])
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [selectedRight, setSelectedRight] = useState<number | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set())
  const [isWon, setIsWon] = useState(false)
  const [wrongMatch, setWrongMatch] = useState(false)
  const [currentPairs, setCurrentPairs] = useState<NeurotransmitterPair[]>([])
  const [showReview, setShowReview] = useState(false)

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const initializeGame = useCallback((level: number) => {
    const numPairs = levels[level].pairs
    const selectedPairs = shuffleArray(allPairs).slice(0, numPairs)
    setCurrentPairs(selectedPairs)
    
    setLeftColumn(shuffleArray(selectedPairs.map(p => p.neurotransmitter)))
    setRightColumn(shuffleArray(selectedPairs.map(p => p.function)))
    setSelectedLeft(null)
    setSelectedRight(null)
    setMatchedPairs(new Set())
    setIsWon(false)
    setWrongMatch(false)
  }, [])

  useEffect(() => {
    initializeGame(currentLevel)
  }, [currentLevel, initializeGame])

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      const leftItem = leftColumn[selectedLeft]
      const rightItem = rightColumn[selectedRight]
      
      const pair = currentPairs.find(p => p.neurotransmitter === leftItem)
      
      if (pair && pair.function === rightItem) {
        const newMatchedPairs = new Set([...matchedPairs, leftItem])
        setMatchedPairs(newMatchedPairs)
        
        if (newMatchedPairs.size === levels[currentLevel].pairs) {
          setIsWon(true)
          if (currentLevel < levels.length - 1) {
            setUnlockedLevels(prev => {
              const newUnlocked = [...prev]
              newUnlocked[currentLevel + 1] = true
              return newUnlocked
            })
          }
        }
      } else {
        setWrongMatch(true)
        setTimeout(() => setWrongMatch(false), 500)
      }
      
      setTimeout(() => {
        setSelectedLeft(null)
        setSelectedRight(null)
      }, 300)
    }
  }, [selectedLeft, selectedRight, leftColumn, rightColumn, currentPairs, matchedPairs, currentLevel])

  const handleLeftClick = (index: number) => {
    if (matchedPairs.has(leftColumn[index])) return
    setSelectedLeft(index)
  }

  const handleRightClick = (index: number) => {
    const matchedFunctions = Array.from(matchedPairs).map(
      n => currentPairs.find(p => p.neurotransmitter === n)?.function
    )
    if (matchedFunctions.includes(rightColumn[index])) return
    setSelectedRight(index)
  }

  const selectLevel = (level: number) => {
    if (unlockedLevels[level]) {
      setCurrentLevel(level)
    }
  }

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1)
    }
  }

  const isLeftMatched = (neurotransmitter: string) => matchedPairs.has(neurotransmitter)
  const isRightMatched = (func: string) => {
    return Array.from(matchedPairs).some(
      n => currentPairs.find(p => p.neurotransmitter === n)?.function === func
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
      <header className="p-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
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

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-6">
          <h1 className="text-2xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-2">
            Neurotransmisores
          </h1>
          <p className="text-white/70">Empareja cada neurotransmisor con su función</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {levels.map((level, index) => (
            <button
              key={index}
              onClick={() => selectLevel(index)}
              disabled={!unlockedLevels[index]}
              className={`px-4 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
                currentLevel === index
                  ? "bg-[#E0D0FF] text-black"
                  : unlockedLevels[index]
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-white/5 text-white/30 cursor-not-allowed"
              }`}
            >
              {!unlockedLevels[index] && <Lock className="w-4 h-4" />}
              {level.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!isWon ? (
            <motion.div
              key={`game-${currentLevel}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-8">
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>Parejas encontradas</span>
                  <span>{matchedPairs.size}/{levels[currentLevel].pairs}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#4980C0] to-[#E0D0FF]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(matchedPairs.size / levels[currentLevel].pairs) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#4980C0] mb-4">Neurotransmisores</h3>
                  {leftColumn.map((item, index) => {
                    const matched = isLeftMatched(item)
                    const selected = selectedLeft === index
                    
                    return (
                      <motion.button
                        key={item}
                        onClick={() => handleLeftClick(index)}
                        disabled={matched}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          matched
                            ? "border-green-500 bg-green-500/20 text-green-400"
                            : selected
                            ? "border-[#E0D0FF] bg-[#E0D0FF]/20 text-white"
                            : wrongMatch && selected
                            ? "border-red-500 bg-red-500/20"
                            : "border-[#E0D0FF]/30 bg-white/5 text-white hover:border-[#E0D0FF]/60"
                        }`}
                        whileHover={!matched ? { scale: 1.02 } : {}}
                        whileTap={!matched ? { scale: 0.98 } : {}}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item}</span>
                          {matched && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#E0D0FF] mb-4">Funciones</h3>
                  {rightColumn.map((item, index) => {
                    const matched = isRightMatched(item)
                    const selected = selectedRight === index
                    
                    return (
                      <motion.button
                        key={item}
                        onClick={() => handleRightClick(index)}
                        disabled={matched}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          matched
                            ? "border-green-500 bg-green-500/20 text-green-400"
                            : selected
                            ? "border-[#E0D0FF] bg-[#E0D0FF]/20 text-white"
                            : wrongMatch && selected
                            ? "border-red-500 bg-red-500/20"
                            : "border-[#E0D0FF]/30 bg-white/5 text-white hover:border-[#E0D0FF]/60"
                        }`}
                        whileHover={!matched ? { scale: 1.02 } : {}}
                        whileTap={!matched ? { scale: 0.98 } : {}}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item}</span>
                          {matched && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="win"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
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
                ¡Nivel completado!
              </h2>
              
              <p className="text-white/70 mb-2">
                Emparejaste todos los neurotransmisores correctamente
              </p>
              
              {currentLevel < levels.length - 1 && (
                <motion.p 
                  className="text-green-400 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  ¡Siguiente nivel desbloqueado!
                </motion.p>
              )}
              
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => initializeGame(currentLevel)}
                  variant="outline"
                  className="border-[#E0D0FF] text-[#E0D0FF] hover:bg-[#E0D0FF]/10 px-6 py-3"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Repetir nivel
                </Button>
                {currentLevel < levels.length - 1 ? (
                  <Button
                    onClick={nextLevel}
                    className="bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 px-8 py-3 font-bold"
                  >
                    Siguiente nivel
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowReview(true)}
                    className="bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90 px-8 py-3 font-bold"
                  >
                    Finalizar
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showReview && (
          <ActivityReview
            activityName="neurotransmisores"
            score={levels[currentLevel].pairs}
            maxScore={levels[currentLevel].pairs}
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
