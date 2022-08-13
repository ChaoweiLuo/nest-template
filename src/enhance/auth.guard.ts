import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService, private readonly reflector: Reflector) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = this.reflector.get<number>('role', context.getHandler()); 
    return this.validateRequest(request, role);
  }

  private async validateRequest(request: Request, role: number): Promise<boolean> {
    const token = request.header('token');
    if(token === null)
      return false;
    const secret = this.configService.get<string>('JWT_SECRET');
    // const audience = this.configService.get<string>('JWT_AUDIENCE');
    // const issuer = this.configService.get<string>('JWT_ISSUER');
    try {
      request.user = jwt.verify(token, secret) as User;
      return (!role || (request.user.role&role)!=0);
    }catch(err) {
      throw new UnauthorizedException(err.message);
    }
  }
}



