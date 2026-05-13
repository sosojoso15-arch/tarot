import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database';
import stripeRoutes from './routes/stripe.routes';
import sessionRoutes from './routes/sessions.routes';
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import taroistasRoutes from './routes/tarotistas.routes';
import callsRoutes from './routes/calls.routes';
import uploadsRoutes from './routes/uploads.routes';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://voces-del-alma.com',
      'https://www.voces-del-alma.com',
      process.env.CORS_ORIGIN
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/stripe', stripeRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tarotistas', taroistasRoutes);
app.use('/api/calls', callsRoutes);
app.use('/api/uploads', uploadsRoutes);

// Error handling
app.use(errorHandler);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Initialize and start
async function start() {
  try {
    await initializeDatabase();
    logger.info('Database initialized');

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
