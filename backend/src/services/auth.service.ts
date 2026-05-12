import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import { generateToken } from '../middleware/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tarot.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';

export const authService = {
  async login(email: string, password: string) {
    try {
      // Simple admin auth (in production, use database)
      if (email !== ADMIN_EMAIL) {
        throw new ApiError(401, 'Invalid credentials');
      }

      if (!ADMIN_PASSWORD_HASH) {
        throw new ApiError(500, 'Admin password not configured');
      }

      const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

      if (!isValid) {
        throw new ApiError(401, 'Invalid credentials');
      }

      const token = generateToken('admin-1', email);

      logger.info(`Admin logged in: ${email}`);

      return {
        token,
        admin: {
          id: 'admin-1',
          email
        }
      };
    } catch (error) {
      logger.error('Login error:', error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Login failed');
    }
  },

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { valid: true, decoded };
    } catch (error) {
      logger.error('Token verification error:', error);
      throw new ApiError(401, 'Invalid token');
    }
  },

  async generatePasswordHash(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    } catch (error) {
      logger.error('Generate password hash error:', error);
      throw error;
    }
  }
};
