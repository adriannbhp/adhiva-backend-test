import { Router } from 'express';

import { login } from '../controllers/auth.controller';
import { loginLimiter } from '../middlewares/rate-limit';
import { validate } from '../middlewares/validate';
import { loginSchema } from '../validators/auth';

const r = Router();

r.post('/login', loginLimiter, validate(loginSchema), login);
export default r;