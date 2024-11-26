import { Router, Request, Response } from 'express';
import { HELLO } from '../constants/strings';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(HELLO);
});

export default router;
