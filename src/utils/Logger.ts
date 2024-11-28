import { ILogger } from "@/interfaces/ILogger";

export class Logger implements ILogger {
  error(message: string, error: Error): void {
    console.error(`[ERROR] ${message}:`, error);
  }

  info(message: string): void {
    console.log(`[INFO] ${message}`);
  }
}
