CREATE TABLE call_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT,
  tarotista_id TEXT,
  client_phone TEXT,
  tarotista_phone TEXT,
  zadarma_call_id TEXT,
  status TEXT DEFAULT 'initiated',
  call_status TEXT,
  duration_limit INTEGER,
  duration_seconds INTEGER,
  cost NUMERIC,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
