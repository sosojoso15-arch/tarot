-- =====================================================
-- TAROT PLATFORM - SQL COMPLETO
-- Ejecuta esto en Supabase SQL Editor
-- =====================================================

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Sesiones
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  minutes INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '24 hours'),
  scheduled_at TIMESTAMP,
  completed_at TIMESTAMP
);

-- Tabla de Pagos
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  stripe_payment_intent_id VARCHAR(255) UNIQUE,
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Tabla de Registros de Llamadas
CREATE TABLE IF NOT EXISTS call_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  call_duration_seconds INTEGER,
  recorded BOOLEAN DEFAULT FALSE,
  recording_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- TAROTISTAS - NUEVO
-- =====================================================

-- Tabla de Tarotistas
CREATE TABLE IF NOT EXISTS tarotistas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  especialidad VARCHAR(255) NOT NULL,
  bio TEXT,
  rating DECIMAL(3,2) DEFAULT 5.0,
  numero_resenas INTEGER DEFAULT 0,
  numero_telefono VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  horario_inicio VARCHAR(5) DEFAULT '09:00',
  horario_fin VARCHAR(5) DEFAULT '22:00',
  disponible BOOLEAN DEFAULT true,
  ocupado BOOLEAN DEFAULT false,
  imagen_url TEXT,
  precio_por_minuto DECIMAL(10,2) DEFAULT 0.50,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Disponibilidad de Tarotistas
CREATE TABLE IF NOT EXISTS tarotista_disponibilidad (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tarotista_id UUID NOT NULL REFERENCES tarotistas(id) ON DELETE CASCADE,
  dia_semana INTEGER,
  hora_inicio VARCHAR(5),
  hora_fin VARCHAR(5),
  disponible BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Sesiones de Tarotistas
CREATE TABLE IF NOT EXISTS tarotista_sesiones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tarotista_id UUID NOT NULL REFERENCES tarotistas(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  duracion_minutos INTEGER,
  calificacion_cliente INTEGER,
  comentario TEXT,
  estado VARCHAR(50) DEFAULT 'pendiente',
  fecha_inicio TIMESTAMP,
  fecha_fin TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_payments_session_id ON payments(session_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_call_logs_session_id ON call_logs(session_id);

CREATE INDEX IF NOT EXISTS idx_tarotistas_disponible ON tarotistas(disponible);
CREATE INDEX IF NOT EXISTS idx_tarotistas_ocupado ON tarotistas(ocupado);
CREATE INDEX IF NOT EXISTS idx_tarotistas_email ON tarotistas(email);
CREATE INDEX IF NOT EXISTS idx_tarotista_sesiones_tarotista ON tarotista_sesiones(tarotista_id);
CREATE INDEX IF NOT EXISTS idx_tarotista_sesiones_session ON tarotista_sesiones(session_id);
CREATE INDEX IF NOT EXISTS idx_tarotista_disponibilidad_tarotista ON tarotista_disponibilidad(tarotista_id);

-- =====================================================
-- DATOS DE EJEMPLO (Opcional - Comenta si no quieres)
-- =====================================================

-- Insertar tarotistas de ejemplo
INSERT INTO tarotistas (nombre, especialidad, bio, numero_telefono, email, rating, numero_resenas)
VALUES
  ('María Delgado', 'Tarot Completo', 'Experta en tarot con 10 años de experiencia', '+34919933673', 'maria@tarot.com', 4.9, 328),
  ('Lucía Rivera', 'Lectura de Amor', 'Especialista en cuestiones del corazón', '+34919933673', 'lucia@tarot.com', 5.0, 412),
  ('Carmen López', 'Videncia Espiritual', 'Conexión profunda con lo espiritual', '+34919933673', 'carmen@tarot.com', 4.8, 267),
  ('Sofía Martínez', 'Tarot Futuro', 'Lee el futuro con claridad', '+34919933673', 'sofia@tarot.com', 4.9, 356),
  ('Isabel Rodríguez', 'Lectura Profunda', 'Análisis detallado de tu situación', '+34919933673', 'isabel@tarot.com', 5.0, 298);

-- =====================================================
-- FIN SQL
-- =====================================================
