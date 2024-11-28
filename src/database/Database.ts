import { ILogger } from "@/interfaces/ILogger";
import { IDatabase } from "@/interfaces/IDatabase";
import mysql, { Pool, PoolOptions, RowDataPacket } from "mysql2/promise";

export class Database implements IDatabase {

    static instance: Database |  null = null;
    logger: ILogger;
    pool: Pool

    constructor(logger: ILogger, config: PoolOptions){
        this.logger = logger;
        this.pool = mysql.createPool(config);
        
    }

    async query<T>(sql: string, options?: unknown): Promise<T> {
        try{
            const [rows] = await this.pool.query<RowDataPacket[]>(sql, options);
            return rows as T;
        }catch(err){ 
            this.logger.error(`Error executing query: ${sql}`, err as Error);
            throw new Error("Database query failed");
        }
    }

    static async initialize(logger: ILogger, config: PoolOptions): Promise<void> {
        if (!Database.instance) {
          Database.instance = new Database(logger, config);
          await Database.instance.testConnection();
        } else {
          throw new Error("Database has already been initialized");
        }
    }

    private async testConnection(): Promise<void> {
        try {
            await this.pool.query('SELECT 1'); 
            console.log('Database connection established');
        } catch (error) {
            this.logger.error("Database connection failed", error);
            throw new Error("Failed to establish database connection");
        }
    }

    static getInstance(): Database {
        if(!Database.instance){
            throw new Error("Database is not initialized. Call initialize() first.");
        }
        return Database.instance;
    }

    async close(): Promise<void> {
        try{
            await this.pool.end();
        } catch (err) {
            this.logger.error("Error closing database connection pool", err as Error);
            throw new Error("Failed to close database connections");
          }
    }
}