"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, Lock, RotateCcw } from "lucide-react"
import { ActivityReview } from "@/components/activity-review"
import { ProtectedRoute } from "@/components/protected-route"

interface Node {
  id: number
  x: number
  y: number
}

interface Connection {
  from: number
  to: number
}

interface Level {
  nodes: number
  connections: number
  name: string
}

const levels: Level[] = [
  { nodes: 5, connections: 4, name: "Nivel 1 (5 nodos)" },
  { nodes: 8, connections: 7, name: "Nivel 2 (8 nodos)" },
  { nodes: 12, connections: 11, name: "Nivel 3 (12 nodos)" }
]

export default function RedNeuronalPage() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [unlockedLevels, setUnlockedLevels] = useState([true, false, false])
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const [isWon, setIsWon] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showReview, setShowReview] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const generateNodes = useCallback((level: number): Node[] => {
    const numNodes = levels[level].nodes
    const newNodes: Node[] = []
    const padding = 8
    const minDistance = 15 // distancia minima en porcentaje

    for (let i = 0; i < numNodes; i++) {
      let attempts = 0
      let validPosition = false
      let x = 0, y = 0

      while (!validPosition && attempts < 100) {
        x = padding + Math.random() * (100 - padding * 2)
        y = padding + Math.random() * (100 - padding * 2)

        validPosition = newNodes.every(node => {
          const distance = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2))
          return distance >= minDistance
        })
        attempts++
      }

      newNodes.push({ id: i, x, y })
    }
    return newNodes
  }, [])

  const initializeGame = useCallback((level: number) => {
    setNodes(generateNodes(level))
    setConnections([])
    setSelectedNode(null)
    setIsWon(false)
    setIsDrawing(false)
  }, [generateNodes])

  useEffect(() => {
    initializeGame(currentLevel)
  }, [currentLevel, initializeGame])

  const handleNodeClick = (nodeId: number) => {
    if (isWon) return

    if (selectedNode === null) {
      setSelectedNode(nodeId)
      setIsDrawing(true)
    } else if (selectedNode !== nodeId) {
      const connectionExists = connections.some(
        c => (c.from === selectedNode && c.to === nodeId) || 
             (c.from === nodeId && c.to === selectedNode)
      )

      if (!connectionExists) {
        const newConnections = [...connections, { from: selectedNode, to: nodeId }]
        setConnections(newConnections)

        if (newConnections.length >= levels[currentLevel].connections) {
          setIsWon(true)
          if (currentLevel < levels.length - 1) {
            setUnlockedLevels(prev => {
              const newUnlocked = [...prev]
              newUnlocked[currentLevel + 1] = true
              return newUnlocked
            })
          }
        }
      }

      setSelectedNode(null)
      setIsDrawing(false)
    } else {
      setSelectedNode(null)
      setIsDrawing(false)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current || !isDrawing) return
    const rect = canvasRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
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

  const getSelectedNodePos = () => {
    if (selectedNode === null) return null
    const node = nodes.find(n => n.id === selectedNode)
    return node ? { x: node.x, y: node.y } : null
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
        <div className="mb-6">
          <h1 className="text-2xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-2">
            Red Neuronal
          </h1>
          <p className="text-white/70">Conecta las neuronas dibujando sinapsis entre los nodos</p>
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

        <div className="flex gap-6 mb-6 text-white/70">
          <span>Meta: {levels[currentLevel].connections} conexiones</span>
          <span>Hechas: {connections.length}</span>
        </div>

        <AnimatePresence mode="wait">
          {!isWon ? (
            <motion.div
              key={`game-${currentLevel}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                className="relative w-full h-[400px] md:h-[500px] border-2 border-[#E0D0FF]/30 rounded-2xl bg-gradient-to-br from-black/80 to-[#0a0a1a] overflow-hidden cursor-crosshair"
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {connections.map((conn, index) => {
                    const fromNode = nodes.find(n => n.id === conn.from)
                    const toNode = nodes.find(n => n.id === conn.to)
                    if (!fromNode || !toNode) return null

                    return (
                      <motion.line
                        key={index}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="url(#gradient)"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )
                  })}

                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4980C0" />
                      <stop offset="100%" stopColor="#E0D0FF" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                </svg>

                {isDrawing && selectedNode !== null && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line
                      x1={`${getSelectedNodePos()?.x || 0}%`}
                      y1={`${getSelectedNodePos()?.y || 0}%`}
                      x2={mousePos.x}
                      y2={mousePos.y}
                      stroke="#E0D0FF"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity={0.5}
                    />
                  </svg>
                )}

                {nodes.map((node) => {
                  const isSelected = selectedNode === node.id
                  const isConnected = connections.some(
                    c => c.from === node.id || c.to === node.id
                  )

                  return (
                    <motion.button
                      key={node.id}
                      onClick={() => handleNodeClick(node.id)}
                      className={`absolute w-10 h-10 md:w-12 md:h-12 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all border-2 ${
                        isSelected
                          ? "bg-[#E0D0FF] border-white shadow-[0_0_25px_rgba(224,208,255,0.8)]"
                          : isConnected
                          ? "bg-[#4980C0] border-[#4980C0] shadow-[0_0_20px_rgba(73,128,192,0.6)]"
                          : "bg-[#E0D0FF]/20 border-[#E0D0FF]/40 hover:bg-[#E0D0FF]/40 hover:border-[#E0D0FF]/60 hover:shadow-[0_0_15px_rgba(224,208,255,0.3)]"
                      }`}
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: node.id * 0.05, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className={`absolute inset-1 rounded-full ${
                        isSelected ? "bg-white/30" : isConnected ? "bg-white/20" : "bg-white/10"
                      }`} />
                    </motion.button>
                  )
                })}
              </div>

              <p className="text-center text-white/50 text-sm mt-4">
                Haz clic en un nodo para seleccionarlo, luego en otro para conectarlos
              </p>
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
                Creaste {connections.length} sinapsis exitosamente
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
            activityName="red-neuronal"
            score={connections.length}
            maxScore={levels[currentLevel].connections}
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
