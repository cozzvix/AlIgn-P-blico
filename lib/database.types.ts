export type AcademicLevel = 'primaria' | 'secundaria' | 'preparatoria' | 'universidad'

export interface Profile {
  id: string
  full_name: string | null
  birth_date: string | null        // DATE → string 'YYYY-MM-DD'
  academic_level: AcademicLevel | null
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  name: string
  total_interactions: number
  updated_at: string
}

export interface ActivityStats extends Activity {
  avg_stars: number | null
  total_reviews: number
  total_plays: number        // veces jugadas en total
  unique_players: number     // usuarios distintos que jugaron
  repeat_plays: number       // sesiones de usuarios que repitieron
}

export interface Review {
  id: string
  user_id: string | null
  activity_id: string
  stars: number                    // 1–5
  content: string | null
  created_at: string
}

export interface ActivityProgress {
  id: string
  user_id: string
  activity_id: string
  score: number | null
  completed_at: string
}

export interface ActivityHistory {
  id: string
  user_id: string
  activity_name: string
  score: number
  max_score: number | null
  completed_at: string
  metadata: Record<string, unknown>
}

export interface ReviewWithProfile extends Review {
  profiles: Pick<Profile, 'full_name'> | null
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Partial<Profile> & { id: string }
        Update: Partial<Omit<Profile, 'id'>>
      }
      activities: {
        Row: Activity
        Insert: Omit<Activity, 'id' | 'updated_at'>
        Update: Partial<Omit<Activity, 'id'>>
      }
      reviews: {
        Row: Review
        Insert: Omit<Review, 'id' | 'created_at'>
        Update: Partial<Omit<Review, 'id' | 'user_id' | 'activity_id'>>
      }
      activity_progress: {
        Row: ActivityProgress
        Insert: Omit<ActivityProgress, 'id' | 'completed_at'>
        Update: Partial<Omit<ActivityProgress, 'id' | 'user_id' | 'activity_id'>>
      }
      activity_history: {
        Row: ActivityHistory
        Insert: Omit<ActivityHistory, 'id' | 'completed_at'>
        Update: Partial<Omit<ActivityHistory, 'id' | 'user_id'>>
      }
    }
    Views: {
      activity_stats: {
        Row: ActivityStats
      }
    }
  }
}
