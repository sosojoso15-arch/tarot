-- Tabla de Tarotistas
CREATE TABLE tarotistas (
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

-- Tabla de Disponibilidad
CREATE TABLE tarotista_disponibilidad (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tarotista_id UUID NOT NULL REFERENCES tarotistas(id) ON DELETE CASCADE,
  dia_semana INTEGER, -- 0=lunes, 6=domingo
  hora_inicio VARCHAR(5),
  hora_fin VARCHAR(5),
  disponible BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Llamadas/Sesiones por Tarotista
CREATE TABLE tarotista_sesiones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tarotista_id UUID NOT NULL REFERENCES tarotistas(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  duracion_minutos INTEGER,
  calificacion_cliente INTEGER, -- 1-5 estrellas
  comentario TEXT,
  estado VARCHAR(50) DEFAULT 'pendiente',
  fecha_inicio TIMESTAMP,
  fecha_fin TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_tarotistas_disponible ON tarotistas(disponible);
CREATE INDEX idx_tarotistas_ocupado ON tarotistas(ocupado);
CREATE INDEX idx_tarotista_sesiones_tarotista ON tarotista_sesiones(tarotista_id);
CREATE INDEX idx_tarotista_disponibilidad_tarotista ON tarotista_disponibilidad(tarotista_id);
