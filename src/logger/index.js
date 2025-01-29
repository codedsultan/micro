import winston from "winston";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import DailyRotateFile from "winston-daily-rotate-file";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Define your severity levels.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define different colors for each level.
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

// Link colors of the log levels.
winston.addColors(colors);

// Define format of the Logger
let _consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

if (process.env.NODE_ENV !== "development") {
  _consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    // winston.format.json()

    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  );
}

const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
// Define transports of the Logger
const transports = [
  new winston.transports.Console({
    handleExceptions: true,
    format: _consoleFormat,
  }),

  new DailyRotateFile({
    level: 'error', // Logs only errors
    filename: path.join(logDirectory, 'error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d'
  }),
  new DailyRotateFile({
    level: 'info', // Logs info, warnings, and errors
    filename: path.join(logDirectory, 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d'
  })
//   new winston.transports.File({ filename: path.join(logDirectory, 'error.log') , level: 'error' }), 
//   new winston.transports.File({ filename: path.join(logDirectory, 'combined.log') }),

];

class Logger {
  static instance;

  constructor() {
    // Prevent direct instantiation
    if (Logger.instance) {
      throw new Error("Use Logger.getInstance() instead of new Logger()");
    }
  }

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        level: "debug",
        levels : levels,
        transports : transports,
      });
    }
    return Logger.instance;
  }

  static _init() {
    Logger.instance = winston.createLogger({
      level: "debug",
      levels: levels,
      transports: transports,
    });
  }
}

export {Logger as default};
