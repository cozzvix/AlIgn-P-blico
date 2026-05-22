"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function PrivacidadPage() {
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
          <div className="w-20" /> {/* Spacer para centrar el logo */}
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white mb-8">
            Política de Privacidad
          </h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <p className="text-white/70 text-lg">
                Última actualización: Mayo 2026
              </p>
              <p className="text-white/70 mt-4">
                En AlIgn, nos comprometemos a proteger tu privacidad y tus datos personales. 
                Esta política describe cómo recopilamos, usamos y protegemos tu información.
              </p>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                1. Información que Recopilamos
              </h2>
              <p className="text-white/70 mb-4">
                Recopilamos la siguiente información cuando creas una cuenta:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Correo electrónico</li>
                <li>Nombre completo</li>
                <li>Fecha de nacimiento</li>
                <li>Nivel académico</li>
              </ul>
              <p className="text-white/70 mt-4">
                También recopilamos datos sobre tu progreso en las actividades, incluyendo 
                puntuaciones y fechas de realización, para mejorar tu experiencia de aprendizaje.
              </p>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                2. Cómo Usamos tu Información
              </h2>
              <p className="text-white/70 mb-4">
                Utilizamos tu información para:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Crear y gestionar tu cuenta</li>
                <li>Guardar tu progreso en las actividades</li>
                <li>Personalizar tu experiencia de aprendizaje</li>
                <li>Enviarte comunicaciones importantes sobre tu cuenta</li>
                <li>Mejorar nuestros servicios y contenido</li>
              </ul>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                3. Almacenamiento y Seguridad
              </h2>
              <p className="text-white/70">
                Tus datos se almacenan de forma segura en servidores protegidos. 
                Utilizamos Supabase como proveedor de base de datos, que cumple con 
                estándares de seguridad de la industria. Las contraseñas se almacenan 
                de forma encriptada y nunca tenemos acceso a ellas en texto plano.
              </p>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                4. Compartir Información
              </h2>
              <p className="text-white/70">
                No vendemos, intercambiamos ni transferimos tu información personal a 
                terceros. Solo compartiremos tus datos si es requerido por ley o si es 
                necesario para proteger nuestros derechos.
              </p>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                5. Tus Derechos
              </h2>
              <p className="text-white/70 mb-4">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Acceder a tus datos personales</li>
                <li>Corregir información incorrecta</li>
                <li>Solicitar la eliminación de tu cuenta y datos</li>
                <li>Exportar tus datos</li>
              </ul>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                6. Cookies
              </h2>
              <p className="text-white/70">
                Utilizamos cookies esenciales para mantener tu sesión activa. 
                No utilizamos cookies de seguimiento ni de publicidad.
              </p>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                7. Menores de Edad
              </h2>
              <p className="text-white/70">
                AlIgn está diseñado para usuarios de todas las edades, incluyendo estudiantes. 
                Si eres menor de 13 años, te recomendamos usar la plataforma bajo la supervisión 
                de un padre o tutor.
              </p>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                8. Cambios a esta Política
              </h2>
              <p className="text-white/70">
                Podemos actualizar esta política ocasionalmente. Te notificaremos sobre 
                cambios significativos a través del correo electrónico registrado en tu cuenta.
              </p>
            </section>

            <section className="border-t border-[#E0D0FF]/20 pt-8">
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-[#E0D0FF] mb-4">
                9. Contacto
              </h2>
              <p className="text-white/70">
                Si tienes preguntas sobre esta política de privacidad o sobre tus datos, 
                puedes contactarnos a través de: +52 81 1976 8566
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
