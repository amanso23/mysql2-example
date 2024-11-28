export interface IDatabase {
    query<T>(sql: string, options?: unknown): Promise<T>;
}