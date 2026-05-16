import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { verifyToken } from '../middleware/auth';
import { adminService } from '../services/admin.service';

const router = Router();

// Apply auth middleware to all routes
router.use(verifyToken);

// Dashboard stats
router.get(
  '/dashboard',
  asyncHandler(async (req: Request, res: Response) => {
    const stats = await adminService.getDashboardStats();
    res.json({ success: true, data: stats });
  })
);

// Get all sessions
router.get(
  '/sessions',
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 50 } = req.query;
    const sessions = await adminService.getAllSessions(
      parseInt(page as string),
      parseInt(limit as string)
    );
    res.json({ success: true, ...sessions });
  })
);

// Get all customers
router.get(
  '/customers',
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 50 } = req.query;
    const customers = await adminService.getAllCustomers(
      parseInt(page as string),
      parseInt(limit as string)
    );
    res.json({ success: true, ...customers });
  })
);

// Get customer details
router.get(
  '/customers/:email',
  asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.params;
    const customer = await adminService.getCustomerDetails(email);
    res.json({ success: true, data: customer });
  })
);

// Get analytics
router.get(
  '/analytics',
  asyncHandler(async (req: Request, res: Response) => {
    const { from, to } = req.query;
    const analytics = await adminService.getAnalytics(
      from as string,
      to as string
    );
    res.json({ success: true, data: analytics });
  })
);

// Get all tarotistas
router.get(
  '/tarotistas',
  asyncHandler(async (req: Request, res: Response) => {
    const tarotistas = await adminService.getAllTarotistas();
    res.json({ success: true, data: tarotistas });
  })
);

// Toggle tarotista status
router.post(
  '/tarotistas/:id/toggle',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await adminService.toggleTaroistaStatus(id);
    res.json({ success: true, data: result });
  })
);

export default router;
