import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { JwtCookieAuthAdminGuard } from 'src/auth/jwt-cookies-admin-guard';

@Controller('admins')
@ApiTags('Admins')
export class AdminsController {
  @Get('download/:logFile')
  @UseGuards(JwtCookieAuthAdminGuard)
  @ApiOperation({ summary: 'Get log files' })
  @ApiResponse({ status: 200 })
  downloadLog(@Res() res: Response, @Param('logFile') logFile: string) {
    console.log(logFile);
    const logPath = path.join(__dirname, '../logs', logFile);
    console.log(logPath);
    if (fs.existsSync(logPath)) {
      res.sendFile(logPath);
    } else {
      res.status(404).send('Log file not found.');
    }
  }
}
