CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT,
  birth_date    DATE,
  academic_level TEXT CHECK (academic_level IN ('primaria', 'secundaria', 'preparatoria', 'universidad')),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activities (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL UNIQUE,   -- ej: 'memoria', 'quiz', 'patrones'
  total_interactions  INTEGER NOT NULL DEFAULT 0,
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO activities (name) VALUES
  ('memoria'),
  ('neurotransmisores'),
  ('red-neuronal'),
  ('quiz'),
  ('patrones'),
  ('desafio-cognitivo')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  activity_id   UUID REFERENCES activities(id) ON DELETE CASCADE NOT NULL,
  stars         INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
  content       TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_progress (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_id     UUID REFERENCES activities(id) ON DELETE CASCADE NOT NULL,
  score           INTEGER,
  completed_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE VIEW activity_stats AS
SELECT
  a.id,
  a.name,
  a.total_interactions,
  ROUND(AVG(r.stars)::NUMERIC, 1)  AS avg_stars,
  COUNT(DISTINCT r.id)             AS total_reviews,
  COUNT(DISTINCT ap.id)            AS total_plays,      -- veces jugadas en total
  COUNT(DISTINCT ap.user_id)       AS unique_players,   -- usuarios únicos
  COUNT(DISTINCT ap.id) FILTER (
    WHERE ap.user_id IN (
      SELECT user_id FROM activity_progress
      WHERE activity_id = a.id
      GROUP BY user_id HAVING COUNT(*) > 1
    )
  )                                AS repeat_plays
FROM activities a
LEFT JOIN reviews r          ON r.activity_id  = a.id
LEFT JOIN activity_progress ap ON ap.activity_id = a.id
GROUP BY a.id, a.name, a.total_interactions;

CREATE INDEX IF NOT EXISTS idx_reviews_activity  ON reviews(activity_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user      ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_user     ON activity_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_activity ON activity_progress(activity_id);


CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER activities_updated_at
  BEFORE UPDATE ON activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, birth_date, academic_level)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    (NEW.raw_user_meta_data->>'birth_date')::DATE,
    NEW.raw_user_meta_data->>'academic_level'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE OR REPLACE FUNCTION increment_activity_interactions()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE activities
  SET total_interactions = total_interactions + 1
  WHERE id = NEW.activity_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER on_progress_insert
  AFTER INSERT ON activity_progress
  FOR EACH ROW EXECUTE FUNCTION increment_activity_interactions();

ALTER TABLE profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities       ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews          ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perfil propio - ver"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Perfil propio - editar"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Actividades - ver"
  ON activities FOR SELECT USING (true);

CREATE POLICY "Reseñas - ver todas"
  ON reviews FOR SELECT USING (true);

CREATE POLICY "Reseñas - insertar autenticado"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Reseñas - editar propia"
  ON reviews FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Reseñas - borrar propia"
  ON reviews FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Progreso - ver propio"
  ON activity_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Progreso - insertar propio"
  ON activity_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Progreso - actualizar propio"
  ON activity_progress FOR UPDATE USING (auth.uid() = user_id);
