import type { UserRepo } from '../ports/repos';
import type { FindUsersInput, PaginatedUsersOutput } from '../dto';

export class UserList {
    constructor(private users: UserRepo) {}

    async execute({ q, page = 1, limit = 10 }: FindUsersInput): Promise<PaginatedUsersOutput> {
        const take = Math.max(1, Math.min(limit, 100));
        const skip = Math.max(0, (page - 1) * take);
        const { data, total } = await this.users.findMany({ q, skip, take });
        return { data, total, page, limit: take };
    }
}