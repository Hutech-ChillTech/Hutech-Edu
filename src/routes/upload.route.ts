import { Router, Request, Response, NextFunction } from 'express';
import { getUploadSignature } from '../controllers/upload.controller';

const router = Router();

router.get('/signature', (req: Request, res: Response, next: NextFunction) => {
    getUploadSignature(req, res, next);
});

export default router;