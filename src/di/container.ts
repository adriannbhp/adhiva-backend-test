import { PrismaUserRepo } from '../infra/db';
import { BcryptHasher } from '../infra/security/bcrypt.hasher';
import { JwtSigner } from '../infra/security/jwt.signer';

import type { UserRepo } from '../core/ports/repos';

import { AuthLogin } from '../core/usecases/auth.login';
import { UserCreate } from '../core/usecases/user.create';
import { UserUpdate } from '../core/usecases/user.update';
import { UserDelete } from '../core/usecases/user.delete';
import { UserGet } from '../core/usecases/user.get';
import { UserList } from '../core/usecases/user.list';
import { SearchUsecase } from "../core/usecases/search";

const userRepo: UserRepo = new PrismaUserRepo();
const hasher = new BcryptHasher();
const token = new JwtSigner();

export const container = Object.freeze({
    repos: { user: userRepo },
    services: { hasher, token },
    usecases: {
        authLogin: new AuthLogin(userRepo, hasher, token),
        userCreate: new UserCreate(userRepo, hasher),
        userUpdate: new UserUpdate(userRepo, hasher),
        userDelete: new UserDelete(userRepo),
        userGet: new UserGet(userRepo),
        userList: new UserList(userRepo),
        search: new SearchUsecase(),
    },
});

export type Container = typeof container;
