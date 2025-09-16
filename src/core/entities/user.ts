export type User = {
    id: number;
    name: string;
    email: string;
    nim: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}