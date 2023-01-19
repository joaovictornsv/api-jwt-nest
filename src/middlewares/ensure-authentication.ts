import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomerTokenPayload } from 'src/usecases/login';
import { InvalidToken } from '../errors';
import { TokenService } from '../services/token-service';

interface AccessTokenValidatedResponse {
  accessToken: string;
}

@Injectable()
export class EnsureAuthenticationMiddleware {
  constructor(
    private readonly tokenService: TokenService<CustomerTokenPayload>,
  ) {}

  async use(request: Request, _: Response, next: NextFunction): Promise<void> {
    const headers = this.validateRequestHeader(request.headers);
    this.verifyAccessToken(headers.accessToken);
    next();
  }

  private validateRequestHeader(
    header: Request['headers'],
  ): AccessTokenValidatedResponse {
    if (!header) {
      throw new InvalidToken();
    }

    const accessToken = header.authentication as string;

    if (!accessToken) {
      throw new InvalidToken();
    }

    return { accessToken };
  }

  private verifyAccessToken(accessToken: string): void {
    try {
      this.tokenService.validateToken(accessToken);
    } catch {
      throw new InvalidToken();
    }
  }
}
