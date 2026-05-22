import { getSupabase } from './supabase'
import type { ActivityStats, Review, ReviewWithProfile } from './database.types'


export interface ActivityHistoryItem {
  id: string
  activity_name: string
  score: number
  max_score: number | null
  completed_at: string
  metadata: Record<string, unknown>
}


export async function getActivityStats(): Promise<ActivityStats[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('activity_stats')
    .select('*')
    .order('name')

  if (error) { console.error('getActivityStats:', error); return [] }
  return data ?? []
}

export async function getActivityByName(name: string): Promise<ActivityStats | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('activity_stats')
    .select('*')
    .eq('name', name)
    .single()

  if (error) { console.error('getActivityByName:', error); return null }
  return data
}


export async function getReviewsForActivity(activityId: string): Promise<ReviewWithProfile[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('reviews')
    .select('*, profiles(full_name)')
    .eq('activity_id', activityId)
    .order('created_at', { ascending: false })

  if (error) { console.error('getReviewsForActivity:', error); return [] }
  return (data ?? []) as ReviewWithProfile[]
}

export async function createReview(params: {
  activityId: string
  userId: string
  stars: number
  content?: string
}): Promise<{ data: Review | null; error: string | null }> {
  const supabase = getSupabase()
  if (!supabase) return { data: null, error: 'Supabase no configurado' }

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      activity_id: params.activityId,
      user_id: params.userId,
      stars: params.stars,
      content: params.content ?? null,
    })
    .select()
    .single()

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}


export async function saveProgress(params: {
  userId: string
  activityId: string
  score: number
}): Promise<{ error: string | null }> {
  const supabase = getSupabase()
  if (!supabase) return { error: 'Supabase no configurado' }

  const { error } = await supabase
    .from('activity_progress')
    .insert({
      user_id: params.userId,
      activity_id: params.activityId,
      score: params.score,
    })

  if (error) return { error: error.message }
  return { error: null }
}

export async function getRepeatCount(userId: string, activityId: string): Promise<number> {
  const supabase = getSupabase()
  if (!supabase) return 0

  const { count } = await supabase
    .from('activity_progress')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('activity_id', activityId)

  return count ?? 0
}

export async function getUserProgress(userId: string) {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('activity_progress')
    .select('*, activities(name)')
    .eq('user_id', userId)

  if (error) { console.error('getUserProgress:', error); return [] }
  return data ?? []
}


export async function saveActivityHistory(params: {
  userId: string
  activityName: string
  score: number
  maxScore?: number
  metadata?: Record<string, unknown>
}): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabase()
  if (!supabase) return { success: false, error: 'Supabase no configurado' }

  const { error } = await supabase
    .from('activity_history')
    .insert({
      user_id: params.userId,
      activity_name: params.activityName,
      score: params.score,
      max_score: params.maxScore ?? null,
      metadata: params.metadata ?? {},
    })

  if (error) {
    console.error('saveActivityHistory:', error)
    return { success: false, error: error.message }
  }
  return { success: true, error: null }
}

export async function getActivityHistory(userId: string, limit: number = 50): Promise<ActivityHistoryItem[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('activity_history')
    .select('id, activity_name, score, max_score, completed_at, metadata')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('getActivityHistory:', error)
    return []
  }
  return (data ?? []) as ActivityHistoryItem[]
}


export async function saveActivityReview(
  activityName: string,
  stars: number,
  content?: string,
  userId?: string
): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabase()
  if (!supabase) return { success: false, error: 'Supabase no configurado' }

  const { data: activity, error: actError } = await supabase
    .from('activities')
    .select('id')
    .eq('name', activityName.toLowerCase().replace(/ /g, '-').replace('quiz-de-conciencia-metacognitiva', 'quiz'))
    .single()

  if (actError || !activity) {
    const { data: newActivity, error: createError } = await supabase
      .from('activities')
      .insert({ name: activityName.toLowerCase().replace(/ /g, '-'), total_interactions: 1 })
      .select('id')
      .single()
    
    if (createError || !newActivity) {
      console.error('Error creando actividad:', createError)
      return { success: false, error: 'Actividad no encontrada' }
    }

    const { error: reviewError } = await supabase
      .from('reviews')
      .insert({
        activity_id: newActivity.id,
        user_id: userId ?? null,
        stars,
        content: content ?? null,
      })

    if (reviewError) {
      console.error('Error guardando reseña:', reviewError)
      return { success: false, error: reviewError.message }
    }
    return { success: true, error: null }
  }

  const { error } = await supabase
    .from('reviews')
    .insert({
      activity_id: activity.id,
      user_id: userId ?? null,
      stars,
      content: content ?? null,
    })

  if (error) {
    console.error('Error guardando reseña:', error)
    return { success: false, error: error.message }
  }
  return { success: true, error: null }
}
