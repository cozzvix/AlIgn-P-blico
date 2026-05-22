"use client"

import { ArrowUp } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer 
      className="py-8 border-t border-[#E0D0FF]/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacidad" className="text-white/70 hover:text-[#E0D0FF] transition-colors">
              Politica de Privacidad
            </Link>
            <Link href="/terminos" className="text-white/70 hover:text-[#E0D0FF] transition-colors">
              Terminos de Servicio
            </Link>
            <Link href="/actividades" className="text-white/70 hover:text-[#E0D0FF] transition-colors">
              Actividades
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E0D0FF]/10">
            <div className="flex items-center gap-2">
              <span className="text-lg font-[var(--font-heading)] font-bold">
                <span className="text-[#4980C0]">A</span>
                <span className="text-[#E0D0FF]">l</span>
                <span className="text-[#4980C0]">I</span>
                <span className="text-[#E0D0FF]">g</span>
                <span className="text-[#E0D0FF]">n</span>
              </span>
              <span className="text-sm text-white/70">
                {new Date().getFullYear()} Todos los derechos reservados.
              </span>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Volver arriba
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
