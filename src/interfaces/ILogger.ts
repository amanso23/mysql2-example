export interface ILogger {
    error(message: string, error: Error): void;
    info(message: string): void;
}