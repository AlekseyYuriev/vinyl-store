import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { winstonConfig } from './winston.config';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger(winstonConfig);
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }
}
