import { Router } from 'express';
import { authGuard } from '../middlewares/auth.guard';
import {
    searchByNama,
    searchByNim,
    searchByYmd
} from '../controllers/search.controller';

const r = Router();

r.use(authGuard);

r.get('/nama', searchByNama);
r.get('/nim', searchByNim);
r.get('/ymd', searchByYmd);

export default r;
