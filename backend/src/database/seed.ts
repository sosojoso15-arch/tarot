import { supabase } from '../config/database';
import { logger } from '../utils/logger';

export async function seedDatabase() {
  try {
    logger.info('Seeding database...');

    // Insert sample users
    const { data: users } = await supabase
      .from('users')
      .insert([
        { email: 'user1@example.com', phone: '+1234567890' },
        { email: 'user2@example.com', phone: '+1234567891' }
      ])
      .select();

    logger.info(`Inserted ${users?.length || 0} sample users`);

    // Insert sample sessions
    if (users && users.length > 0) {
      const sessions = await supabase
        .from('sessions')
        .insert([
          {
            user_id: users[0].id,
            minutes: 15,
            status: 'confirmed',
            price_cents: 1499,
            session_code: 'ABC12345',
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          },
          {
            user_id: users[1].id,
            minutes: 30,
            status: 'pending',
            price_cents: 2999,
            session_code: 'XYZ98765',
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          }
        ])
        .select();

      logger.info(`Inserted ${sessions.data?.length || 0} sample sessions`);
    }

    logger.info('Database seeding completed');
  } catch (error) {
    logger.error('Seed error:', error);
    throw error;
  }
}

if (require.main === module) {
  seedDatabase().catch(console.error);
}
