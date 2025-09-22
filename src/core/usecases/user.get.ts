import type { UserRepo } from '../ports/repos';
import type { UserOutput } from '../dto';
import { NotFoundError } from '../errors';

export class UserGet {
    constructor(private readonly userRepo: UserRepo) {}

    async execute(id: number): Promise<UserOutput> {
        const u = await this.userRepo.findById(id);
        if (!u) throw new NotFoundError(`User with id ${id} not found`);
        return u;
    }
}