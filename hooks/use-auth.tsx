"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'
import type { Profile } from '@/lib/database.types'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  isConfigured: boolean
  isEmailVerified: boolean
  signUp: (email: string, password: string, metadata?: { full_name?: string; birth_date?: string; academic_level?: string }) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>
  resetPasswordRequest: (email: string) => Promise<{ error: Error | null }>
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>
  resendVerificationEmail: () => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL ||
         (typeof window !== 'undefined' ? window.location.origin : '')
  return url.replace(/\/$/, '')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isConfigured = isSupabaseConfigured()

  useEffect(() => {
    if (!isConfigured) {
      setIsLoading(false)
      return
    }

    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setIsLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [isConfigured])

  const fetchProfile = async (userId: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (!error && data) {
      setProfile(data)
    }
  }

  const signUp = async (
    email: string, 
    password: string, 
    metadata?: { full_name?: string; birth_date?: string; academic_level?: string }
  ) => {
    if (!isConfigured) {
      return { error: new Error('Supabase no está configurado') }
    }

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${getBaseUrl()}/auth/callback?next=/actividades`
      }
    })

    if (!error && data.user && metadata) {
      await supabase
        .from('profiles')
        .update({
          full_name: metadata.full_name,
          birth_date: metadata.birth_date,
          academic_level: metadata.academic_level
        })
        .eq('id', data.user.id)
    }

    return { error: error as Error | null }
  }

  const signIn = async (email: string, password: string) => {
    if (!isConfigured) {
      return { error: new Error('Supabase no está configurado') }
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    return { error: error as Error | null }
  }

  const signOut = async () => {
    if (!isConfigured) return
    const supabase = createClient()
    await supabase.auth.signOut()
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!isConfigured || !user) {
      return { error: new Error('No autenticado') }
    }

    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)

    if (!error) {
      setProfile(prev => prev ? { ...prev, ...updates } : null)
    }

    return { error: error as Error | null }
  }

  const resetPasswordRequest = async (email: string) => {
    if (!isConfigured) {
      return { error: new Error('Supabase no está configurado') }
    }

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${getBaseUrl()}/auth/callback?next=/reset-password`
    })

    return { error: error as Error | null }
  }

  const updatePassword = async (newPassword: string) => {
    if (!isConfigured) {
      return { error: new Error('Supabase no esta configurado') }
    }

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    return { error: error as Error | null }
  }

  const resendVerificationEmail = async () => {
    if (!isConfigured || !user?.email) {
      return { error: new Error('No autenticado o Supabase no configurado') }
    }

    const supabase = createClient()
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
      options: {
        emailRedirectTo: `${getBaseUrl()}/auth/callback?next=/actividades`
      }
    })

    return { error: error as Error | null }
  }

  const isEmailVerified = user?.email_confirmed_at != null

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      isLoading,
      isConfigured,
      isEmailVerified,
      signUp,
      signIn,
      signOut,
      updateProfile,
      resetPasswordRequest,
      updatePassword,
      resendVerificationEmail
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
