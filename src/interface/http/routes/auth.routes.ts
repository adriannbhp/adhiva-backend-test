import { Router } from 'express';

import { login } from '../controllers/auth.controller';
import { loginLimiter } from '../middlewares/rate-limit';

const r = Router();

r.post('/login', loginLimiter, login);

export default r;