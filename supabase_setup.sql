-- Run this once in your Supabase SQL Editor
-- Go to: supabase.com → your project → SQL Editor → paste and run

CREATE TABLE IF NOT EXISTS kk_data (
  id        text PRIMARY KEY,
  value     jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Allow read/write for anyone with the anon key (navigators)
ALTER TABLE kk_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for anon" ON kk_data
  FOR ALL USING (true) WITH CHECK (true);

-- Enable real-time updates
ALTER PUBLICATION supabase_realtime ADD TABLE kk_data;
