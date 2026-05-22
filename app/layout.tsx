import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/hooks/use-auth'
import './globals.css'

const syne = Syne({ 
  subsets: ["latin"],
  variable: '--font-syne'
})

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans'
})

export const metadata: Metadata = {
  title: 'AlIgn - Inteligencia Artificial & Salud Cerebral',
  description: 'El uso pasivo de la inteligencia artificial afecta tu neuroplasticidad. Conoce los mecanismos neurobiológicos y estrategias para un uso metacognitivo consciente.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`dark scroll-smooth ${syne.variable} ${dmSans.variable} bg-background`}>
      <body className="font-sans antialiased bg-background">
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
