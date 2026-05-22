"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Star, Send, CheckCircle, X } from "lucide-react"
import { saveActivityReview, saveActivityHistory } from "@/lib/activity-service"
import { useAuth } from "@/hooks/use-auth"

interface ActivityReviewProps {
  activityName: string
  onClose: () => void
  onSubmit?: (rating: number, comment: string) => void
  score?: number
  maxScore?: number
}

export function ActivityReview({ activityName, onClose, onSubmit, score, maxScore }: ActivityReviewProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return
    
    setIsSubmitting(true)
    
    const reviewResult = await saveActivityReview(activityName, rating, comment, user?.id)
    
    if (!reviewResult.success) {
      console.error('Error guardando resena:', reviewResult.error)
    }
    
    if (user?.id && score !== undefined) {
      const historyResult = await saveActivityHistory({
        userId: user.id,
        activityName: activityName.toLowerCase().replace(/ /g, '-').replace('quiz-de-conciencia-metacognitiva', 'quiz'),
        score,
        maxScore,
      })
      
      if (!historyResult.success) {
        console.error('Error guardando historial:', historyResult.error)
      }
    }
    
    if (onSubmit) {
      onSubmit(rating, comment)
    }
    
    setIsSubmitted(true)
    
    setTimeout(() => {
      onClose()
      router.push("/actividades")
    }, 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isSubmitting && !isSubmitted) {
            onClose()
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-gradient-to-br from-black to-[#0a0a15] border-2 border-[#E0D0FF]/30 rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#E0D0FF]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#4980C0]/10 rounded-full blur-3xl" />
          
          {!isSubmitting && !isSubmitted && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative z-10"
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4980C0] to-[#E0D0FF] flex items-center justify-center mx-auto mb-4"
                  >
                    <Star className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-2">
                    ¿Qué te pareció?
                  </h2>
                  <p className="text-white/60 text-sm">
                    {activityName}
                  </p>
                </div>

                <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      disabled={isSubmitting}
                      className="relative p-1"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + star * 0.05 }}
                    >
                      <Star
                        className={`w-10 h-10 transition-all duration-200 ${
                          star <= (hoveredRating || rating)
                            ? "fill-[#E0D0FF] text-[#E0D0FF] drop-shadow-[0_0_10px_rgba(224,208,255,0.5)]"
                            : "text-white/30"
                        }`}
                      />
                      {star <= (hoveredRating || rating) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 bg-[#E0D0FF]/20 rounded-full blur-md -z-10"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: rating > 0 ? 1 : 0 }}
                  className="text-center text-[#E0D0FF] mb-6 h-6"
                >
                  {rating === 1 && "Necesita mejorar"}
                  {rating === 2 && "Regular"}
                  {rating === 3 && "Buena"}
                  {rating === 4 && "Muy buena"}
                  {rating === 5 && "Excelente"}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Cuéntanos tu experiencia (opcional)"
                    disabled={isSubmitting}
                    className="w-full h-24 bg-white/5 border-2 border-[#E0D0FF]/20 rounded-xl p-4 text-white placeholder:text-white/40 focus:border-[#E0D0FF]/50 focus:outline-none resize-none transition-colors"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={handleSubmit}
                    disabled={rating === 0 || isSubmitting}
                    className={`w-full py-4 font-bold text-lg transition-all ${
                      rating === 0
                        ? "bg-white/10 text-white/50 cursor-not-allowed"
                        : "bg-[#E0D0FF] text-black hover:bg-[#E0D0FF]/90"
                    }`}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full"
                      />
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar reseña
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-2"
                >
                  ¡Gracias!
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/60"
                >
                  Tu opinión nos ayuda a mejorar
                </motion.p>

                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        opacity: 1,
                        x: "50%",
                        y: "50%",
                        scale: 0
                      }}
                      animate={{ 
                        opacity: 0,
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                        scale: 1
                      }}
                      transition={{ 
                        duration: 1,
                        delay: i * 0.02,
                        ease: "easeOut"
                      }}
                      className={`absolute w-2 h-2 rounded-full ${
                        i % 3 === 0 ? "bg-[#E0D0FF]" : i % 3 === 1 ? "bg-[#4980C0]" : "bg-white"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
