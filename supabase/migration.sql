CREATE TABLE IF NOT EXISTS activity_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_name TEXT NOT NULL,  -- Nombre de la actividad (ej: 'quiz', 'memoria')
  score INTEGER NOT NULL DEFAULT 0,  -- Puntuación obtenida
  max_score INTEGER,  -- Puntuación máxima posible (opcional)
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb  -- Datos adicionales (tiempo, nivel, etc.)
);

CREATE INDEX IF NOT EXISTS idx_activity_history_user_id ON activity_history(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_history_completed_at ON activity_history(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_history_activity_name ON activity_history(activity_name);

ALTER TABLE activity_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activity history"
  ON activity_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity history"
  ON activity_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'email_verified'
  ) THEN
    ALTER TABLE profiles ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
  END IF;
END $$;


CREATE OR REPLACE FUNCTION save_activity_history(
  p_user_id UUID,
  p_activity_name TEXT,
  p_score INTEGER,
  p_max_score INTEGER DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO activity_history (user_id, activity_name, score, max_score, metadata)
  VALUES (p_user_id, p_activity_name, p_score, p_max_score, p_metadata)
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION get_user_activity_history(p_user_id UUID, p_limit INTEGER DEFAULT 20)
RETURNS TABLE (
  id UUID,
  activity_name TEXT,
  score INTEGER,
  max_score INTEGER,
  completed_at TIMESTAMPTZ,
  metadata JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ah.id,
    ah.activity_name,
    ah.score,
    ah.max_score,
    ah.completed_at,
    ah.metadata
  FROM activity_history ah
  WHERE ah.user_id = p_user_id
  ORDER BY ah.completed_at DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION get_user_stats(p_user_id UUID)
RETURNS TABLE (
  total_activities INTEGER,
  total_score BIGINT,
  activities_by_type JSONB,
  best_scores JSONB,
  last_activity TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::INTEGER as total_activities,
    COALESCE(SUM(ah.score), 0) as total_score,
    jsonb_object_agg(
      ah.activity_name, 
      (SELECT COUNT(*) FROM activity_history ah2 WHERE ah2.user_id = p_user_id AND ah2.activity_name = ah.activity_name)
    ) as activities_by_type,
    (
      SELECT jsonb_object_agg(activity_name, best_score)
      FROM (
        SELECT activity_name, MAX(score) as best_score
        FROM activity_history
        WHERE user_id = p_user_id
        GROUP BY activity_name
      ) best
    ) as best_scores,
    MAX(ah.completed_at) as last_activity
  FROM activity_history ah
  WHERE ah.user_id = p_user_id
  GROUP BY ah.user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, birth_date, academic_level, email_verified)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    CASE 
      WHEN NEW.raw_user_meta_data->>'birth_date' IS NOT NULL
        AND NEW.raw_user_meta_data->>'birth_date' != ''
      THEN (NEW.raw_user_meta_data->>'birth_date')::DATE 
      ELSE NULL 
    END,
    NEW.raw_user_meta_data->>'academic_level',
    COALESCE(NEW.email_confirmed_at IS NOT NULL, FALSE)
  )
  ON CONFLICT (id) DO UPDATE SET
    email_verified = COALESCE(NEW.email_confirmed_at IS NOT NULL, FALSE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;


CREATE OR REPLACE FUNCTION update_email_verified()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
    UPDATE profiles 
    SET email_verified = TRUE 
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_email_confirmed ON auth.users;
CREATE TRIGGER on_email_confirmed
  AFTER UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION update_email_verified();
