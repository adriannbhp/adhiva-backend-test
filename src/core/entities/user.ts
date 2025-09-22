export type User = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    role: "USER" | "ADMIN";
    createdAt: Date;
    updatedAt: Date;
}