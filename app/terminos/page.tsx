"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-black">
      <motion.header 
        className="p-6 border-b border-[#E0D0FF]/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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
          <div className="w-20" />
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white mb-8">
            Términos de Servicio
          </h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <p className="text-white/70 text-lg">
                Última actualización: Mayo 2026
              </p>
              <p className="text-white/70 mt-4">
                Al utilizar AlIgn, aceptas estos términos de servicio. Por favor, léelos 
                cuidadosamente antes de usar nuestra plataforma.
              </p>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                1. Descripción del Servicio
              </h2>
              <p className="text-white/70">
                AlIgn es una plataforma educativa diseñada para fortalecer la metacognición 
                y prevenir la pereza cognitiva causada por el uso pasivo de la inteligencia 
                artificial. Ofrecemos actividades interactivas que estimulan diferentes áreas 
                del cerebro.
              </p>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                2. Registro de Cuenta
              </h2>
              <p className="text-white/70 mb-4">
                Para acceder a todas las funcionalidades, debes crear una cuenta. Al registrarte:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Debes proporcionar información veraz y actualizada</li>
                <li>Eres responsable de mantener la confidencialidad de tu contraseña</li>
                <li>Debes notificarnos inmediatamente sobre cualquier uso no autorizado</li>
              </ul>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                3. Uso Aceptable
              </h2>
              <p className="text-white/70 mb-4">
                Al usar AlIgn, te comprometes a:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Usar la plataforma solo para fines educativos y personales</li>
                <li>No intentar acceder a cuentas de otros usuarios</li>
                <li>No interferir con el funcionamiento de la plataforma</li>
                <li>No compartir contenido ofensivo en reseñas o comentarios</li>
              </ul>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                4. Propiedad Intelectual
              </h2>
              <p className="text-white/70">
                Todo el contenido de AlIgn, incluyendo actividades, diseño, textos e imágenes, 
                está protegido por derechos de autor. No puedes copiar, modificar o distribuir 
                nuestro contenido sin autorización previa.
              </p>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                5. Limitación de Responsabilidad
              </h2>
              <p className="text-white/70">
                AlIgn se proporciona tal cual. No garantizamos resultados específicos de 
                mejora cognitiva. La plataforma tiene fines educativos y no sustituye 
                asesoramiento médico o psicológico profesional.
              </p>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                6. Modificaciones
              </h2>
              <p className="text-white/70">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                Los cambios entrarán en vigor al publicarse en esta página. El uso continuado 
                de la plataforma implica la aceptación de los términos modificados.
              </p>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                7. Terminación
              </h2>
              <p className="text-white/70">
                Podemos suspender o terminar tu acceso a AlIgn si violas estos términos. 
                Tú puedes eliminar tu cuenta en cualquier momento contactándonos.
              </p>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                8. Contacto
              </h2>
              <p className="text-white/70">
                Si tienes preguntas sobre estos términos de servicio, puedes contactarnos 
                a través de: +52 81 1976 8566
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
