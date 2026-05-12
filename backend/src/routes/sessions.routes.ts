import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { sessionService } from '../services/session.service';

const router = Router();

// Create a new session
router.post(
  '/create',
  asyncHandler(async (req: Request, res: Response) => {
    const session = await sessionService.createSession(req.body);
    res.status(201).json({ success: true, data: session });
  })
);

// Get session by ID
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const session = await sessionService.getSessionById(id);
    res.json({ success: true, data: session });
  })
);

// Get all sessions (public - limited info)
router.get(
  '/:email/history',
  asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.params;
    const sessions = await sessionService.getSessionsByEmail(email);
    res.json({ success: true, data: sessions });
  })
);

// Update session status
router.patch(
  '/:id/status',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const session = await sessionService.updateSessionStatus(id, status);
    res.json({ success: true, data: session });
  })
);

export default router;
