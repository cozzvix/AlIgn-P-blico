"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, Lock, RotateCcw } from "lucide-react"
import { ActivityReview } from "@/components/activity-review"
import { ProtectedRoute } from "@/components/protected-route"

const brainSymbols = ["🧠", "⚡", "🔬", "💡", "🎯", "🧬", "🔮", "🌟"]

interface Level {
  pairs: number
  name: string
}

const levels: Level[] = [
  { pairs: 4, name: "Nivel 1 (4 pares)" },
  { pairs: 6, name: "Nivel 2 (6 pares)" },
  { pairs: 8, name: "Nivel 3 (8 pares)" }
]

export default function MemoriaPage() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [unlockedLevels, setUnlockedLevels] = useState([true, false, false])
  const [cards, setCards] = useState<{ id: number; symbol: string; isFlipped: boolean; isMatched: boolean }[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [attempts, setAttempts] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [showReview, setShowReview] = useState(false)

  const initializeGame = useCallback((level: number) => {
    const numPairs = levels[level].pairs
    const symbols = brainSymbols.slice(0, numPairs)
    const cardPairs = [...symbols, ...symbols]
    
    const shuffle = (array: string[]) => {
      const arr = [...array]
      for (let pass = 0; pass < 3; pass++) {
        for (let i = arr.length - 1; i > 0; i--) {
          const randomValue = typeof crypto !== 'undefined' 
            ? crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)
            : Math.random()
          const j = Math.floor(randomValue * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]]
        }
      }
      return arr
    }
    
    const shuffledCards = shuffle(cardPairs)
    
    setCards(shuffledCards.map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false
    })))
    setFlippedCards([])
    setAttempts(0)
    setMatchedPairs(0)
    setIsWon(false)
  }, [])

  useEffect(() => {
    initializeGame(currentLevel)
  }, [currentLevel, initializeGame])

  const handleCardClick = (cardId: number) => {
    if (isChecking) return
    if (flippedCards.length >= 2) return
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return

    const newCards = [...cards]
    newCards[cardId].isFlipped = true
    setCards(newCards)
    
    const newFlipped = [...flippedCards, cardId]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setIsChecking(true)
      setAttempts(prev => prev + 1)
      
      const [first, second] = newFlipped
      if (cards[first].symbol === cards[second].symbol) {
        setTimeout(() => {
          const matchedCards = [...cards]
          matchedCards[first].isMatched = true
          matchedCards[second].isMatched = true
          setCards(matchedCards)
          setFlippedCards([])
          setMatchedPairs(prev => {
            const newMatched = prev + 1
            if (newMatched === levels[currentLevel].pairs) {
              setIsWon(true)
              if (currentLevel < levels.length - 1) {
                setUnlockedLevels(prev => {
                  const newUnlocked = [...prev]
                  newUnlocked[currentLevel + 1] = true
                  return newUnlocked
                })
              }
            }
            return newMatched
          })
          setIsChecking(false)
        }, 500)
      } else {
        setTimeout(() => {
          const resetCards = [...cards]
          resetCards[first].isFlipped = false
          resetCards[second].isFlipped = false
          setCards(resetCards)
          setFlippedCards([])
          setIsChecking(false)
        }, 1000)
      }
    }
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
        <div className="mb-8">
          <h1 className="text-2xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-2">
            Memoria
          </h1>
          <p className="text-white/70">Memoriza y encuentra los pares idénticos</p>
        </div>

        <div className="flex gap-3 mb-8">
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

        <div className="flex gap-6 mb-8 text-white/70">
          <span>Intentos: {attempts}</span>
          <span>Pares: {matchedPairs}/{levels[currentLevel].pairs}</span>
        </div>

        <AnimatePresence mode="wait">
          {!isWon ? (
            <motion.div
              key={`game-${currentLevel}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${Math.min(Math.ceil(Math.sqrt(levels[currentLevel].pairs * 2)), 4)}, 1fr)`
              }}
            >
              {cards.map((card) => (
                <motion.button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`aspect-square rounded-xl border-2 text-4xl font-bold flex items-center justify-center transition-all duration-300 ${
                    card.isMatched
                      ? "border-green-500 bg-green-500/20"
                      : card.isFlipped
                      ? "border-[#E0D0FF] bg-[#E0D0FF]/20"
                      : "border-[#E0D0FF]/30 bg-white/5 hover:border-[#E0D0FF]/60 hover:bg-white/10"
                  }`}
                  whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}}
                  whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: card.isFlipped || card.isMatched ? 1 : 0 }}
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    {card.symbol}
                  </motion.span>
                  <motion.span
                    className="absolute text-[#E0D0FF]/50"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: card.isFlipped || card.isMatched ? 0 : 1 }}
                  >
                    ?
                  </motion.span>
                </motion.button>
              ))}
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
                Completaste el nivel en {attempts} intentos
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
            activityName="memoria"
            score={levels[currentLevel].pairs - attempts + matchedPairs}
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
