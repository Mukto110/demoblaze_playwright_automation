import { createLogger, format, transports } from "winston";
import fs from "fs";

// Define log file path
const LOG_FILE_PATH = "test-logs.log";

// Delete log file before each execution
if (fs.existsSync(LOG_FILE_PATH)) {
  fs.unlinkSync(LOG_FILE_PATH);
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: LOG_FILE_PATH }),
  ],
});

export default logger;
