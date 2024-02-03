export class Logger {
  log(message: string, context: string) {
    console.log(`${context}: ${message}`);
  }
}

export const logger = new Logger();
