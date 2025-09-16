export interface PasswordHasher {
    hash(pw: string): Promise<string>;
    compare(pw: string, hash: string): Promise<boolean>;
}