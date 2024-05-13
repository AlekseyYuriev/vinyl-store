import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authConstants } from './auth.constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtCookieAuthAdminGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context): any {
    const request = context.switchToHttp().getRequest();
    const jwtToken = request.cookies['jwt'];
    if (!jwtToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = jwt.verify(jwtToken, authConstants.secret);
      if (!Object.keys(payload).includes('adminId')) {
        throw new UnauthorizedException();
      }
      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
