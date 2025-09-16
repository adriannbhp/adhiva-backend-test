export interface TokenSigner {
    sign<T extends object>(payload: T, subject?:string): string;
    verify<T = unknown>(token: string): T;
}