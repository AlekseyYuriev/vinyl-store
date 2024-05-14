import { transports, format } from 'winston';
import * as path from 'path';

export const winstonConfig = {
  transports: [
    new transports.File({
      filename: path.join(__dirname, 'logs/info.log'),
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: path.join(__dirname, 'logs/error.log'),
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
};
