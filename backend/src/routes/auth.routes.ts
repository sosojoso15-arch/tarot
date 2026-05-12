import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authService } from '../services/auth.service';

const router = Router();

// Admin login
router.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json({ success: true, ...result });
  })
);

// Verify token
router.post(
  '/verify',
  asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;
    const result = await authService.verifyToken(token);
    res.json({ success: true, ...result });
  })
);

export default router;
