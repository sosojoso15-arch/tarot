import { Resend } from 'resend';
import { logger } from '../utils/logger';
import { Session } from '../types';

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailService = {
  async sendConfirmationEmail(email: string, session: Session) {
    try {
      const phoneNumber = process.env.ZADARMA_PHONE_NUMBER || '+1234567890';

      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@tarotplataforma.com',
        to: email,
        subject: '¡Tu consulta de tarot está confirmada! 📞',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>¡Gracias por tu compra!</h2>
            <p>Tu sesión de tarot de <strong>${session.minutes} minutos</strong> ha sido confirmada.</p>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Instrucciones para tu lectura:</h3>
              <ol>
                <li>Llama al siguiente número: <strong>${phoneNumber}</strong></li>
                <li>Código de sesión (opcional): <strong>${session.session_code}</strong></li>
                <li>Tu tarotista te recibirá en la línea</li>
                <li>Tienes ${session.minutes} minutos para tu lectura</li>
              </ol>
            </div>

            <p><strong>Detalles de tu sesión:</strong></p>
            <ul>
              <li>Duración: ${session.minutes} minutos</li>
              <li>ID de sesión: ${session.session_code}</li>
              <li>Validez: 24 horas desde este momento</li>
            </ul>

            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #666;">
              Si tienes dudas, contáctanos. ¡Esperamos tu llamada!
            </p>
          </div>
        `
      });

      logger.info(`Confirmation email sent to ${email}`);
    } catch (error) {
      logger.error('Send email error:', error);
      // Don't throw, email failure shouldn't block the flow
    }
  },

  async sendPaymentFailedEmail(email: string, reason?: string) {
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@tarotplataforma.com',
        to: email,
        subject: 'Tu pago no fue procesado ❌',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Tu pago no pudo procesarse</h2>
            <p>Lo sentimos, el pago de tu consulta de tarot no fue completado.</p>

            <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Razón:</strong> ${reason || 'Error en el procesamiento del pago'}</p>
            </div>

            <p>Por favor, intenta nuevamente o contacta con soporte.</p>
          </div>
        `
      });

      logger.info(`Payment failed email sent to ${email}`);
    } catch (error) {
      logger.error('Send payment failed email error:', error);
    }
  },

  async sendWeeklyReport(adminEmail: string, stats: any) {
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@tarotplataforma.com',
        to: adminEmail,
        subject: 'Reporte semanal de Tarot Plataforma 📊',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Reporte Semanal</h2>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Estadísticas</h3>
              <ul>
                <li>Ingresos totales: $${(stats.totalRevenue / 100).toFixed(2)}</li>
                <li>Sesiones completadas: ${stats.completedSessions}</li>
                <li>Nuevos clientes: ${stats.newCustomers}</li>
                <li>Tasa de conversión: ${stats.conversionRate.toFixed(2)}%</li>
              </ul>
            </div>
          </div>
        `
      });

      logger.info(`Weekly report sent to ${adminEmail}`);
    } catch (error) {
      logger.error('Send weekly report error:', error);
    }
  }
};
