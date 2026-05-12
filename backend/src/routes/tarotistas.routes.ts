import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { taroistaService } from '../services/tarotista.service';
import { verifyToken } from '../middleware/auth';

const router = Router();

// Public routes
// Obtener todos los tarotistas disponibles
router.get(
  '/available',
  asyncHandler(async (req: Request, res: Response) => {
    const tarotistas = await taroistaService.getAvailableTarotistas();
    res.json({ success: true, data: tarotistas });
  })
);

// Obtener tarotista por ID
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const tarotista = await taroistaService.getTaroistaById(id);
    res.json({ success: true, data: tarotista });
  })
);

// Obtener tarotista disponible (para asignar)
router.get(
  '/available/:especialidad',
  asyncHandler(async (req: Request, res: Response) => {
    const { especialidad } = req.params;
    const tarotista = await taroistaService.getAvailableTaroista(especialidad);
    res.json({ success: true, data: tarotista });
  })
);

// Admin routes
// Crear nuevo tarotista
router.post(
  '/',
  verifyToken,
  asyncHandler(async (req: Request, res: Response) => {
    const tarotista = await taroistaService.createTarotista(req.body);
    res.status(201).json({ success: true, data: tarotista });
  })
);

// Actualizar tarotista
router.patch(
  '/:id',
  verifyToken,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const tarotista = await taroistaService.updateTarotista(id, req.body);
    res.json({ success: true, data: tarotista });
  })
);

// Cambiar disponibilidad
router.patch(
  '/:id/availability',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ocupado } = req.body;
    const tarotista = await taroistaService.setTaroistaAvailability(id, ocupado);
    res.json({ success: true, data: tarotista });
  })
);

// Obtener sesiones de tarotista
router.get(
  '/:id/sessions',
  verifyToken,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const sessions = await taroistaService.getTaroistaSessions(id);
    res.json({ success: true, data: sessions });
  })
);

export default router;
