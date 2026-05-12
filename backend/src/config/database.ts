import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';
import { logger } from '../utils/logger';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  logger.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
  process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

export async function initializeDatabase() {
  try {
    // Test connection
    const { error } = await supabase.from('users').select('count', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    logger.info('Database connection established');
  } catch (error) {
    logger.error('Database connection failed:', error);
    throw error;
  }
}

export async function query(sql: string, params: any[] = []) {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql, params });
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error('Query error:', error);
    throw error;
  }
}
