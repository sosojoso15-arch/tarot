import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { callService } from '../services/call.service';

const router = Router();

// Iniciar llamada
router.post(
  '/initiate',
  asyncHandler(async (req: Request, res: Response) => {
    const { sessionId, clientPhone, taroistaId } = req.body;

    if (!sessionId || !clientPhone || !taroistaId) {
      return res.status(400).json({
        success: false,
        error: 'Faltan parámetros requeridos'
      });
    }

    const result = await callService.initiateCall(sessionId, clientPhone, taroistaId);
    res.json({ success: true, data: result });
  })
);

// Obtener estado de llamada
router.get(
  '/:callId/status',
  asyncHandler(async (req: Request, res: Response) => {
    const { callId } = req.params;
    const status = await callService.getCallStatus(callId);
    res.json({ success: true, data: status });
  })
);

// Colgar llamada
router.post(
  '/:callId/hangup',
  asyncHandler(async (req: Request, res: Response) => {
    const { callId } = req.params;
    const result = await callService.hangupCall(callId);
    res.json({ success: true, data: result });
  })
);

// Webhook de Zadarma
router.post(
  '/webhook/zadarma',
  asyncHandler(async (req: Request, res: Response) => {
    const result = await callService.handleZadarmaWebhook(req.body);
    res.json(result);
  })
);

export default router;
