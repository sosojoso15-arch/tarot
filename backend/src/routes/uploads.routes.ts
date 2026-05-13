import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { supabase } from '../config/database';
import { logger } from '../utils/logger';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload foto tarotista
router.post(
  '/tarotista/:taroistaId',
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    const { taroistaId } = req.params;

    try {
      // Get tarotista name
      const { data: tarotista, error: taroError } = await supabase
        .from('tarotistas')
        .select('nombre')
        .eq('id', taroistaId)
        .single();

      if (taroError || !tarotista) {
        return res.status(404).json({ success: false, error: 'Tarotista not found' });
      }

      // Upload to Supabase Storage
      const fileName = `${tarotista.nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '_')}_${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('tarotistas')
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('tarotistas')
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      // Update tarotista record
      const { error: updateError } = await supabase
        .from('tarotistas')
        .update({ imagen_url: publicUrl })
        .eq('id', taroistaId);

      if (updateError) {
        throw updateError;
      }

      logger.info(`Foto subida: ${tarotista.nombre}`);
      res.json({
        success: true,
        data: {
          taroistaId,
          imageUrl: publicUrl
        }
      });
    } catch (error: any) {
      logger.error('Upload error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  })
);

export default router;
