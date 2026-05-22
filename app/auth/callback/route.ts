import { createClient } from '@/lib/supabase/server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next')
  const safeNext = next?.startsWith('/') ? next : '/actividades'
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || origin).replace(/\/$/, '')
  const redirectUrl = new URL(safeNext, baseUrl)

  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({ token_hash, type })
    if (!error) {
      return NextResponse.redirect(redirectUrl)
    }
    return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent(error.message)}`)
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(redirectUrl)
    }
    return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent(error.message)}`)
  }

  return NextResponse.redirect(`${baseUrl}/login?error=auth_error`)
}
