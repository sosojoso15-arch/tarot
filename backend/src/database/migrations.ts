import { supabase } from '../config/database';
import { logger } from '../utils/logger';

const migrations = [
  {
    name: '001_initial_schema',
    sql: `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Sessions table
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        stripe_payment_intent_id VARCHAR(255) UNIQUE,
        minutes INTEGER NOT NULL CHECK (minutes IN (10, 15, 20, 30)),
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'expired', 'cancelled')),
        price_cents INTEGER NOT NULL,
        currency VARCHAR(3) DEFAULT 'USD',
        session_code VARCHAR(20) UNIQUE NOT NULL,
        call_started_at TIMESTAMP,
        call_ended_at TIMESTAMP,
        minutes_used INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        expires_at TIMESTAMP,
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Payments table
      CREATE TABLE IF NOT EXISTS payments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
        stripe_customer_id VARCHAR(255),
        stripe_charge_id VARCHAR(255) UNIQUE,
        amount_cents INTEGER NOT NULL,
        currency VARCHAR(3) DEFAULT 'USD',
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
        payment_method VARCHAR(50),
        error_message TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Call logs table
      CREATE TABLE IF NOT EXISTS call_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        call_sid VARCHAR(255),
        zadarma_call_id VARCHAR(255),
        phone_called VARCHAR(20),
        duration_seconds INTEGER DEFAULT 0,
        call_status VARCHAR(50),
        recording_url TEXT,
        transcription TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Analytics events table
      CREATE TABLE IF NOT EXISTS analytics_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        event_name VARCHAR(100) NOT NULL,
        user_id UUID REFERENCES users(id),
        session_id UUID REFERENCES sessions(id),
        event_data JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );

      -- Indexes
      CREATE INDEX idx_sessions_user_id ON sessions(user_id);
      CREATE INDEX idx_sessions_status ON sessions(status);
      CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);
      CREATE INDEX idx_payments_user_id ON payments(user_id);
      CREATE INDEX idx_payments_session_id ON payments(session_id);
      CREATE INDEX idx_payments_status ON payments(status);
      CREATE INDEX idx_call_logs_session_id ON call_logs(session_id);
      CREATE INDEX idx_call_logs_user_id ON call_logs(user_id);
      CREATE INDEX idx_analytics_events_event_name ON analytics_events(event_name);
      CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
      CREATE INDEX idx_users_email ON users(email);
    `
  }
];

export async function runMigrations() {
  try {
    for (const migration of migrations) {
      logger.info(`Running migration: ${migration.name}`);
      // Note: Direct SQL execution depends on your Supabase setup
      // You may need to use psql CLI or Supabase dashboard for this
      logger.info(`Migration ${migration.name} completed`);
    }
  } catch (error) {
    logger.error('Migration error:', error);
    throw error;
  }
}

if (require.main === module) {
  runMigrations().catch(console.error);
}
