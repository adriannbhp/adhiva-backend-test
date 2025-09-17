import { Router } from 'express';
import { authGuard } from '../middlewares/auth.guard';
import { validate } from '../middlewares/validate';
import { createUserSchema, listUserSchema, updateUserSchema } from '../validators/user';
import {createUser, deletePermanent, getUser, listUsers, updateUser} from '../controllers/user.controller';

const r = Router();

r.get('/', authGuard, validate(listUserSchema, 'query'), listUsers);
r.get('/:id', authGuard, getUser);
r.post('/', authGuard, validate(createUserSchema, 'body'), createUser);
r.put('/:id', authGuard, validate(updateUserSchema, 'body'), updateUser);
// r.delete('/:id', authGuard, deleteUser);
r.delete('/:id', authGuard, deletePermanent);
export default r;
